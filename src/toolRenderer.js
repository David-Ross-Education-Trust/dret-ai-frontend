import React, { useState, useRef } from "react";
import Layout from "./layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { marked } from "marked";
import htmlDocx from "html-docx-js/dist/html-docx";
import { useParams } from "react-router-dom";
import { toolsConfig } from "./toolConfig";

export default function ToolRenderer() {
  const { toolId } = useParams();
  const tool = toolsConfig.find((t) => t.id === toolId);

  const [fields, setFields] = useState(
    tool.fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {})
  );
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef(null);

  if (!tool) {
    return <Layout><div className="p-12 text-red-600">Tool not found.</div></Layout>;
  }

  const handleChange = (name, value) => setFields({ ...fields, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(fields).some((v) => !v)) {
      setResponse("Please fill in all fields.");
      return;
    }
    const message =
      tool.fields.map((f) => `${f.label}: ${fields[f.name]}`).join("\n") +
      (tool.promptSuffix ? "\n\n" + tool.promptSuffix : "");

    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("https://dret-ai-backend-f9drcacng0f2gmc4.uksouth-01.azurewebsites.net/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: tool.agentId, message }),
      });
      const data = await res.json();
      setResponse(data.response || data.error || "No response.");
    } catch (err) {
      setResponse("Error: " + err.message);
    }
    setLoading(false);
    setTimeout(() => {
      if (scrollAreaRef.current) scrollAreaRef.current.scrollTop = 0;
    }, 100);
  };

  const exportToDocx = () => {
    const html = marked.parse(response);
    const fullHtml = `<html><body>${html}</body></html>`;
    const docxBlob = htmlDocx.asBlob(fullHtml);
    const url = URL.createObjectURL(docxBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${tool.name || "tool"}-response.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="font-avenir bg-gray-50 min-h-screen h-screen flex flex-col">
        <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-6 h-20 flex items-center sticky top-0">
          <span className="inline-block"
            style={{
              width: 6, height: 34, borderRadius: 6, background: "#205c40", marginRight: "1.1rem",
            }}
          />
          <h1 className="text-xl font-bold" style={{ color: "#205c40" }}>
            {tool.name}
          </h1>
        </div>
        <div className="flex flex-1 min-h-0 w-full gap-8 px-8 py-8 bg-gray-100">
          {/* Input form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-6 w-[340px] flex flex-col gap-3 h-fit text-[15px]"
            style={{ minWidth: 280, maxWidth: 360 }}
          >
            {tool.fields.map((f) => (
              <div key={f.name}>
                <label className="block text-xs font-medium text-gray-700 mb-1">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    value={fields[f.name]}
                    onChange={(e) => handleChange(f.name, e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm min-h-[100px]"
                    rows={3}
                  />
                ) : (
                  <input
                    type={f.type}
                    value={fields[f.name]}
                    onChange={(e) => handleChange(f.name, e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--trust-green)] text-white px-4 py-2 rounded-md hover:bg-green-800 transition text-sm font-semibold mt-2 font-avenir"
            >
              {loading ? "Generating..." : tool.buttonText || "Generate"}
            </button>
          </form>
          {/* Response */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="bg-white rounded-xl shadow-md h-full flex flex-col relative">
              <div
                ref={scrollAreaRef}
                className="flex-1 overflow-y-auto px-6 pt-6 pb-4 custom-scrollbar prose prose-sm max-w-none"
                style={{ color: "#222", minHeight: 120 }}
              >
                {loading ? (
                  <div className="flex gap-2 justify-center items-center h-16">
                    <span className="animate-bounce inline-block w-3 h-3 rounded-full bg-[var(--trust-green)]" style={{ animationDelay: "0s" }} />
                    <span className="animate-bounce inline-block w-3 h-3 rounded-full bg-[var(--trust-green)]" style={{ animationDelay: "0.15s" }} />
                    <span className="animate-bounce inline-block w-3 h-3 rounded-full bg-[var(--trust-green)]" style={{ animationDelay: "0.3s" }} />
                  </div>
                ) : response ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
                ) : (
                  <div className="text-gray-400 italic text-sm">Your response will appear here.</div>
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
        <style>{`
          .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 3px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
        `}</style>
      </div>
    </Layout>
  );
}