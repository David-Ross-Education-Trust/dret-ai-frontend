import React, { useState, useRef } from "react";
import Layout from "../layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { marked } from "marked";
import htmlDocx from "html-docx-js/dist/html-docx";

export default function LessonPlanningTool() {
  const [fields, setFields] = useState({
    subject: "",
    audience: "",
    topic: "",
    description: "",
    length: "",
  });
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef(null);

  const handleChange = (name, value) => {
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !fields.subject.trim() ||
      !fields.audience.trim() ||
      !fields.topic.trim() ||
      !fields.description.trim() ||
      !fields.length.trim()
    ) {
      setResponse("Please fill in all fields.");
      return;
    }

    const message = `
Subject: ${fields.subject}
Audience: ${fields.audience}
Topic: ${fields.topic}
Brief Description: ${fields.description}
Length (minutes): ${fields.length}

Please generate a detailed lesson plan with objectives, activities, and time breakdown, formatted with clear markdown headings, tables, and lists.
    `.trim();

    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("https://dret-ai-backend-f9drcacng0f2gmc4.uksouth-01.azurewebsites.net/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: "asst_1UapHOvlRnY8SYKyizeXmUcZ",
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
    link.download = "lesson-plan.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="font-sans bg-gray-50 min-h-screen h-screen flex flex-col">
        {/* Sticky Header Bar */}
        <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-6 h-20 flex items-center sticky top-0">
          {/* Trust Green Accent + Tool Name */}
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
            Lesson Planning
          </h1>
        </div>

        {/* Main content: Form + Response */}
        <div className="flex flex-1 min-h-0 w-full gap-8 px-8 py-8 bg-gray-100">
          {/* Input form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-6 w-[340px] flex flex-col gap-3 h-fit text-[15px]"
            style={{ minWidth: 280, maxWidth: 360 }}
          >
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={fields.subject}
                onChange={e => handleChange("subject", e.target.value)}
                placeholder="Maths"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Audience</label>
              <input
                type="text"
                value={fields.audience}
                onChange={e => handleChange("audience", e.target.value)}
                placeholder="Year 7"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Topic</label>
              <input
                type="text"
                value={fields.topic}
                onChange={e => handleChange("topic", e.target.value)}
                placeholder="Fractions"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Brief Description</label>
              <textarea
                value={fields.description}
                onChange={e => handleChange("description", e.target.value)}
                placeholder="What are some of the key points this lesson should cover?"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm min-h-[144px]"
                rows={3}
              />
            </div>
            {/* Length (minutes) input */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Length (minutes)
              </label>
              <input
                type="text"
                value={fields.length}
                onChange={e => handleChange("length", e.target.value)}
                placeholder="60"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--trust-green)] text-white px-4 py-2 rounded-md hover:bg-green-800 transition text-sm font-semibold mt-2"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </form>

          {/* Response Box: fixed height, scrollable content, export pinned to bottom */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="bg-white rounded-xl shadow-md h-full flex flex-col relative">
              <div
                ref={scrollAreaRef}
                className="flex-1 overflow-y-auto px-6 pt-6 pb-4 custom-scrollbar prose prose-sm max-w-none"
                style={{
                  color: "#205c40",
                  minHeight: 120,
                }}
              >
                {loading ? (
                  <div className="text-gray-500 italic">Generating lesson plan...</div>
                ) : response ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {response}
                  </ReactMarkdown>
                ) : (
                  <div className="text-gray-400 italic text-sm">
                    Your lesson plan will appear here.
                  </div>
                )}
              </div>
              {/* Export button pinned at bottom, in trust green */}
              <div className="border-t border-gray-100 px-6 py-3 bg-white rounded-b-xl sticky bottom-0 z-10 flex justify-end">
                <button
                  className="bg-[var(--trust-green)] text-white px-4 py-2 rounded hover:bg-[var(--trust-green-dark)] transition text-sm"
                  onClick={exportToDocx}
                  disabled={!response || loading}
                  type="button"
                >
                  Export to DOCX
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Scrollbar styles just for the response box */}
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
