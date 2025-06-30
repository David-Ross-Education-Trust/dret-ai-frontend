import React, { useState } from "react";
import Layout from "../../../layout";
import { toolsConfig } from "../components/toolConfig";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const subjectMeta = {
  English: {
    bgHeader: "bg-violet-100",
    icon: <span className="text-gray-700 text-2xl mr-2">📘</span>,
  },
  Maths: {
    bgHeader: "bg-yellow-100",
    icon: <span className="text-gray-700 text-2xl mr-2">➗</span>,
  },
  Science: {
    bgHeader: "bg-cyan-100",
    icon: <span className="text-gray-700 text-2xl mr-2">🔬</span>,
  },
  History: {
    bgHeader: "bg-orange-100",
    icon: <span className="text-gray-700 text-2xl mr-2">🏺</span>,
  },
  Geography: {
    bgHeader: "bg-lime-100",
    icon: <span className="text-gray-700 text-2xl mr-2">🗺️</span>,
  },
  MFL: {
    bgHeader: "bg-pink-100",
    icon: <span className="text-gray-700 text-2xl mr-2">🌍</span>,
  }
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
      <div className="font-avenir bg-gray-100 h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {subjects.map(subject => {
                const tools = grouped[subject];
                const meta = subjectMeta[subject] || {};
                return (
                  <div
                    key={subject}
                    className="rounded-2xl shadow-md border border-gray-100 bg-white flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
                    style={{ minHeight: 320 }}
                  >
                    <div className={`flex items-center px-6 py-3 ${meta.bgHeader}`}>
                      {meta.icon}
                      <span className={`text-lg font-bold ${
                        meta.icon?.props?.className?.split(" ").find(c => c.startsWith("text-")) || ""
                      }`}>
                        {subject}
                      </span>
                    </div>
                    <div className="border-b border-gray-200" />
                    <div className="flex-1 px-4 py-4">
                      {tools.length === 0 ? (
                        <div className="flex flex-col items-center text-gray-400 py-7">
                          <span className="text-xl">{meta.icon}</span>
                          <span className="text-sm mt-1">No {subject} tools yet. Watch this space!</span>
                        </div>
                      ) : (
                        <ul>
                          {tools.map(tool => (
                            <li key={tool.id}>
                              <div
                                className="flex items-center justify-between group px-2 py-2 rounded transition cursor-pointer hover:bg-gray-50"
                                onClick={() => tool.href && navigate(tool.href)}
                              >
                                <span className="font-medium text-gray-800 text-base group-hover:text-[var(--trust-green)] transition-colors truncate">
                                  {tool.name}
                                </span>
                                <button
                                  onClick={e => {
                                    e.stopPropagation();
                                    toggleFavourite(tool.name);
                                  }}
                                  className="ml-3 p-1"
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
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
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
