import React, { useState } from "react";
import { Search, X } from "lucide-react";
import Layout from "../../../layout";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { toolsConfig } from "../components/toolConfig";
import ToolCard from "../components/toolCard";

function LoginSplash({ onLogin }) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh)] w-full bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col items-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[var(--trust-green)] font-avenir">Welcome to DRET.AI</h1>
        <button
          onClick={onLogin}
          className="bg-[var(--trust-green)] text-white px-8 py-2 rounded-full font-semibold text-lg hover:bg-green-900 transition font-avenir"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

const generalCategories = [
  "All",
  "New",
  "Favourites",
  "Assessment",
  "Planning",
  "Inclusion",
  "Leadership",
  "Admin",
  "CPD",
];

const subjectCategories = [
  "English",
  "Maths",
  "Science",
  "History",
  "Geography",
  "MFL",
];

const filterColors = {
  Assessment: "bg-green-50 text-green-700 border-green-200",
  Planning: "bg-green-50 text-green-700 border-green-200",
  Admin: "bg-green-50 text-green-700 border-green-200",
  Leadership: "bg-green-50 text-green-700 border-green-200",
  Inclusion: "bg-green-50 text-green-700 border-green-200",
  English: "bg-blue-50 text-blue-700 border-blue-200",
  Maths: "bg-yellow-50 text-yellow-800 border-yellow-200",
  Science: "bg-green-100 text-green-800 border-green-300",
  History: "bg-orange-50 text-orange-700 border-orange-200",
  Geography: "bg-cyan-50 text-cyan-700 border-cyan-200",
  MFL: "bg-pink-50 text-pink-700 border-pink-200",
  CPD: "bg-purple-50 text-purple-700 border-purple-200",
  Favourites: "bg-blue-50 text-blue-700 border-blue-200",
  New: "bg-blue-50 text-blue-700 border-blue-200",
  All: "bg-blue-50 text-blue-700 border-blue-200"
};

export default function Homepage({ showOnlyFavourites }) {
  const navigate = useNavigate();
  const { accounts, instance } = useMsal();
  const isSignedIn = accounts.length > 0;
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [clickedStar, setClickedStar] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const TRUST_GREEN = "#205c40";

  const toggleFavourite = (toolName) => {
    setFavourites((prev) => {
      const updated = prev.includes(toolName)
        ? prev.filter((name) => name !== toolName)
        : [...prev, toolName];
      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    });
    setClickedStar(toolName);
    setTimeout(() => setClickedStar(null), 400);
  };

  const handleCardClick = (tool) => {
    if (isSignedIn && tool.href) {
      navigate(tool.href);
    }
  };

  const filteredTools = toolsConfig
    .filter((tool) => {
      if (tool.comingSoon) {
        return searchTerm.trim() === "" && (selectedCategory === "All");
      }
      const matchesSearch =
        (tool.name && tool.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tool.description && tool.description.toLowerCase().includes(searchTerm.toLowerCase()));
      let matchesCategory = false;
      if (showOnlyFavourites) matchesCategory = favourites.includes(tool.name);
      else if (selectedCategory === "All") matchesCategory = true;
      else if (selectedCategory === "Favourites") matchesCategory = favourites.includes(tool.name);
      else if (selectedCategory === "New") matchesCategory = tool.tag === "New";
      else if (Array.isArray(tool.category)) matchesCategory = tool.category.includes(selectedCategory);
      else matchesCategory = tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (a.comingSoon && !b.comingSoon) return 1;
      if (!a.comingSoon && b.comingSoon) return -1;
      const aFav = favourites.includes(a.name);
      const bFav = favourites.includes(b.name);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return parseInt(b.id || "0") - parseInt(a.id || "0");
    });

  return (
    <Layout>
      {!isSignedIn ? (
        <div className="h-screen flex items-center justify-center">
          <LoginSplash onLogin={() => instance.loginRedirect()} />
        </div>
      ) : (
        <div className="font-avenir bg-gray-50 min-h-screen h-screen flex flex-col">
          <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-4 h-24 flex items-center">
            <div className="flex items-center w-full flex-wrap md:flex-nowrap gap-y-1">
              <div className="flex gap-2 flex-wrap">
                {generalCategories.map((tag, idx) => (
                  <span
                    key={tag}
                    onClick={() => setSelectedCategory(tag)}
                    className={`px-4 py-1.5 border rounded-full text-xs font-medium cursor-pointer transition-all text-center
                      ${selectedCategory === tag
                        ? `${filterColors[tag]} font-semibold border-[var(--trust-green)]`
                        : "hover:brightness-95 " + (filterColors[tag] || "bg-gray-200 text-gray-600 border-gray-300")
                      }`}
                    style={{
                      whiteSpace: "nowrap",
                      marginLeft: idx === 0 ? 0 : "0.25rem",
                      marginRight: idx === generalCategories.length - 1 ? 0 : "0.25rem",
                      borderWidth: "1px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="hidden md:block mx-2" style={{ width: 1, height: 28, background: "#e5e7eb" }} />
              <div className="flex flex-col">
                <div className="flex gap-2 flex-wrap" style={{ marginTop: 7 }}>
                  {subjectCategories.map((tag, idx) => (
                    <span
                      key={tag}
                      onClick={() => setSelectedCategory(tag)}
                      className={`px-4 py-1.5 border rounded-full text-xs font-medium cursor-pointer transition-all text-center
                        ${selectedCategory === tag
                          ? `${filterColors[tag]} font-semibold border-[var(--trust-green)]`
                          : "hover:brightness-95 " + (filterColors[tag] || "bg-gray-200 text-gray-600 border-gray-300")
                        }`}
                      style={{
                        whiteSpace: "nowrap",
                        marginLeft: idx === 0 ? 0 : "0.25rem",
                        marginRight: idx === subjectCategories.length - 1 ? 0 : "0.25rem",
                        borderWidth: "1px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ml-auto flex items-center h-full">
                <div className="relative w-[240px] flex items-center" style={{ height: "40px" }}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search tools"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className={`w-full border ${
                      searchFocused ? "" : "border-gray-300"
                    } rounded-md px-4 py-2 pr-10 text-sm outline-none transition`}
                    style={{
                      borderColor: searchFocused ? TRUST_GREEN : undefined,
                      boxShadow: searchFocused
                        ? `0 0 0 2px ${TRUST_GREEN}40`
                        : undefined,
                    }}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-9 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-area flex-1 overflow-y-auto bg-gray-100">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 pb-16">
              {filteredTools.map((tool, idx) =>
                tool.comingSoon ? (
                  <div
                    key={tool.id || idx}
                    className="relative rounded-xl bg-gray-200 text-gray-500 shadow-md flex flex-col items-center justify-center p-4 h-[150px] opacity-70 select-none cursor-default border-2 border-dashed border-gray-300"
                  >
                    <span className="text-base font-semibold">New tools coming soon</span>
                  </div>
                ) : (
                  <ToolCard
                    key={tool.id || idx}
                    tool={tool}
                    isFavourite={favourites.includes(tool.name)}
                    onFavourite={toggleFavourite}
                    onClick={handleCardClick}
                    clickedStar={clickedStar}
                    disabled={!isSignedIn}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
