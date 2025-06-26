import React, { useState, useRef } from "react";
import Layout from "../../../layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { marked } from "marked";
import htmlDocx from "html-docx-js/dist/html-docx";

export default function ParagraphTool() {
  const [paragraph, setParagraph] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paragraph.trim()) {
      setResponse("Please enter a paragraph.");
      return;
    }

    const message = `Please provide feeback on the following paragraph:\n\n${paragraph}\n\n. Please format your response in markdown.`;

    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("https://dret-ai-backend-f9drcacng0f2gmc4.uksouth-01.azurewebsites.net/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: "asst_ZACF1xya29a7MdWJ0ue08vkq",
          message,
        }),
      });
      const data = await res.json();
      setResponse(data.response || data.error || "No response.");
    } catch (err) {
      setResponse("Error: " + err.message);
    }
    setLoading(false);
    setTimeout(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = 0;
      }
    }, 100);
  };

  const exportToDocx = () => {
    const html = marked.parse(response);
    const fullHtml = `<html><body>${html}</body></html>`;
    const docxBlob = htmlDocx.asBlob(fullHtml);
    const url = URL.createObjectURL(docxBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
              CASE Paragraph Feedback
            </h1>
          </div>
        </div>
        <div className="flex flex-1 min-h-0 w-full gap-8 px-8 py-8 bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md w-[420px] flex flex-col h-full"
            style={{ minWidth: 340, maxWidth: 420 }}
          >
            <div className="flex-1 min-h-0 overflow-y-auto px-6 pt-6 pb-4 custom-scrollbar">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Please use the following paragraph
              </label>
              <textarea
                value={paragraph}
                onChange={e => setParagraph(e.target.value)}
                placeholder="Paste your paragraph here..."
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm min-h-[120px]"
                rows={15}
              />
            </div>
            <div className="border-t border-gray-100 px-6 py-3 bg-white rounded-b-xl sticky bottom-0 z-10 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-[var(--trust-green)] text-white px-4 py-2 rounded-md hover:bg-green-800 transition text-sm font-semibold font-avenir"
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </form>
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="bg-white rounded-xl shadow-md h-full flex flex-col relative">
              <div
                ref={scrollAreaRef}
                className="flex-1 overflow-y-auto px-6 pt-6 pb-4 custom-scrollbar prose prose-sm max-w-none"
                style={{ minHeight: 120 }}
              >
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full w-full py-10">
                    <div className="flex space-x-2 mt-4">
                      <span className="inline-block w-3 h-3 rounded-full bg-[var(--trust-green)] animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="inline-block w-3 h-3 rounded-full bg-[var(--trust-green)] animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="inline-block w-3 h-3 rounded-full bg-[var(--trust-green)] animate-bounce"></span>
                    </div>
                    <div className="text-gray-500 italic text-sm mt-3">Generating response...</div>
                  </div>
                ) : response ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {response}
                  </ReactMarkdown>
                ) : (
                  <div className="text-gray-400 italic text-sm">
                    Your response will appear here.
                  </div>
                )}
              </div>
              {response && !loading && (
                <div className="border-t border-gray-100 px-6 py-3 bg-white rounded-b-xl sticky bottom-0 z-10 flex justify-end">
                  <button
                    className="bg-[var(--trust-green)] text-white px-4 py-2 rounded-md hover:bg-green-800 transition text-sm font-semibold font-avenir"
                    onClick={exportToDocx}
                    type="button"
                  >
                    Export
                  </button>
                </div>
              )}
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