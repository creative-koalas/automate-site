import {
  customerServiceConfig,
  getCustomerServiceEndpoint,
} from "@/config/customer-service";

export type CustomerServiceDeltaEvent = {
  request_id?: string | null;
  model?: string;
  content: string;
};

export type CustomerServiceDoneEvent = {
  request_id?: string | null;
  model?: string;
  answer: string;
  grounded?: boolean;
  guard_reasons?: string[];
  finish_reason?: string | null;
  usage?: unknown;
  prompt_name?: string | null;
  knowledge_files?: string[];
  session_id?: string | null;
  session_message_count?: number | null;
};

export type CustomerServiceErrorEvent = {
  message?: string;
};

type StreamCustomerServiceReplyOptions = {
  metadata?: Record<string, string>;
  sessionId: string;
  signal?: AbortSignal;
  onDelta?: (
    chunk: string,
    payload: CustomerServiceDeltaEvent,
  ) => void;
  onDone?: (payload: CustomerServiceDoneEvent) => void;
  onError?: (payload: CustomerServiceErrorEvent) => void;
};

type ChatCompletionRequest = {
  extra_instructions?: string;
  knowledge_files?: string[];
  metadata?: Record<string, string>;
  prompt_name?: string;
  query: string;
  session_id: string;
  stream: boolean;
};

function buildRequestBody(
  query: string,
  sessionId: string,
  metadata?: Record<string, string>,
): ChatCompletionRequest {
  const requestMetadata = {
    ...customerServiceConfig.requestDefaults.metadata,
    ...metadata,
  };

  return {
    query,
    session_id: sessionId,
    stream: customerServiceConfig.requestDefaults.stream,
    ...(customerServiceConfig.requestDefaults.promptName
      ? { prompt_name: customerServiceConfig.requestDefaults.promptName }
      : {}),
    ...(customerServiceConfig.requestDefaults.knowledgeFiles?.length
      ? {
          knowledge_files:
            customerServiceConfig.requestDefaults.knowledgeFiles,
        }
      : {}),
    ...(customerServiceConfig.requestDefaults.extraInstructions
      ? {
          extra_instructions:
            customerServiceConfig.requestDefaults.extraInstructions,
        }
      : {}),
    ...(Object.keys(requestMetadata).length
      ? { metadata: requestMetadata }
      : {}),
  };
}

function parseJsonPayload<T>(raw: string): T {
  return JSON.parse(raw) as T;
}

function extractErrorMessage(raw: string) {
  try {
    const parsed = parseJsonPayload<{
      error?: { message?: string };
      message?: string;
    }>(raw);

    return parsed.error?.message || parsed.message || raw;
  } catch {
    return raw;
  }
}

export async function streamCustomerServiceReply(
  query: string,
  {
    metadata,
    onDelta,
    onDone,
    onError,
    sessionId,
    signal,
  }: StreamCustomerServiceReplyOptions,
) {
  const response = await fetch(getCustomerServiceEndpoint(), {
    method: "POST",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildRequestBody(query, sessionId, metadata)),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP ${response.status}: ${extractErrorMessage(errorText)}`,
    );
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("当前浏览器不支持客服流式响应。");
  }

  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let donePayload: CustomerServiceDoneEvent | null = null;

  const processBlock = (block: string) => {
    if (!block.trim()) {
      return false;
    }

    let eventName = "";
    const dataLines: string[] = [];

    for (const rawLine of block.split("\n")) {
      const line = rawLine.trimEnd();
      if (!line || line.startsWith(":")) {
        continue;
      }

      if (line.startsWith("event:")) {
        eventName = line.slice(6).trim();
      }

      if (line.startsWith("data:")) {
        dataLines.push(line.slice(5).trimStart());
      }
    }

    if (!eventName || !dataLines.length) {
      return false;
    }

    const dataText = dataLines.join("\n");

    if (eventName === "delta") {
      const payload = parseJsonPayload<CustomerServiceDeltaEvent>(dataText);
      onDelta?.(payload.content ?? "", payload);
      return false;
    }

    if (eventName === "done") {
      donePayload = parseJsonPayload<CustomerServiceDoneEvent>(dataText);
      onDone?.(donePayload);
      return true;
    }

    if (eventName === "error") {
      const payload = parseJsonPayload<CustomerServiceErrorEvent>(dataText);
      onError?.(payload);
      throw new Error(payload.message || "客服服务暂时不可用。");
    }

    return false;
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");
    const blocks = buffer.split("\n\n");
    buffer = blocks.pop() ?? "";

    for (const block of blocks) {
      if (processBlock(block)) {
        await reader.cancel();
        return donePayload;
      }
    }
  }

  buffer += decoder.decode().replace(/\r\n/g, "\n");
  if (buffer.trim()) {
    processBlock(buffer);
  }

  return donePayload;
}
