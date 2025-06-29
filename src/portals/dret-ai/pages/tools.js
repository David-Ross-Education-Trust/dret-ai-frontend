import React, { useState } from "react";
import Layout from "../../../layout";
import { toolsConfig } from "../components/toolConfig";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const subjectMeta = {
  English: {
    bgHeader: "bg-blue-100",
    icon: <span className="text-blue-400 text-2xl mr-2">📘</span>,
  },
  Maths: {
    bgHeader: "bg-yellow-100",
    icon: <span className="text-yellow-400 text-2xl mr-2">➗</span>,
  },
  Science: {
    bgHeader: "bg-green-100",
    icon: <span className="text-green-400 text-2xl mr-2">🔬</span>,
  },
  History: {
    bgHeader: "bg-orange-100",
    icon: <span className="text-orange-400 text-2xl mr-2">🏺</span>,
  },
  Geography: {
    bgHeader: "bg-cyan-100",
    icon: <span className="text-cyan-400 text-2xl mr-2">🗺️</span>,
  },
  MFL: {
    bgHeader: "bg-pink-100",
    icon: <span className="text-pink-400 text-2xl mr-2">🌍</span>,
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
      <div className="font-avenir bg-gray-50 min-h-screen px-2 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map(subject => {
              const tools = grouped[subject];
              const meta = subjectMeta[subject] || {};
              return (
                <div
                  key={subject}
                  className="rounded-2xl shadow-xl border border-gray-100 bg-white flex flex-col overflow-hidden transition-transform hover:scale-[1.01]"
                  style={{ minHeight: 410 }}
                >
                  <div className={`flex items-center px-6 py-3 ${meta.bgHeader || "bg-gray-100"}`}>
                    {meta.icon}
                    <span className="text-lg font-bold text-gray-700">{subject}</span>
                  </div>
                  <div className="border-b border-gray-200" />
                  <div className="flex-1 px-4 py-4">
                    {tools.length === 0 ? (
                      <div className="flex flex-col items-center text-gray-400 py-7">
                        <span className="text-xl">{meta.icon}</span>
                        <span className="text-sm mt-1">No {subject} tools yet. Watch this space!</span>
                      </div>
                    ) : (
                      <ul className="space-y-4">
                        {tools.map(tool => (
                          <li key={tool.id}>
                            <div
                              className="flex items-start rounded-lg shadow-sm bg-white border border-gray-100 hover:shadow-md px-4 py-3 transition cursor-pointer group"
                              onClick={() => tool.href && navigate(tool.href)}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center">
                                  <span className="font-semibold text-gray-800 text-base group-hover:underline">{tool.name}</span>
                                  {tool.tag === "New" && (
                                    <span className="ml-2 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">New</span>
                                  )}
                                  {tool.tag === "Hot" && (
                                    <span className="ml-2 bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-xs font-medium">Hot</span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500 mt-1 pr-3">{tool.description}</div>
                              </div>
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  toggleFavourite(tool.name);
                                }}
                                className="ml-4 mt-1 p-1"
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
    </Layout>
  );
}
