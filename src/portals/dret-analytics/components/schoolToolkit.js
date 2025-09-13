import React, { useState, useEffect } from "react";
import { Search, X, LayoutGrid, Grid3X3, List, Star } from "lucide-react";
import AnalyticsLayout from "./layout";
import ToolkitReportCard from "./ToolkitReportCard";

const TRUST_GREEN = "#205c40";

// Put constants outside component so ESLint doesn't warn
const VIEW_KEYS = {
  mode: "viewMode",
  favesOnly: "showFavesOnly",
  search: "searchTerm",
};

function useFavourites(key) {
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(favourites));
  }, [favourites, key]);

  const toggleFavourite = (id) =>
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  return [favourites, toggleFavourite];
}

export default function SchoolToolkit({
  schoolName,
  items,
  storageKey,
  defaultMode = "cosy",
}) {
  const [favourites, toggleFavourite] = useFavourites(storageKey);
  const [clickedStar, setClickedStar] = useState(null);

  // View mode (persisted per school)
  const [mode, setMode] = useState(
    localStorage.getItem(`${VIEW_KEYS.mode}_${storageKey}`) || defaultMode
  );
  useEffect(() => {
    localStorage.setItem(`${VIEW_KEYS.mode}_${storageKey}`, mode);
  }, [mode, storageKey]);

  // Favourites-only toggle (persisted per school)
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(
    localStorage.getItem(`${VIEW_KEYS.favesOnly}_${storageKey}`) === "true"
  );
  useEffect(() => {
    localStorage.setItem(
      `${VIEW_KEYS.favesOnly}_${storageKey}`,
      showFavouritesOnly
    );
  }, [showFavouritesOnly, storageKey]);

  // Search term (persisted per school)
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem(`${VIEW_KEYS.search}_${storageKey}`) || ""
  );
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    localStorage.setItem(`${VIEW_KEYS.search}_${storageKey}`, searchTerm);
  }, [searchTerm, storageKey]);

  const shownFiles = items.filter(
    (file) =>
      (searchTerm.trim() === "" ||
        file.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!showFavouritesOnly || favourites.includes(file.id))
  );

  return (
    <AnalyticsLayout>
      <div
        className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir"
        style={{
          fontFamily:
            "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* Top Bar */}
        <div
          className="shrink-0 z-20 shadow-sm px-8 h-24 flex items-center justify-between"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h1 className="text-2xl font-bold" style={{ color: TRUST_GREEN }}>
            {schoolName}
          </h1>

          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative flex-shrink-0 w-[240px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search files"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`w-full border ${
                  searchFocused ? "" : "border-gray-300"
                } rounded-md px-4 py-2 pr-10 text-sm outline-none transition`}
                style={{
                  borderColor: searchFocused ? TRUST_GREEN : undefined,
                  boxShadow: searchFocused
                    ? `0 0 0 2px ${TRUST_GREEN}40` : undefined,
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-9 top-2.5 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  <X size={16} />
                </button>
              )}
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            {/* Favourites toggle */}
            <button
              onClick={() => setShowFavouritesOnly((prev) => !prev)}
              className={`px-3 py-1 rounded-md text-sm font-medium border transition ${
                showFavouritesOnly
                  ? "bg-yellow-100 border-yellow-400 text-yellow-700"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Star
                className={`w-4 h-4 inline mr-1 ${
                  showFavouritesOnly ? "text-yellow-500 fill-yellow-400" : ""
                }`}
              />
              Favourites only
            </button>

            {/* Layout toggle */}
            <div className="flex space-x-1 ml-2">
              <button
                onClick={() => setMode("compact")}
                className={`p-2 rounded-md ${
                  mode === "compact"
                    ? "bg-gray-200 text-gray-800"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setMode("cosy")}
                className={`p-2 rounded-md ${
                  mode === "cosy"
                    ? "bg-gray-200 text-gray-800"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setMode("list")}
                className={`p-2 rounded-md ${
                  mode === "list"
                    ? "bg-gray-200 text-gray-800"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* File Grid/List */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {shownFiles.length === 0 ? (
            <div className="text-gray-500 italic text-center mt-20">
              No files found.
            </div>
          ) : mode === "list" ? (
            <div className="space-y-2">
              {shownFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between bg-white rounded-lg shadow p-3 hover:shadow-md transition cursor-pointer"
                  onClick={() => {
                    if (file.href?.startsWith("ms-excel:")) {
                      window.location.href = file.href;
                    } else {
                      window.open(file.href, "_blank");
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    {file.logoUrl && (
                      <img
                        src={file.logoUrl}
                        alt={`${file.name} logo`}
                        className="w-6 h-6 object-contain"
                      />
                    )}
                    <span className="text-sm font-medium text-gray-900">
                      {file.name}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavourite(file.id);
                      setClickedStar(file.id);
                      setTimeout(() => setClickedStar(null), 400);
                    }}
                    className="p-1 rounded-full group transition"
                    aria-label={
                      favourites.includes(file.id) ? "Unfavourite" : "Favourite"
                    }
                  >
                    <Star
                      className={`w-5 h-5 transition-transform duration-300 ${
                        favourites.includes(file.id)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } ${
                        clickedStar === file.id
                          ? "scale-125 animate-ping-once"
                          : ""
                      }`}
                      strokeWidth={1.5}
                      fill={favourites.includes(file.id) ? "#fde047" : "none"}
                      style={{
                        fill: !favourites.includes(file.id) ? "none" : "#fde047",
                        transition: "fill 0.2s",
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 ${
                mode === "compact" ? "gap-4" : "gap-8"
              }`}
            >
              {shownFiles.map((file, idx) => (
                <ToolkitReportCard
                  key={`${storageKey}:${file.id}:${idx}`}
                  report={file}
                  isFavourite={favourites.includes(file.id)}
                  onFavourite={() => {
                    toggleFavourite(file.id);
                    setClickedStar(file.id);
                    setTimeout(() => setClickedStar(null), 400);
                  }}
                  clickedStar={clickedStar}
                  onClick={() => {
                    if (file.href?.startsWith("ms-excel:")) {
                      window.location.href = file.href;
                    } else {
                      window.open(file.href, "_blank");
                    }
                  }}
                  disabled={!!file.comingSoon}
                  showMoreMenu={true}
                />
              ))}
            </div>
          )}
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
    </AnalyticsLayout>
  );
}
