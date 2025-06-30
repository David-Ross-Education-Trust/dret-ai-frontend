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
  New: "bg-green-50 text-green-800 border-green-200",
  Favourites: "bg-yellow-50 text-yellow-800 border-yellow-200",
  Assessment: "bg-blue-50 text-blue-800 border-blue-200",
  Planning: "bg-blue-50 text-blue-800 border-blue-200",
  Admin: "bg-blue-50 text-blue-800 border-blue-200",
  Leadership: "bg-blue-50 text-blue-800 border-blue-200",
  Inclusion: "bg-blue-50 text-blue-800 border-blue-200",
  CPD: "bg-blue-50 text-blue-800 border-blue-200",
  English: "bg-violet-100 text-violet-800 border-violet-200",
  Maths: "bg-yellow-100 text-yellow-900 border-yellow-200",
  Science: "bg-cyan-100 text-cyan-800 border-cyan-200",
  History: "bg-orange-100 text-orange-800 border-orange-200",
  Geography: "bg-lime-100 text-lime-800 border-lime-200",
  MFL: "bg-pink-100 text-pink-800 border-pink-200",
};

const filterActiveColors = {
  New: "bg-green-700 text-white border-green-700",
  Favourites: "bg-yellow-400 text-white border-yellow-400",
  Assessment: "bg-blue-700 text-white border-blue-700",
  Planning: "bg-blue-700 text-white border-blue-700",
  Admin: "bg-blue-700 text-white border-blue-700",
  Leadership: "bg-blue-700 text-white border-blue-700",
  Inclusion: "bg-blue-700 text-white border-blue-700",
  CPD: "bg-blue-700 text-white border-blue-700",
  English: "bg-violet-100 text-violet-800 border-violet-200",
  Maths: "bg-yellow-100 text-yellow-900 border-yellow-200",
  Science: "bg-cyan-100 text-cyan-800 border-cyan-200",
  History: "bg-orange-100 text-orange-800 border-orange-200",
  Geography: "bg-lime-100 text-lime-800 border-lime-200",
  MFL: "bg-pink-100 text-pink-800 border-pink-200",
};

const filterGrey = "bg-gray-200 text-gray-400 border-gray-200";

export default function Homepage({ showOnlyFavourites }) {
  const navigate = useNavigate();
  const { accounts, instance } = useMsal();
  const isSignedIn = accounts.length > 0;
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGeneral, setSelectedGeneral] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
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
        return searchTerm.trim() === "" && (!selectedGeneral && !selectedSubject);
      }
      const matchesSearch =
        (tool.name && tool.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tool.description && tool.description.toLowerCase().includes(searchTerm.toLowerCase()));

      let matchesGeneral = false;
      if (showOnlyFavourites) matchesGeneral = favourites.includes(tool.name);
      else if (!selectedGeneral) matchesGeneral = true;
      else if (selectedGeneral === "Favourites") matchesGeneral = favourites.includes(tool.name);
      else if (selectedGeneral === "New") matchesGeneral = tool.tag === "New";
      else if (Array.isArray(tool.category)) matchesGeneral = tool.category.includes(selectedGeneral);
      else matchesGeneral = tool.category === selectedGeneral;

      let matchesSubject = false;
      if (!selectedSubject) matchesSubject = true;
      else if (Array.isArray(tool.category)) matchesSubject = tool.category.includes(selectedSubject);
      else matchesSubject = tool.category === selectedSubject;

      return matchesSearch && matchesGeneral && matchesSubject;
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
          <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-4 w-full font-avenir">
            <div className="flex flex-row flex-nowrap items-center justify-between py-3 font-avenir">
              <div className="flex flex-wrap gap-2 max-w-[calc(100vw-350px)] items-center font-avenir">
                {generalCategories.map((tag, idx) => {
                  let classNames = `px-4 py-1.5 border rounded-full text-xs font-medium cursor-pointer transition-all text-center select-none font-avenir`;
                  if (selectedGeneral === tag) {
                    classNames += " " + (filterActiveColors[tag] || "bg-gray-400 text-white border-gray-400") + " shadow-sm";
                  } else if (selectedGeneral && tag !== selectedGeneral) {
                    classNames += " " + filterGrey;
                  } else {
                    classNames += " " + (filterColors[tag] || "bg-gray-200 text-gray-700 border-gray-300") + " hover:brightness-95";
                  }
                  return (
                    <React.Fragment key={tag}>
                      <span
                        onClick={() => setSelectedGeneral(selectedGeneral === tag ? "" : tag)}
                        className={classNames}
                        style={{
                          whiteSpace: "nowrap",
                          borderWidth: "1px",
                          transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
                          fontFamily: "AvenirLTStdLight, Avenir, sans-serif"
                        }}
                      >
                        {tag}
                      </span>
                      {tag === "CPD" && (
                        <span
                          aria-hidden
                          className="mx-2 h-6 border-l border-gray-300 opacity-60"
                          style={{ display: "inline-block", verticalAlign: "middle" }}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
                {subjectCategories.map((tag) => {
                  let classNames = `px-4 py-1.5 border rounded-full text-xs font-medium cursor-pointer transition-all text-center select-none font-avenir`;
                  if (selectedSubject === tag) {
                    classNames += " " + (filterActiveColors[tag] || "bg-gray-400 text-white border-gray-400") + " shadow-sm";
                  } else if (selectedSubject && tag !== selectedSubject) {
                    classNames += " " + filterGrey;
                  } else {
                    classNames += " " + (filterColors[tag] || "bg-gray-200 text-gray-700 border-gray-300") + " hover:brightness-95";
                  }
                  return (
                    <span
                      key={tag}
                      onClick={() => setSelectedSubject(selectedSubject === tag ? "" : tag)}
                      className={classNames}
                      style={{
                        whiteSpace: "nowrap",
                        borderWidth: "1px",
                        transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
                        fontFamily: "AvenirLTStdLight, Avenir, sans-serif"
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
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
