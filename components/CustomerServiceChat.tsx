"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  type CustomerServiceDoneEvent,
  streamCustomerServiceReply,
} from "@/lib/customer-service";
import logoImage from "@/static/logo.png";

type ChatMessage = {
  content: string;
  id: string;
  note?: string;
  role: "assistant" | "user";
  status?: "error" | "idle" | "streaming";
};

const INITIAL_MESSAGE: ChatMessage = {
  id: "assistant-welcome",
  role: "assistant",
  content: "你好有什么可以帮你的？",
  status: "idle",
};

function hashString(value: string) {
  let hash = 5381;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }

  return (hash >>> 0).toString(36);
}

function createBrowserFingerprint() {
  if (typeof window === "undefined") {
    return "browser-unknown";
  }

  const { navigator, screen } = window;
  const deviceMemory =
    "deviceMemory" in navigator
      ? String(
          (
            navigator as Navigator & {
              deviceMemory?: number;
            }
          ).deviceMemory ?? "",
        )
      : "";

  const source = [
    navigator.userAgent,
    navigator.language,
    navigator.languages.join(","),
    navigator.platform,
    navigator.hardwareConcurrency,
    deviceMemory,
    navigator.maxTouchPoints,
    screen.width,
    screen.height,
    screen.colorDepth,
    window.devicePixelRatio,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ].join("|");

  return `browser-${hashString(source)}`;
}

function createSessionId(browserFingerprint: string, pageLoadTimestamp: number) {
  return `${browserFingerprint}-${pageLoadTimestamp}`;
}

function buildGuardNote(payload: CustomerServiceDoneEvent) {
  if (payload.grounded === false && payload.guard_reasons?.length) {
    return `知识库校验提醒：${payload.guard_reasons.join("；")}`;
  }

  if (payload.grounded === false) {
    return "这次回答没有完全命中知识库，建议必要时转人工进一步确认。";
  }

  return undefined;
}

function getRuntimeErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === "AbortError"
  ) {
    return "已停止本次回答。";
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "暂时无法连接 PsyGo 服务，请稍后再试。";
}

