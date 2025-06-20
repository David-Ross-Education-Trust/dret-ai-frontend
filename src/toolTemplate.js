import React, { useState } from "react";
import Layout from "./layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ToolTemplate({ agentId, prompts, title, description }) {
  const [fields, setFields] = useState(() =>
    prompts.reduce((acc, prompt) => ({ ...acc, [prompt.name]: "" }), {})
  );
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = async () => {
    if (Object.values(fields).some((v) => !v)) {
      setResponse("Please fill in all fields.");
      return;
    }
    const message = prompts
      .map((p) => `${p.label}: ${fields[p.name]}`)
      .join("\n") + "\n\nPlease provide a detailed response.";

    setLoading(true);
    setResponse("Thinking...");
    try {
      const res = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, message }),
      });
      const data = await res.json();
      setResponse(data.response || data.error || "No response.");
    } catch (err) {
      setResponse("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-8 flex flex-col items-center">
        {/* Compact title card */}
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg px-6 pt-4 pb-2 mb-4">
          <h1 className="text-xl font-semibold mb-0.5">{title}</h1>
          <p className="text-gray-600 text-sm mb-1">{description}</p>
        </div>

        {/* 2-column responsive area, both sides always match height */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8"
             style={{ minHeight: "420px", maxHeight: "70vh" }}>
          {/* Left: Input card fills height */}
          <div className="flex-1 bg-white rounded-2xl shadow-md px-8 pt-6 pb-8 flex flex-col h-full">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex flex-col h-full"
              style={{ minHeight: 0 }}
            >
              <div className="flex-1 flex flex-col justify-between h-full min-h-0">
                {prompts.map(({ name, label, type = "text", placeholder }) => (
                  <div key={name} className="flex-1 flex flex-col min-h-0">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    {type === "select" ? (
                      <select
                        value={fields[name]}
                        onChange={(e) => handleChange(name, e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-[15px] bg-white focus:border-trust-green focus:ring-2 focus:ring-[#205c40]/30"
                      >
                        <option value="">Select...</option>
                        {placeholder.map((option, i) => (
                          <option key={i} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <textarea
                        value={fields[name]}
                        onChange={(e) => handleChange(name, e.target.value)}
                        placeholder={placeholder}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-[15px] bg-white focus:border-trust-green focus:ring-2 focus:ring-[#205c40]/30 flex-1 resize-none min-h-0"
                        style={{ minHeight: 0, height: "100%" }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-trust-green hover:bg-trust-green-dark text-white px-6 py-2 rounded-md transition mt-2 font-semibold text-[16px] shadow"
                style={{
                  boxShadow: "0 2px 8px 0 rgba(32,92,64,0.06)",
                }}
              >
                {loading ? "Generating..." : "Submit"}
              </button>
            </form>
          </div>

          {/* Right: Response card fills height, scrolls internally, renders markdown */}
          <div className="flex-1 bg-white rounded-2xl shadow-inner px-8 py-6 flex flex-col h-full min-h-0">
            <div className="flex-1 overflow-y-auto prose prose-sm max-w-none">
              {loading ? (
                <div className="text-gray-500 italic">Generating...</div>
              ) : response ? (
                <ReactMarkdown remarkPlugins={[require("remark-gfm")]}>
                  {response}
                </ReactMarkdown>
              ) : (
                <div className="text-gray-400 italic text-sm">
                  Your response will appear here.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
