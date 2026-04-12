import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, "..");
const customerServiceConfigPath = path.join(
  workspaceRoot,
  "config",
  "customer-service.ts",
);

function parseConfigValue(source, key) {
  const pattern = new RegExp(`${key}:\\s*"([^"]+)"`);
  const match = source.match(pattern);
  return match?.[1] ?? "";
}

function readCustomerServiceConfig() {
  const source = readFileSync(customerServiceConfigPath, "utf8");

  return {
    apiBaseUrl: parseConfigValue(source, "apiBaseUrl"),
    chatPath: parseConfigValue(source, "chatPath"),
  };
}

function parseArg(name, fallback) {
  const prefix = `--${name}=`;
  const raw = process.argv.find((value) => value.startsWith(prefix));
  return raw ? raw.slice(prefix.length) : fallback;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function buildEndpoints() {
  const config = readCustomerServiceConfig();
  const apiBaseUrl = parseArg(
    "base-url",
    process.env.CUSTOMER_SERVICE_BASE_URL || config.apiBaseUrl,
  );
  const chatPath = parseArg(
    "chat-path",
    process.env.CUSTOMER_SERVICE_CHAT_PATH || config.chatPath,
  );
  const healthPath = parseArg(
    "health-path",
    process.env.CUSTOMER_SERVICE_HEALTH_PATH || "/api/v1/health",
  );

  return {
    apiBaseUrl,
    chatEndpoint: new URL(chatPath, apiBaseUrl).toString(),
    healthEndpoint: new URL(healthPath, apiBaseUrl).toString(),
  };
}

function createSessionId() {
  return `backend-test-${Date.now()}`;
}

async function readSse(reader) {
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let deltaText = "";
  let donePayload = null;
  let errorPayload = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");
    const blocks = buffer.split("\n\n");
    buffer = blocks.pop() ?? "";

    for (const block of blocks) {
      const lines = block
        .split("\n")
        .map((line) => line.trimEnd())
        .filter((line) => line && !line.startsWith(":"));

      const eventName = lines
        .find((line) => line.startsWith("event:"))
        ?.slice(6)
        .trim();
      const dataText = lines
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trimStart())
        .join("\n");

      if (!eventName || !dataText) {
        continue;
      }

      if (eventName === "delta") {
        const payload = JSON.parse(dataText);
        deltaText += payload.content ?? "";
      }

      if (eventName === "done") {
        donePayload = JSON.parse(dataText);
        return { deltaText, donePayload, errorPayload };
      }

      if (eventName === "error") {
        errorPayload = JSON.parse(dataText);
        return { deltaText, donePayload, errorPayload };
      }
    }
  }

  return { deltaText, donePayload, errorPayload };
}

async function checkHealth(endpoint, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = Date.now();

  console.log(`Health endpoint: ${endpoint}`);

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    const latencyMs = Date.now() - startedAt;
    const contentType = response.headers.get("content-type") || "(empty)";
    const rawBody = await response.text();

    console.log(`Health HTTP status: ${response.status} ${response.statusText}`);
    console.log(`Health latency: ${latencyMs}ms`);
    console.log(`Health Content-Type: ${contentType}`);

    if (!response.ok) {
      console.error("Health check failed.");
      console.error(rawBody);
      return false;
    }

    console.log("Health response:");
    try {
      console.log(JSON.stringify(JSON.parse(rawBody), null, 2));
    } catch {
      console.log(rawBody);
    }

    return true;
  } catch (error) {
    console.error("Health request failed.");
    if (error instanceof Error) {
      console.error(`${error.name}: ${error.message}`);
    } else {
      console.error(String(error));
    }
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  const { apiBaseUrl, chatEndpoint, healthEndpoint } = buildEndpoints();
  const timeoutMs = Number.parseInt(
    parseArg("timeout", process.env.CUSTOMER_SERVICE_TEST_TIMEOUT || "15000"),
    10,
  );
  const query = parseArg(
    "query",
    process.env.CUSTOMER_SERVICE_TEST_QUERY || '你好，请只回复“ok”。',
  );
  const healthOnly = hasFlag("health-only");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const requestBody = {
    query,
    session_id: createSessionId(),
    stream: true,
    metadata: {
      source: "local-backend-test",
      lang: "zh-CN",
    },
  };

  console.log(`Base URL: ${apiBaseUrl}`);
  console.log(`Timeout: ${timeoutMs}ms`);
  console.log("");

  const healthOk = await checkHealth(healthEndpoint, timeoutMs);
  if (!healthOk) {
    process.exitCode = 1;
    clearTimeout(timeout);
    return;
  }

  if (healthOnly) {
    clearTimeout(timeout);
    return;
  }

  const startedAt = Date.now();

  console.log("");
  console.log(`Chat endpoint: ${chatEndpoint}`);
  console.log(`Query: ${query}`);

  try {
    const response = await fetch(chatEndpoint, {
      method: "POST",
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    const latencyMs = Date.now() - startedAt;
    console.log(`HTTP status: ${response.status} ${response.statusText}`);
    console.log(`Latency: ${latencyMs}ms`);
    console.log(`Content-Type: ${response.headers.get("content-type") || "(empty)"}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend reachable but request failed.");
      console.error(errorText);
      process.exitCode = 1;
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      console.error("Backend responded, but no readable response body was available.");
      process.exitCode = 1;
      return;
    }

    const { deltaText, donePayload, errorPayload } = await readSse(reader);

    if (errorPayload) {
      console.error("Backend returned SSE error event:");
      console.error(JSON.stringify(errorPayload, null, 2));
      process.exitCode = 1;
      return;
    }

    console.log("Backend reachable and SSE stream opened successfully.");
    if (donePayload) {
      console.log("Done payload:");
      console.log(JSON.stringify(donePayload, null, 2));
    } else if (deltaText) {
      console.log("Partial streamed text:");
      console.log(deltaText);
    } else {
      console.log("No SSE payload was captured before the stream ended.");
    }
  } catch (error) {
    console.error("Backend request failed.");
    if (error instanceof Error) {
      console.error(`${error.name}: ${error.message}`);
    } else {
      console.error(String(error));
    }
    process.exitCode = 1;
  } finally {
    clearTimeout(timeout);
  }
}

await main();
