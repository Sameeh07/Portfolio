import { MessageSquareText, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { assistantPrompts } from "../data/portfolio";

const ASSISTANT_ENDPOINT =
  import.meta.env.VITE_ASSISTANT_ENDPOINT || "/.netlify/functions/ask";
const isPlainViteDev =
  import.meta.env.DEV &&
  typeof window !== "undefined" &&
  window.location.port === "5173";

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const initialMessages = [
  {
    id: "intro",
    role: "assistant",
    content:
      "Ask anything about my work or background.",
  },
];

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingId, setStreamingId] = useState(null);
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, open]);

  const submitMessage = async (value) => {
    const message = value.trim();
    if (!message || loading) return;

    const userMessage = { id: createId(), role: "user", content: message };
    const assistantId = createId();

    setMessages((current) => [
      ...current,
      userMessage,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setInput("");
    setLoading(true);
    setStreamingId(assistantId);

    try {
      const response = await fetch(ASSISTANT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(formatAssistantError(response, errorText));
      }

      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("text/html")) {
        throw new Error(
          "Assistant backend is not running. Start the site with Netlify Dev or deploy it to Netlify so /.netlify/functions/ask is available.",
        );
      }

      if (!response.body) {
        const text = await response.text();
        setMessages((current) =>
          current.map((item) =>
            item.id === assistantId ? { ...item, content: text } : item,
          ),
        );
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let hasContent = false;

      while (true) {
        const { value: chunk, done } = await reader.read();
        if (done) break;

        const text = decoder.decode(chunk, { stream: true });
        if (!text) continue;

        hasContent = true;
        setLoading(false);
        setMessages((current) =>
          current.map((item) =>
            item.id === assistantId
              ? { ...item, content: `${item.content}${text}` }
              : item,
          ),
        );
      }

      if (!hasContent) {
        setMessages((current) =>
          current.map((item) =>
            item.id === assistantId
              ? {
                  ...item,
                  content:
                    "I could not generate an answer this time. Please try a more specific question about my work.",
                }
              : item,
          ),
        );
      }
    } catch (error) {
      setMessages((current) =>
        current.map((item) =>
          item.id === assistantId
            ? {
                ...item,
                content:
                  error instanceof Error
                    ? error.message
                    : "Assistant request failed. Check whether the Netlify function is running.",
              }
            : item,
        ),
      );
    } finally {
      setLoading(false);
      setStreamingId(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitMessage(input);
  };

  return (
    <>
      <button
        type="button"
        className={`assistant-launcher ${open ? "assistant-launcher--hidden" : ""}`}
        onClick={() => setOpen(true)}
        aria-label="Open Sameeh assistant"
      >
        <MessageSquareText className="h-5 w-5" aria-hidden="true" />
        <span>Ask Sameeh</span>
      </button>

      <div className={`assistant-shell ${open ? "assistant-shell--open" : ""}`}>
        <div className="assistant-panel" role="dialog" aria-modal="true" aria-label="Sameeh assistant">
          <div className="assistant-header">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-200">
                Sameeh
              </p>
              <h2 className="text-base font-semibold text-white">Portfolio assistant</h2>
            </div>
            <button
              type="button"
              className="assistant-icon-button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="assistant-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`assistant-message assistant-message--${message.role}`}
              >
                {message.content ? (
                  <p>{message.content}</p>
                ) : loading && streamingId === message.id ? (
                  <TypingDots />
                ) : null}
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {messages.length === 1 ? (
            <div className="assistant-prompts">
              {assistantPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => submitMessage(prompt)}
                  disabled={loading}
                >
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}

          <form className="assistant-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask anything about Sameeh..."
              maxLength={900}
              aria-label="Ask anything about Sameeh"
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

function formatAssistantError(response, errorText) {
  const text = String(errorText || "").trim();
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("text/html") || text.startsWith("<!doctype")) {
    return "Assistant backend is not running. Start the site with Netlify Dev or deploy it to Netlify so /.netlify/functions/ask is available.";
  }

  if (response.status === 404) {
    if (isPlainViteDev) {
      return "You are running plain Vite on localhost:5173, so Netlify Functions are not available. Stop this server, run npm run dev:netlify, and open the Netlify Dev URL, usually http://localhost:8888.";
    }

    return "Assistant function was not found at /.netlify/functions/ask. Check that Netlify Functions are deployed and the function path is correct.";
  }

  if (response.status === 503) {
    return text || "Assistant backend is not configured yet. Check GROQ_API_KEY.";
  }

  return text || "Assistant backend returned an error. Check function logs for details.";
}

function TypingDots() {
  return (
    <span className="typing-dots" aria-label="Sameeh is processing">
      <span />
      <span />
      <span />
    </span>
  );
}
