import React, { useState, useRef } from "react";
import Layout from "../../../layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { marked } from "marked";
import htmlDocx from "html-docx-js/dist/html-docx";

export default function ExclusionReportTool() {
  const [fields, setFields] = useState({
    pupilName: "",
    dob: "",
    yearGroup: "",
    entryDate: "",
    pupilDetails: "",
    reason: "",
    breachType: "",
    context: "",
    incidentChronology: "",
    behaviourSummary: "",
    interventions: "",
    equalityConsiderations: "",
    mitigatingFactors: "",
    alternatives: "",
    conclusion: "",
  });

  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef(null);

  // Handle changes for text fields
  const handleChange = (name, value) => {
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  // Generate the message for the API
  const buildPrompt = () => {
    return `
STRICTLY CONFIDENTIAL

Permanent Exclusion Report

Pupil Name: ${fields.pupilName}
Date of Birth: ${fields.dob}
Year Group: ${fields.yearGroup}
Date Joined Academy: ${fields.entryDate}
Pupil Contextual Details: ${fields.pupilDetails}

Reason for Permanent Exclusion: ${fields.reason}
Type of Breach: ${fields.breachType}
Context and Rationale: ${fields.context}

Incident Chronology:
${fields.incidentChronology}

Behaviour & Sanctions Summary:
${fields.behaviourSummary}

Support, Interventions and Reasonable Adjustments:
${fields.interventions}

Equality Act 2010 / Children and Families Act 2014 Considerations:
${fields.equalityConsiderations}

Mitigating Factors:
${fields.mitigatingFactors}

Alternatives Considered:
${fields.alternatives}

Conclusion (Legality, Procedure, Rationale):
${fields.conclusion}

Please generate a permanent exclusion report using the above information in formal, legally appropriate language, filling in each section as a narrative. Where evidence (files) are attached, indicate their inclusion as an appendix reference.
    `.trim();
  };

  // Convert files to base64 (if you want to send file contents to API)
  const convertFilesToBase64 = async (files) => {
    const promises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () =>
          resolve({ name: file.name, content: reader.result });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(promises);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Minimal required validation
    if (
      !fields.pupilName.trim() ||
      !fields.yearGroup.trim() ||
      !fields.reason.trim() ||
      !fields.incidentChronology.trim()
    ) {
      setResponse("Please fill in at least the required fields: Pupil Name, Year Group, Reason, and Incident Chronology.");
      return;
    }

    setLoading(true);
    setResponse("");

    let filesData = [];
    if (files.length > 0) {
      filesData = await convertFilesToBase64(files);
    }

    const prompt = buildPrompt();

    try {
      const res = await fetch("https://dret-ai-backend-f9drcacng0f2gmc4.uksouth-01.azurewebsites.net/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: "asst_1UapHOvlRnY8SYKyizeXmUcZ", // Use your exclusion agent's actual ID
          message: prompt,
          appendices: filesData,
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

  // Export to DOCX
  const exportToDocx = () => {
    const html = marked.parse(response);
    const fullHtml = `<html><body>${html}</body></html>`;
    const docxBlob = htmlDocx.asBlob(fullHtml);
    const url = URL.createObjectURL(docxBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "permanent-exclusion-report.docx";
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
              Permanent Exclusion Report Generator
            </h1>
          </div>
        </div>
        <div className="flex flex-1 min-h-0 w-full gap-8 px-8 py-8 bg-gray-100">
          <div className="bg-white rounded-xl shadow-md w-[450px] flex flex-col h-full" style={{ minWidth: 340, maxWidth: 470 }}>
            <form
              className="flex-1 min-h-0 overflow-y-auto px-6 pt-6 pb-4 custom-scrollbar"
              style={{ minHeight: 120 }}
              onSubmit={handleSubmit}
            >
              {/* Map each template section to an input field */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Pupil Name*</label>
                <input
                  type="text"
                  value={fields.pupilName}
                  onChange={e => handleChange("pupilName", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={fields.dob}
                  onChange={e => handleChange("dob", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Year Group*</label>
                <input
                  type="text"
                  value={fields.yearGroup}
                  onChange={e => handleChange("yearGroup", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Date Joined Academy</label>
                <input
                  type="date"
                  value={fields.entryDate}
                  onChange={e => handleChange("entryDate", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Pupil Contextual Details (SEND, LAC, FSM, etc)</label>
                <textarea
                  value={fields.pupilDetails}
                  onChange={e => handleChange("pupilDetails", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm min-h-[50px]"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Reason for Permanent Exclusion*</label>
                <input
                  type="text"
                  value={fields.reason}
                  onChange={e => handleChange("reason", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Type of Breach</label>
                <select
                  value={fields.breachType}
                  onChange={e => handleChange("breachType", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                >
                  <option value="">Select...</option>
                  <option value="One-off serious breach">One-off serious breach</option>
                  <option value="Persistent breaches">Persistent breaches</option>
                  <option value="Serious harm to others">Serious harm to others</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Context and Rationale</label>
                <textarea
                  value={fields.context}
                  onChange={e => handleChange("context", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm min-h-[50px]"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Incident Chronology*</label>
                <textarea
                  value={fields.incidentChronology}
                  onChange={e => handleChange("incidentChronology", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm min-h-[50px]"
                  placeholder="List incidents and dates"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Behaviour & Sanctions Summary</label>
                <textarea
                  value={fields.behaviourSummary}
                  onChange={e => handleChange("behaviourSummary", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm min-h-[50px]"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Support, Interventions, Reasonable Adjustments</label>
                <textarea
                  value={fields.interventions}
                  onChange={e => handleChange("interventions", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm min-h-[50px]"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Equality Act / Children and Families Act Considerations</label>
                <textarea
                  value={fields.equalityConsiderations}
                  onChange={e => handleChange("equalityConsiderations", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm min-h-[50px]"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Mitigating Factors</label>
                <textarea
                  value={fields.mitigatingFactors}
                  onChange={e => handleChange("mitigatingFactors", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm min-h-[50px]"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Alternatives Considered</label>
                <textarea
                  value={fields.alternatives}
                  onChange={e => handleChange("alternatives", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm min-h-[50px]"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Conclusion (Legality, Procedure, Rationale)</label>
                <textarea
                  value={fields.conclusion}
                  onChange={e => handleChange("conclusion", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm min-h-[50px]"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Appendices / Attachments (e.g. Witness Statements, Logs)</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
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
          </div>
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="bg-white rounded-xl shadow-md h-full flex flex-col relative">
              <div
                ref={scrollAreaRef}
                className="flex-1 overflow-y-auto px-6 pt-6 pb-4 custom-scrollbar prose prose-sm max-w-none"
                style={{
                  minHeight: 120,
                }}
              >
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full w-full py-10">
                    <div className="flex space-x-2 mt-4">
                      <span className="inline-block w-3 h-3 rounded-full bg-[var(--trust-green)] animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="inline-block w-3 h-3 rounded-full bg-[var(--trust-green)] animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="inline-block w-3 h-3 rounded-full bg-[var(--trust-green)] animate-bounce"></span>
                    </div>
                    <div className="text-gray-500 italic text-sm mt-3">Generating report...</div>
                  </div>
                ) : response ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {response}
                  </ReactMarkdown>
                ) : (
                  <div className="text-gray-400 italic text-sm">
                    Your permanent exclusion report will appear here.
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