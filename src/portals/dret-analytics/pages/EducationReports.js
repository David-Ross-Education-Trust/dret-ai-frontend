import React, { useState, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AnalyticsLayout from "../components/layout";
import { visibleReports } from "../components/reportConfig";
import ReportCard from "../components/reportCard";

// --- Local favourites hook (persist to localStorage)
function useFavourites(key = "analyticsFavourites") {
  const [favourites, setFavourites] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(favourites));
    } catch {
      /* no-op */
    }
  }, [favourites, key]);

  const toggleFavourite = (id) =>
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return [favourites, toggleFavourite];
}

export default function EducationReports() {
  const TRUST_GREEN = "#205c40";

  const [favourites, toggleFavourite] = useFavourites();
  const [clickedStar, setClickedStar] = useState(null); // used for ping animation
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  // Filter: only visible + DRET/Bromcom + search match
  const educationReports = useMemo(() => {
    const t = searchTerm.trim().toLowerCase();

    return visibleReports.filter((r) => {
      // category must be DRET or Bromcom (supports array or string)
      const cat = r.category;
      const isAllowed =
        Array.isArray(cat)
          ? cat.some((c) => ["dret", "bromcom"].includes(String(c).toLowerCase()))
          : ["dret", "bromcom"].includes(String(cat || "").toLowerCase());

      if (!isAllowed) return false;

      if (!t) return true;
      const inName = r.name?.toLowerCase().includes(t);
      const inDesc = r.description?.toLowerCase().includes(t);
      return inName || inDesc;
    });
  }, [searchTerm]);

  const handleFavourite = (id) => {
    toggleFavourite(id);
    setClickedStar(id);
    // brief ping animation window
    setTimeout(() => setClickedStar(null), 350);
  };

  return (
    <AnalyticsLayout>
      <div
        className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir"
        style={{
          fontFamily: "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* Top Bar */}
        <div
          className="shrink-0 z-20 shadow-sm px-8 h-24 flex items-center justify-between"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h1 className="text-2xl font-bold" style={{ color: TRUST_GREEN }}>
            Education Dashboards
          </h1>

          {/* Search */}
          <div className="relative flex-shrink-0 w-[240px] ml-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search education reports"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-full border ${
                searchFocused ? "" : "border-gray-300"
              } rounded-md px-4 py-2 pr-10 text-sm outline-none transition`}
              style={{
                borderColor: searchFocused ? TRUST_GREEN : undefined,
                boxShadow: searchFocused ? `0 0 0 2px ${TRUST_GREEN}40` : undefined,
                fontFamily: "AvenirLTStdLight, Avenir, sans-serif",
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-9 top-2.5 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
                aria-label="Clear"
                type="button"
              >
                <X size={16} />
              </button>
            )}
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Cards */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-8 pb-16 custom-scrollbar">
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
          >
            {educationReports.length === 0 ? (
              <div className="text-gray-500 italic text-center w-full col-span-full">
                No education reports available{searchTerm ? " for this search." : " yet."}
              </div>
            ) : (
              educationReports.map((report) => (
                <ReportCard
                  key={report.id || report.name}
                  report={report}
                  isFavourite={favourites.includes(report.id)}
                  onFavourite={handleFavourite}
                  onClick={() => navigate(report.href)}
                  clickedStar={clickedStar}
                  // disable if marked coming soon in either shape
                  disabled={report.status === "coming-soon" || !!report.comingSoon}
                  // keep the slimmer chrome to match the rest
                  subtle
                />
              ))
            )}
          </div>
        </div>

        <style>
          {`
            .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 3px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
          `}
        </style>
      </div>
    </AnalyticsLayout>
  );
}
