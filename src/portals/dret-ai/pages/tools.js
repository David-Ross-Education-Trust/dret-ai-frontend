import React, { useState } from "react";
import Layout from "../../../layout";
import { toolsConfig } from "../components/toolConfig";
import { Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const categoryStyles = {
  "Planning": { bg: "bg-red-100", header: "bg-red-200", text: "text-red-800", icon: "📚" },
  "Assessment": { bg: "bg-blue-100", header: "bg-blue-200", text: "text-blue-800", icon: "📝" },
  "Support": { bg: "bg-orange-100", header: "bg-orange-200", text: "text-orange-800", icon: "🧰" },
  "Engage": { bg: "bg-purple-100", header: "bg-purple-200", text: "text-purple-800", icon: "💡" },
  "Feedback": { bg: "bg-yellow-100", header: "bg-yellow-200", text: "text-yellow-800", icon: "📊" },
  "Communication": { bg: "bg-green-100", header: "bg-green-200", text: "text-green-800", icon: "🌐" },
};

function groupToolsByCategory(tools) {
  const grouped = {};
  tools.forEach(tool => {
    if (!tool.comingSoon && tool.category) {
      if (!grouped[tool.category]) grouped[tool.category] = [];
      grouped[tool.category].push(tool);
    }
  });
  return grouped;
}

export default function ToolsPage() {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  const toggleFavourite = (toolName) => {
    setFavourites(prev => {
      const updated = prev.includes(toolName)
        ? prev.filter(n => n !== toolName)
        : [...prev, toolName];
      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    });
  };

  const grouped = groupToolsByCategory(toolsConfig);

  return (
    <Layout>
      <div className="font-sans bg-gray-50 min-h-screen px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-10 text-trust-green">AI Tools</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {Object.keys(grouped).map(category => {
              const tools = grouped[category];
              const style = categoryStyles[category] || {};
              return (
                <div key={category} className={`rounded-xl shadow-lg overflow-hidden flex flex-col ${style.bg || "bg-gray-100"}`}>
                  <div className={`flex items-center px-5 py-3 ${style.header || "bg-gray-200"} ${style.text || "text-gray-800"}`}>
                    <span className="text-2xl mr-2">{style.icon || "🔧"}</span>
                    <span className="text-lg font-bold">{category}</span>
                  </div>
                  <ul className="flex-1 flex flex-col px-4 py-2">
                    {tools.slice(0, 5).map(tool => (
                      <li
                        key={tool.id}
                        className="flex items-center justify-between px-1 py-2 border-b last:border-b-0"
                      >
                        <div
                          className="flex items-center gap-2 cursor-pointer group"
                          onClick={() => tool.href && navigate(tool.href)}
                        >
                          <span className="text-lg">{tool.icon || ""}</span>
                          <span className="text-base group-hover:underline">{tool.name}</span>
                        </div>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            toggleFavourite(tool.name);
                          }}
                          className="p-1"
                          tabIndex={0}
                          type="button"
                          aria-label={favourites.includes(tool.name) ? "Unfavourite" : "Favourite"}
                        >
                          <Star
                            className={`w-5 h-5 ${favourites.includes(tool.name) ? "text-yellow-400" : "text-gray-300"}`}
                            fill={favourites.includes(tool.name) ? "#fde047" : "none"}
                            strokeWidth={1.5}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                  {tools.length > 5 && (
                    <Link
                      to="#"
                      className={`block w-full text-center py-2 font-semibold ${style.text || "text-gray-800"} hover:underline`}
                    >
                      More {category} Tools
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
