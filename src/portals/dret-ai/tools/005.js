import React, { useState, useRef } from "react";
import Layout from "../../../layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function StudentTutorAgent() {
  const [fields, setFields] = useState({
    name: "",
    yearGroup: "",
    subjects: "",
    goals: "",
    strengths: "",
    weaknesses: "",
  });

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef(null);

  const handleChange = (name, value) => {
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = `
Student Name: ${fields.name}
Year Group: ${fields.yearGroup}
Subjects Interested In: ${fields.subjects}
Learning Goals: ${fields.goals}
Strengths: ${fields.strengths}
Areas to Improve: ${fields.weaknesses}

You're a personal tutor helping this student on their learning journey. Start by greeting the student and suggesting a relevant topic to get started based on their inputs.
    `.trim();

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://dret-ai-backend-f9drcacng0f2gmc4.uksouth-01.azurewebsites.net/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: "asst_TPio94mmgxvIfBBOJGrV51z5", // Replace with your tutor assistant
          message,
          metadata: {
            student_name: fields.name,
            year_group: fields.yearGroup,
          }
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

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen h-screen flex flex-col font-avenir">
        <div className="bg-gray-50/80 shadow-sm px-6 h-24 flex items-center sticky top-0 z-20">
          <div style={{ display: "flex", alignItems: "center", transform: "translateY(4px)" }}>
            <span className="inline-block w-1.5 h-8 rounded-full bg-[var(--trust-green)] mr-4" />
            <h1 className="text-xl font-bold text-[var(--trust-green)]">Student Tutor Agent</h1>
          </div>
        </div>

        <div className="flex flex-1 min-h-0 w-full gap-8 px-8 py-8 bg-gray-100">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-md w-[420px] flex flex-col h-full min-w-[320px] max-w-[420px]">
            <div className="flex-1 min-h-0 overflow-y-auto px-6 pt-6 pb-4 custom-scrollbar">
              {[
                { label: "Name", key: "name", placeholder: "Alex" },
                { label: "Year Group", key: "yearGroup", placeholder: "Year 8" },
                { label: "Subjects", key: "subjects", placeholder: "Maths, History, Science" },
                { label: "Goals", key: "goals", placeholder: "Improve exam scores, revise key topics" },
                { label: "Strengths", key: "strengths", placeholder: "Good at problem-solving" },
                { label: "Weaknesses", key: "weaknesses", placeholder: "Struggles with essay planning" },
              ].map(({ label, key, placeholder }) => (
                <div className="mb-3" key={key}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                  <textarea
                    value={fields[key]}
                    onChange={e => handleChange(key, e.target.value)}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm min-h-[60px]"
                  />
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 px-6 py-3 bg-white rounded-b-xl sticky bottom-0 z-10 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="bg-[var(--trust-green)] text-white px-4 py-2 rounded-md hover:bg-green-800 transition text-sm font-semibold"
              >
                {loading ? "Thinking..." : "Start Tutoring"}
              </button>
            </div>
          </div>

          {/* AI Response Section */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="bg-white rounded-xl shadow-md h-full flex flex-col relative">
              <div
                ref={scrollAreaRef}
                className="flex-1 overflow-y-auto px-6 pt-6 pb-4 custom-scrollbar prose prose-sm max-w-none"
              >
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full w-full py-10">
                    <div className="flex space-x-2 mt-4">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="inline-block w-3 h-3 rounded-full bg-[var(--trust-green)] animate-bounce" style={{ animationDelay: `${-0.3 + i * 0.15}s` }}></span>
                      ))}
                    </div>
                    <div className="text-gray-500 italic text-sm mt-3">Loading tutor response...</div>
                  </div>
                ) : response ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {response}
                  </ReactMarkdown>
                ) : (
                  <div className="text-gray-400 italic text-sm">
                    Your tutor's response will appear here.
                  </div>
                )}
              </div>
            </div>
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
        `}</style>
      </div>
    </Layout>
  );
}
