import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { marked } from "marked";
import htmlDocx from "html-docx-js/dist/html-docx";

export default function ConversationTool() {
  const [messages, setMessages] = useState([]); // {role, content}
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newUserMsg = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, newUserMsg]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch("https://dret-ai-backend-f9drcacng0f2gmc4.uksouth-01.azurewebsites.net/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: "asst_1UapHOvlRnY8SYKyizeXmUcZ",
          message: input.trim(),
          threadId: threadId // Pass null for first message, or previous threadId for followups
        }),
      });
      const data = await res.json();
      if (data.response) {
        setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: data.error || "No response." }]);
      }
      if (data.threadId) setThreadId(data.threadId);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Error: " + err.message }]);
    }
    setLoading(false);
  };

  const exportToDocx = () => {
    const html = marked.parse(
      messages
        .map(
          m =>
            `<p><strong>${m.role === "user" ? "You" : "Assistant"}:</strong><br/>${m.content}</p>`
        )
        .join("\n")
    );
    const fullHtml = `<html><body>${html}</body></html>`;
    const docxBlob = htmlDocx.asBlob(fullHtml);
    const url = URL.createObjectURL(docxBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "conversation.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRestart = () => {
    setMessages([]);
    setThreadId(null);
    setInput("");
  };

  return (
    <Layout>
      <div className="font-avenir bg-gray-50 min-h-screen h-screen flex flex-col">
        <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-6 h-24 flex items-center sticky top-0">
          <div style={{ display: "flex", alignItems: "center", transform: "translateY(4px)" }}>
            <span
              className="inline-block"
              style={{
                width: 6,
                height: 34,
                borderRadius: 6,
                background: "#205c40",
                marginRight: "1.1rem",
              }}
            />
            <h1 className="text-xl font-bold" style={{ color: "#205c40" }}>
              Conversation Tool
            </h1>
          </div>
        </div>
        <div className="flex flex-1 min-h-0 w-full gap-8 px-8 py-8 bg-gray-100">
          <div className="bg-white rounded-xl shadow-md w-[420px] flex flex-col h-full" style={{ minWidth: 340, maxWidth: 420 }}>
            <div className="flex-1 min-h-0 overflow-y-auto px-6 pt-6 pb-4 custom-scrollbar">
              <button
                className="mb-4 text-xs text-blue-600 underline"
                onClick={handleRestart}
                type="button"
                disabled={loading || (messages.length === 0 && !threadId)}
              >
                {messages.length === 0 && !threadId ? "Start a conversation" : "Restart conversation"}
              </button>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Enter your message
              </label>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..."
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm min-h-[100px]"
                rows={4}
                disabled={loading}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
              />
            </div>
            <div className="border-t border-gray-100 px-6 py-3 bg-white rounded-b-xl sticky bottom-0 z-10 flex justify-end gap-2">
              <button
                type="submit"
                disabled={loading || !input.trim()}
                onClick={handleSend}
                className="bg-[var(--trust-green)] text-white px-4 py-2 rounded-md hover:bg-green-800 transition text-sm font-semibold font-avenir"
              >
                {loading ? "Sending..." : "Send"}
              </button>
              <button
                className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300 transition text-sm font-avenir"
                onClick={exportToDocx}
                type="button"
                disabled={messages.length === 0}
              >
                Export
              </button>
            </div>
          </div>
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="bg-white rounded-xl shadow-md h-full flex flex-col relative">
              <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4 custom-scrollbar" style={{ minHeight: 120 }}>
                {messages.length === 0 ? (
                  <div className="text-gray-400 italic text-sm">Your conversation will appear here.</div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`max-w-[85%] px-4 py-3 rounded-xl shadow ${msg.role === "user" ? "bg-[var(--trust-green)] text-white self-end" : "bg-gray-200 text-gray-900 self-start"}`}
                        style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ))}
                    {loading && (
                      <div className="max-w-[85%] px-4 py-3 rounded-xl shadow bg-gray-200 text-gray-900 self-start">
                        <span className="italic text-gray-500">Assistant is typing...</span>
                      </div>
                    )}
                    <div ref={chatBottomRef} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <style>
          {`
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #cbd5e1 transparent;
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #cbd5e1;
              border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: #94a3b8;
            }
          `}
        </style>
      </div>
    </Layout>
  );
}