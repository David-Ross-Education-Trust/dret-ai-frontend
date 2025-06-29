import React, { useState } from "react";
import Layout from "../../../layout";
import { toolsConfig } from "../components/toolConfig";
import { Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const subjectStyles = {
  "English": { bg: "bg-blue-50", header: "bg-blue-200", text: "text-blue-800", icon: "📖" },
  "Maths": { bg: "bg-yellow-50", header: "bg-yellow-200", text: "text-yellow-800", icon: "➗" },
  "Science": { bg: "bg-green-50", header: "bg-green-200", text: "text-green-800", icon: "🔬" },
  "History": { bg: "bg-orange-50", header: "bg-orange-200", text: "text-orange-800", icon: "🏺" },
  "Geography": { bg: "bg-cyan-50", header: "bg-cyan-200", text: "text-cyan-800", icon: "🗺️" },
  "MFL": { bg: "bg-pink-50", header: "bg-pink-200", text: "text-pink-800", icon: "🌍" }
};

const subjects = ["English", "Maths", "Science", "History", "Geography", "MFL"];

function groupToolsBySubject(tools) {
  const grouped = {};
  subjects.forEach(subject => {
    grouped[subject] = tools.filter(
      tool => !tool.comingSoon && (
        Array.isArray(tool.category)
          ? tool.category.includes(subject)
          : tool.category === subject
      )
    );
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

  const grouped = groupToolsBySubject(toolsConfig);

  return (
    <Layout>
      <div className="font-sans bg-gray-50 min-h-screen px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-10 text-trust-green">AI Tools by Subject</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {subjects.map(subject => {
              const tools = grouped[subject];
              const style = subjectStyles[subject] || {};
              return (
                <div key={subject} className={`rounded-xl shadow-lg overflow-hidden flex flex-col ${style.bg || "bg-gray-100"}`}>
                  <div className={`flex items-center px-5 py-3 ${style.header || "bg-gray-200"} ${style.text || "text-gray-800"}`}>
                    <span className="text-2xl mr-2">{style.icon || "📚"}</span>
                    <span className="text-lg font-bold">{subject}</span>
                  </div>
                  <ul className="flex-1 flex flex-col px-4 py-2">
                    {tools.length === 0 ? (
                      <li className="text-sm text-gray-400 italic py-4">No tools for this subject.</li>
                    ) : (
                      tools.slice(0, 5).map(tool => (
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
                      ))
                    )}
                  </ul>
                  {tools.length > 5 && (
                    <Link
                      to="#"
                      className={`block w-full text-center py-2 font-semibold ${style.text || "text-gray-800"} hover:underline`}
                    >
                      More {subject} Tools
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
