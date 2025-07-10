import React, { useState, useRef } from "react";
import Layout from "../../../layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Decade → Agent ID map
const AGENT_IDS = {
  "1920s": "asst_gqVt9ilxDv8m9mnONcpPL68l",
  "1930s": "asst_p33AjFj2FyyrTZVIsmtkfB3g",
  "1940s": "asst_EDJXVxTDKm3ztUb46sGTKXUu",
  "1950s": "asst_5FUkhBq8zwEnPvawHUm8WCkj",
};

const DECADES = Object.keys(AGENT_IDS);

export default function HistorySourcesAgent() {
  const [decade, setDecade] = useState("1930s");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const agentId = AGENT_IDS[decade];

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    try {
      const res = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId,
          message: userMessage,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error: " + err.message }]);
    }

    setLoading(false);
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleDecadeChange = (newDecade) => {
    setDecade(newDecade);
    setMessages([]); // Optional: reset chat on switch
    setInput("");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col font-avenir">
        {/* Header and Tabs */}
        <div className="shrink-0 bg-white px-6 py-4 border-b">
          <h1 className="text-xl font-bold text-[var(--trust-green)] mb-2">
            Historical Source Chat
          </h1>
          <div className="flex space-x-4">
            {DECADES.map((d) => (
              <button
                key={d}
                onClick={() => handleDecadeChange(d)}
                className={`px-3 py-1 rounded-md text-sm font-medium border ${
                  d === decade
                    ? "bg-[var(--trust-green)] text-white border-[var(--trust-green)]"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-100">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`rounded-lg px-4 py-2 max-w-2xl ${
                m.role === "user"
                  ? "bg-[var(--trust-green)] text-white self-end ml-auto"
                  : "bg-white text-gray-800"
              }`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
            </div>
          ))}
          {loading && (
            <div className="italic text-sm text-gray-500">Thinking...</div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input */}
        <div className="shrink-0 p-4 bg-white border-t">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={3}
            placeholder={`Ask the ${decade} source agent a question...`}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none"
          />
          <div className="flex justify-end mt-2">
            <button
              disabled={loading}
              onClick={sendMessage}
              className="bg-[var(--trust-green)] text-white px-4 py-2 rounded-md hover:bg-green-800 transition text-sm font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
