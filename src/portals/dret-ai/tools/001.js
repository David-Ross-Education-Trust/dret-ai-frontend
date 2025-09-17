import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AGENT_IDS = {
  "School Dinners": "asst_4Nbg4LJdFraYUYn7Hg7d5QXy",
  "Attlee's Britain Introduction": "asst_LctRxu5PW6J4tOU9YPz34v5h",
  "1920s (Part 1)": "asst_gqVt9ilxDv8m9mnONcpPL68l",
  "1920s (Part 2)": "asst_SFqNTt6WgFIFlqxRjnpJRJWr",
  "1930s": "asst_p33AjFj2FyyrTZVIsmtkfB3g",
  "1940s": "asst_EDJXVxTDKm3ztUb46sGTKXUu",
  "1950s": "asst_5FUkhBq8zwEnPvawHUm8WCkj",
};

const DECADES = Object.keys(AGENT_IDS);
const BASE_URL = "https://dret-ai-backend-f9drcacng0f2gmc4.uksouth-01.azurewebsites.net";

export default function HistorySourcesAgent() {
  const [decade, setDecade] = useState("1920s (Part 1)");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome! I'm here to help you explore historical sources from the 1920s. Do you have a specific source you'd like to look at, or shall I help you find one?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [threadId, setThreadId] = useState(null);
  const scrollRef = useRef(null);
  const messageScrollRef = useRef(null);

  const agentId = AGENT_IDS[decade];

  const stripCitations = (text) =>
    text
      .replace(/\[\d+:\d+\u2020[^\]]*]/g, "")
      .replace(/\u3010\d+:\d+\u2020[^\u3011]*\u3011/g, "")
      .replace(/\u2020[^\s.,;:!?)\]]*/g, "")
      .replace(/[ ]{2,}/g, " ")
      .trim();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const createThread = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/create-thread`, { method: "POST" });
        const data = await res.json();
        setThreadId(data.thread_id);
      } catch (err) {
        console.error("Thread creation failed:", err);
      }
    };
    createThread();
  }, [decade]);

  const sendMessage = async (retryText = null) => {
    const userMessage = retryText || input;
    if (!userMessage.trim()) return;

    if (!retryText) {
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setInput("");
    }

    setLoading(true);
    setLastMessage(userMessage);

    try {
      const res = await fetch(`${BASE_URL}/tutor-ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId,
          message: userMessage,
          threadId,
          userId: "demo-user",
          userName: "History Explorer",
          yearGroup: "Year 12",
        }),
      });

      const data = await res.json();
      const clean = stripCitations(data.response || data.error || "No response.");
      if (data.threadId) setThreadId(data.threadId);
      setMessages((prev) => [...prev, { role: "assistant", content: clean }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `${err.message}`,
          error: true,
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleDecadeChange = (newDecade) => {
    setDecade(newDecade);

    let message = "";
    if (newDecade === "School Dinners") {
      message = "Ask me questions about the School Dinners sources.";
    } else if (newDecade === "Attlee's Britain Introduction") {
      message =
        "Explore the introduction to Attlee's Britain.";
    } else {
      const friendlyDecade = newDecade.replace(" (Part 1)", "").replace(" (Part 2)", "");
      message = `Ask me questions about the historical sources from the ${friendlyDecade}. Do you have a specific source you'd like to look at, or shall I help you find one?`;
    }

    setMessages([{ role: "assistant", content: message }]);
    setInput("");
  };

  return (
    <Layout disableNavLinks>
      <div className="h-screen bg-gray-50 flex flex-col font-avenir">
        {/* Decade Tabs */}
        <div className="shrink-0 bg-white px-6 py-4 border-b">
          <div className="grid gap-2 w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {DECADES.map((d) => (
              <button
                key={d}
                onClick={() => handleDecadeChange(d)}
                className={`w-full px-3 py-1.5 rounded-md text-sm font-medium border ${
                  d === decade
                    ? "bg-[var(--trust-green)] text-white border-[var(--trust-green)]"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div
          ref={messageScrollRef}
          className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4 bg-[#f8fafc] custom-scrollbar"
        >
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`rounded-xl px-5 py-3 max-w-3xl shadow-sm transition-all duration-300 ease-in-out prose prose-sm leading-snug ${
                m.role === "user"
                  ? "bg-[var(--trust-green)] text-white self-end ml-auto prose-invert"
                  : "bg-white text-gray-900 border border-gray-200"
              }`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
              {m.error && lastMessage && (
                <button
                  onClick={() => sendMessage(lastMessage)}
                  className="mt-2 inline-block bg-red-100 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-200"
                >
                  Retry
                </button>
              )}
            </div>
          ))}
          {loading && <div className="italic text-sm text-gray-500">Thinking...</div>}
          <div ref={scrollRef} />
        </div>

        {/* Input */}
        <div className="shrink-0 p-4 bg-white border-t">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={3}
              placeholder={`Ask the ${decade} source agent a question...`}
              className="flex-grow border border-gray-300 rounded-md px-3 py-2 text-sm resize-none"
            />
            <button
              disabled={loading}
              onClick={() => sendMessage()}
              className="bg-[var(--trust-green)] text-white px-4 py-2 rounded-md hover:bg-green-800 transition text-sm font-semibold self-end"
            >
              Send
            </button>
          </div>
        </div>

        {/* Scrollbar styling */}
        <style>{`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 transparent;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #94a3b8;
          }
        `}</style>
      </div>
    </Layout>
  );
}