function AssistantMarkdown({ content }: { content: string }) {
  return (
    <div className="chat-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

export function CustomerServiceChat() {
  const reduceMotion = useReducedMotion();
  const inputId = useId();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const browserFingerprintRef = useRef("");
  const pageLoadTimestampRef = useRef<number | null>(null);
  const sessionIdRef = useRef("");

  if (pageLoadTimestampRef.current === null && typeof window !== "undefined") {
    pageLoadTimestampRef.current = Date.now();
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    INITIAL_MESSAGE,
  ]);

  useEffect(() => {
    if (!browserFingerprintRef.current) {
      browserFingerprintRef.current = createBrowserFingerprint();
    }

    if (!sessionIdRef.current) {
      sessionIdRef.current = createSessionId(
        browserFingerprintRef.current,
        pageLoadTimestampRef.current ?? Date.now(),
      );
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    textareaRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [isOpen, messages, reduceMotion]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const updateMessage = (
    id: string,
    updater: Partial<ChatMessage>,
  ) => {
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, ...updater } : message,
      ),
    );
  };

  const ensureSessionId = () => {
    if (sessionIdRef.current) {
      return sessionIdRef.current;
    }

    if (!browserFingerprintRef.current) {
      browserFingerprintRef.current = createBrowserFingerprint();
    }

    const nextSessionId = createSessionId(
      browserFingerprintRef.current,
      pageLoadTimestampRef.current ?? Date.now(),
    );
    sessionIdRef.current = nextSessionId;
    return nextSessionId;
  };

  const handleToggle = () => {
    setIsOpen((current) => !current);
  };

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const query = inputValue.trim();
    if (!query || isStreaming) {
      return;
    }

    const currentSessionId = ensureSessionId();
    const userMessageId = `user-${Date.now()}`;
    const assistantMessageId = `assistant-${Date.now()}`;
    let streamedAnswer = "";
    let finalAnswerFromDone = "";
    let streamErrorMessage: string | null = null;

    setIsOpen(true);
    setInputValue("");
    setErrorMessage(null);
    setIsStreaming(true);
    setMessages((current) => [
      ...current,
      {
        id: userMessageId,
        role: "user",
        content: query,
        status: "idle",
      },
      {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        status: "streaming",
      },
    ]);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await streamCustomerServiceReply(query, {
        sessionId: currentSessionId,
        signal: controller.signal,
        metadata: {
          page: window.location.pathname,
          lang:
            document.documentElement.lang ||
            window.navigator.language ||
            "zh-CN",
        },
        onDelta: (chunk) => {
          streamedAnswer += chunk;
          updateMessage(assistantMessageId, {
            content: streamedAnswer,
            status: "streaming",
          });
        },
        onDone: (payload) => {
          const finalAnswer = payload.answer || streamedAnswer;
          finalAnswerFromDone = finalAnswer;
          updateMessage(assistantMessageId, {
            content: finalAnswer || "已收到消息，但本次没有返回文本。",
            note: buildGuardNote(payload),
            status: "idle",
          });
        },
        onError: (payload) => {
          streamErrorMessage =
            payload.message || "PsyGo 服务暂时不可用。";
        },
      });

      if (!streamedAnswer && !finalAnswerFromDone) {
        updateMessage(assistantMessageId, {
          content: "已收到消息，但本次没有返回文本。",
          status: "idle",
        });
      }
    } catch (error) {
      const message = streamErrorMessage || getRuntimeErrorMessage(error);

      if (message === "已停止本次回答。") {
        updateMessage(assistantMessageId, {
          content: streamedAnswer || message,
          status: "idle",
        });
      } else {
        setErrorMessage(message);
        updateMessage(assistantMessageId, {
          content:
            streamedAnswer ||
            "抱歉，我暂时没能连上 PsyGo 服务。请确认后端接口已启动后再试。",
          note: message,
          status: "error",
        });
      }
    } finally {
      abortControllerRef.current = null;
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      void handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-4 left-3 right-3 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[24rem]">
      <AnimatePresence>
        {isOpen ? (
          <motion.section
            key="customer-service-panel"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            aria-label="PsyGo支持对话框"
            aria-modal="false"
            className="section-shell flex max-h-[min(72vh,42rem)] w-full flex-col overflow-hidden rounded-[30px]"
            id="customer-service-panel"
            role="dialog"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] px-4 py-4 sm:px-5">
              <div>
                <p className="text-sm font-semibold tracking-[-0.02em]">
                  PsyGo支持
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="apple-button-ghost h-9 w-9 px-0 py-0 text-lg"
                  onClick={handleToggle}
                  aria-label="关闭支持对话框"
                >
                  x
                </button>
              </div>
            </div>

            <div
              aria-live="polite"
              aria-relevant="additions text"
              className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5"
            >
              {messages.map((message) => {
                const isAssistant = message.role === "assistant";
                const bubbleClassName = isAssistant
                  ? "surface-shell-strong rounded-[24px] rounded-bl-md text-[var(--foreground)]"
                  : "rounded-[24px] rounded-br-md bg-[var(--accent)] text-white shadow-[0_16px_38px_rgba(0,113,227,0.24)]";

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isAssistant ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div className="max-w-[88%]">
                      <p
                        className={`mb-1 px-1 text-[11px] font-medium text-[var(--muted)] ${
                          isAssistant ? "text-left" : "text-right"
                        }`}
                      >
                        {isAssistant ? "PsyGo" : "你"}
                      </p>
                      <div
                        className={`${bubbleClassName} px-4 py-3 text-sm leading-6 whitespace-pre-wrap break-words`}
                      >
                        {message.content ? (
                          isAssistant ? (
                            <AssistantMarkdown content={message.content} />
                          ) : (
                            <p className="whitespace-pre-wrap break-words">
                              {message.content}
                            </p>
                          )
                        ) : message.status === "streaming" ? (
                          <p className="whitespace-pre-wrap break-words">
                            正在思考中...
                          </p>
                        ) : (
                          <p className="whitespace-pre-wrap break-words">
                            已收到。
                          </p>
                        )}
                      </div>
                      {message.note ? (
                        <p className="mt-2 px-1 text-xs leading-5 text-[var(--muted)]">
                          {message.note}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-[var(--line)] px-4 pb-4 pt-3 sm:px-5">
              {errorMessage ? (
                <p className="mb-3 rounded-2xl bg-[color:rgba(255,99,71,0.10)] px-3 py-2 text-xs leading-5 text-[var(--muted-strong)]">
                  {errorMessage}
                </p>
              ) : null}
              <form className="space-y-3" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor={inputId}>
                  输入你的问题
                </label>
                <textarea
                  id={inputId}
                  ref={textareaRef}
                  rows={3}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="请输入....."
                  className="surface-shell-strong min-h-[108px] w-full resize-none rounded-[24px] px-4 py-3 text-sm leading-6 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none"
                />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="min-w-0 text-xs leading-5 text-[var(--muted)]">
                    Enter 发送，Shift + Enter 换行
                  </p>
                  <div className="flex w-full shrink-0 items-center justify-end gap-2 sm:w-auto">
                    {isStreaming ? (
                      <>
                        <button
                          type="button"
                          className="inline-flex h-10 min-w-[5rem] shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-[var(--line)] bg-[color:var(--surface-1)] px-4 text-sm font-medium text-[var(--foreground)] shadow-[var(--shadow-soft)] transition-transform duration-200 hover:-translate-y-0.5"
                          onClick={() => abortControllerRef.current?.abort()}
                        >
                          停止
                        </button>
                        <div
                          aria-live="polite"
                          className="inline-flex h-10 min-w-[7rem] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[color:rgba(0,113,227,0.16)] bg-[var(--accent-soft)] px-4 text-sm font-medium text-[var(--accent-strong)]"
                        >
                          <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
                          正在回复
                        </div>
                      </>
                    ) : (
                      <button
                        type="submit"
                        className="apple-button min-w-[5rem] whitespace-nowrap px-5 py-2 text-sm"
                        disabled={!inputValue.trim()}
                      >
                        发送
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <div className="relative">
        {!isOpen ? (
          <>
            <motion.span
              aria-hidden
              className="chat-fab-grain-halo pointer-events-none absolute inset-[-12px] rounded-full"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [0.26, 0.56, 0.26],
                      scale: [0.94, 1.08, 0.94],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 3.2,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                    }
              }
            />
            <motion.span
              aria-hidden
              className="chat-fab-grain-noise pointer-events-none absolute inset-[-6px] rounded-full"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [0.08, 0.18, 0.08],
                      scale: [0.97, 1.04, 0.97],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 2.8,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                    }
              }
            />
          </>
        ) : null}

        <motion.button
          type="button"
          onClick={handleToggle}
          aria-controls="customer-service-panel"
          aria-expanded={isOpen}
          aria-label={isOpen ? "收起 PsyGo" : "打开 PsyGo"}
          whileHover={
            reduceMotion
              ? undefined
              : { y: -3, scale: 1.02 }
          }
          whileTap={reduceMotion ? undefined : { scale: 0.985 }}
          className="group relative h-[4.15rem] w-[4.15rem] overflow-hidden rounded-full border border-white/18 bg-[linear-gradient(135deg,#0b84ff_0%,#0567db_46%,#0447a1_100%)] p-0 text-white shadow-[0_22px_52px_rgba(0,113,227,0.34)] backdrop-blur-xl"
        >
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.34),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.10),transparent_55%)]" />

          <span className="relative flex h-full w-full items-center justify-center">
            <span className="flex h-[3.2rem] w-[3.2rem] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur">
              <Image
                src={logoImage}
                alt="PsyGo"
                width={52}
                height={52}
                className="h-full w-full object-cover"
              />
            </span>
          </span>
        </motion.button>
      </div>
    </div>
  );
}
