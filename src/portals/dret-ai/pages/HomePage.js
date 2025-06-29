import React, { useState } from "react";
import { Search, X } from "lucide-react";
import Layout from "../../../layout";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { toolsConfig } from "../components/toolConfig";
import ToolCard from "../components/toolCard";

function LoginSplash({ onLogin }) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh)] w-full bg-gray-100 font-avenir">
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
  Favourites: "bg-yellow-50 text-yellow-700 border-yellow-200",
  New: "bg-blue-50 text-blue-700 border-blue-200",
  All: "bg-blue-50 text-blue-700 border-blue-200"
};

const filterActiveColors = {
  Assessment: "bg-green-700 text-white border-green-700",
  Planning: "bg-green-700 text-white border-green-700",
  Admin: "bg-green-700 text-white border-green-700",
  Leadership: "bg-green-700 text-white border-green-700",
  Inclusion: "bg-green-700 text-white border-green-700",
  English: "bg-blue-700 text-white border-blue-700",
  Maths: "bg-yellow-600 text-white border-yellow-600",
  Science: "bg-green-800 text-white border-green-800",
  History: "bg-orange-500 text-white border-orange-500",
  Geography: "bg-cyan-600 text-white border-cyan-600",
  MFL: "bg-pink-600 text-white border-pink-600",
  CPD: "bg-purple-700 text-white border-purple-700",
  Favourites: "bg-yellow-400 text-white border-yellow-400",
  New: "bg-blue-700 text-white border-blue-700",
  All: "bg-blue-700 text-white border-blue-700"
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
        <div className="h-screen flex items-center justify-center font-avenir">
          <LoginSplash onLogin={() => instance.loginRedirect()} />
        </div>
      ) : (
        <div className="bg-gray-50 min-h-screen h-screen flex flex-col font-avenir">
          {/* HEADER */}
          <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-4 w-full font-avenir">
            <div className="flex flex-row flex-nowrap items-center justify-between py-3 font-avenir">
              {/* FILTER BUTTONS with divider */}
              <div className="flex flex-wrap gap-2 max-w-[calc(100vw-350px)] items-center font-avenir">
                {/* General Categories */}
                {generalCategories.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span
                      onClick={() => setSelectedCategory(tag)}
                      className={`px-4 py-1.5 border rounded-full text-xs font-medium cursor-pointer transition-all text-center select-none font-avenir
                        ${
                          selectedCategory === tag
                            ? (filterActiveColors[tag] || "bg-gray-400 text-white border-gray-400") + " shadow-sm"
                            : (filterColors[tag] || "bg-gray-200 text-gray-600 border-gray-300") + " hover:brightness-95"
                        }
                      `}
                      style={{
                        whiteSpace: "nowrap",
                        borderWidth: "1px",
                        transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
                        fontFamily: "AvenirLTStdLight, Avenir, sans-serif"
                      }}
                    >
                      {tag}
                    </span>
                    {/* Divider after CPD */}
                    {tag === "CPD" && (
                      <span
                        aria-hidden
                        className="mx-2 h-6 border-l border-gray-300 opacity-60"
                        style={{ display: "inline-block", verticalAlign: "middle" }}
                      />
                    )}
                  </React.Fragment>
                ))}
                {/* Subject Categories */}
                {subjectCategories.map((tag) => (
                  <span
                    key={tag}
                    onClick={() => setSelectedCategory(tag)}
                    className={`px-4 py-1.5 border rounded-full text-xs font-medium cursor-pointer transition-all text-center select-none font-avenir
                      ${
                        selectedCategory === tag
                          ? (filterActiveColors[tag] || "bg-gray-400 text-white border-gray-400") + " shadow-sm"
                          : (filterColors[tag] || "bg-gray-200 text-gray-600 border-gray-300") + " hover:brightness-95"
                      }
                    `}
                    style={{
                      whiteSpace: "nowrap",
                      borderWidth: "1px",
                      transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
                      fontFamily: "AvenirLTStdLight, Avenir, sans-serif"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* SEARCH BAR */}
              <div className="relative flex-shrink-0 w-[240px] ml-4 font-avenir">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tools"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`w-full border ${
                    searchFocused ? "" : "border-gray-300"
                  } rounded-md px-4 py-2 pr-10 text-sm outline-none transition font-avenir`}
                  style={{
                    borderColor: searchFocused ? TRUST_GREEN : undefined,
                    boxShadow: searchFocused
                      ? `0 0 0 2px ${TRUST_GREEN}40`
                      : undefined,
                    fontFamily: "AvenirLTStdLight, Avenir, sans-serif"
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
          {/* MAIN TOOLS GRID */}
          <div className="scroll-area flex-1 overflow-y-auto bg-gray-100 font-avenir">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 pb-16">
              {filteredTools.map((tool, idx) =>
                tool.comingSoon ? (
                  <div
                    key={tool.id || idx}
                    className="relative rounded-xl bg-gray-200 text-gray-500 shadow-md flex flex-col items-center justify-center p-4 h-[150px] opacity-70 select-none cursor-default border-2 border-dashed border-gray-300 font-avenir"
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
