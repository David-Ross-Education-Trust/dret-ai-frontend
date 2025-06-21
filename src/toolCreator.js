import React, { useState } from "react";
import Layout from "./layout";

export default function ToolCreator() {
  const [tool, setTool] = useState({
    name: "",
    agentId: "",
    description: "",
    category: "",
    tag: "",
    href: "",
    buttonText: "Submit",
    promptSuffix: "",
    fields: [
      { name: "", label: "", type: "text", placeholder: "" }
    ]
  });

  // Add/Remove/Edit fields
  const handleFieldChange = (idx, key, value) => {
    const newFields = [...tool.fields];
    newFields[idx][key] = value;
    setTool({ ...tool, fields: newFields });
  };

  const addField = () => {
    setTool({
      ...tool,
      fields: [...tool.fields, { name: "", label: "", type: "text", placeholder: "" }]
    });
  };

  const removeField = (idx) => {
    setTool({
      ...tool,
      fields: tool.fields.filter((_, i) => i !== idx)
    });
  };

  // Handle top-level tool property changes
  const handleChange = (key, value) => setTool({ ...tool, [key]: value });

  // Auto-generate href from name if empty
  React.useEffect(() => {
    if (!tool.href && tool.name) {
      setTool(t =>
        ({ ...t, href: "/" + t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") })
      );
    }
  }, [tool.name]);

  // For pretty-printing tool config
  const toolConfigPreview = {
    id: "REPLACE_ME",
    name: tool.name,
    description: tool.description,
    category: tool.category,
    tag: tool.tag,
    href: tool.href,
    agentId: tool.agentId,
    promptSuffix: tool.promptSuffix,
    buttonText: tool.buttonText,
    fields: tool.fields,
    comingSoon: false
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10 font-avenir">
        <h1 className="text-2xl font-bold mb-4 text-[var(--trust-green)]">Tool Creator</h1>
        {/* Main tool properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tool Name</label>
            <input className="w-full border px-3 py-2 rounded mt-1" value={tool.name}
              onChange={e => handleChange("name", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Agent ID</label>
            <input className="w-full border px-3 py-2 rounded mt-1" value={tool.agentId}
              onChange={e => handleChange("agentId", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input className="w-full border px-3 py-2 rounded mt-1" value={tool.description}
              onChange={e => handleChange("description", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input className="w-full border px-3 py-2 rounded mt-1" value={tool.category}
              onChange={e => handleChange("category", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tag</label>
            <input className="w-full border px-3 py-2 rounded mt-1" value={tool.tag}
              onChange={e => handleChange("tag", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL Path</label>
            <input className="w-full border px-3 py-2 rounded mt-1" value={tool.href}
              onChange={e => handleChange("href", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prompt Suffix (optional)</label>
            <input className="w-full border px-3 py-2 rounded mt-1" value={tool.promptSuffix}
              onChange={e => handleChange("promptSuffix", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Button Text</label>
            <input className="w-full border px-3 py-2 rounded mt-1" value={tool.buttonText}
              onChange={e => handleChange("buttonText", e.target.value)} />
          </div>
        </div>

        {/* Fields */}
        <h2 className="text-lg font-semibold mb-2 text-[var(--trust-green)]">Fields</h2>
        <div className="space-y-4 mb-6">
          {tool.fields.map((field, idx) => (
            <div key={idx} className="border rounded p-4 flex gap-3 items-end bg-gray-50">
              <div className="flex-1">
                <label className="block text-xs font-medium">Name (id)</label>
                <input
                  className="w-full border px-2 py-1 rounded"
                  value={field.name}
                  onChange={e => handleFieldChange(idx, "name", e.target.value)}
                  placeholder="subject"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium">Label</label>
                <input
                  className="w-full border px-2 py-1 rounded"
                  value={field.label}
                  onChange={e => handleFieldChange(idx, "label", e.target.value)}
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="block text-xs font-medium">Type</label>
                <select
                  className="border px-2 py-1 rounded"
                  value={field.type}
                  onChange={e => handleFieldChange(idx, "type", e.target.value)}
                >
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Select</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium">Placeholder</label>
                <input
                  className="w-full border px-2 py-1 rounded"
                  value={field.placeholder}
                  onChange={e => handleFieldChange(idx, "placeholder", e.target.value)}
                  placeholder="e.g. Mathematics"
                />
              </div>
              <button
                type="button"
                className="ml-2 text-xs text-red-600 px-2 py-1 rounded hover:bg-red-100"
                onClick={() => removeField(idx)}
                disabled={tool.fields.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-trust-green text-white px-4 py-2 rounded hover:bg-trust-green-dark transition text-sm mt-2"
            onClick={addField}
          >
            + Add Field
          </button>
        </div>

        {/* Preview */}
        <h2 className="text-lg font-semibold mb-2 text-[var(--trust-green)]">Config Preview</h2>
        <pre className="bg-gray-900 text-white rounded p-4 text-xs overflow-x-auto mt-2">
          {JSON.stringify(toolConfigPreview, null, 2)}
        </pre>
      </div>
    </Layout>
  );
}
