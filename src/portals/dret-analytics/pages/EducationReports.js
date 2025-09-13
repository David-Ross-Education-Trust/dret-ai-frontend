import React, { useState, useMemo, useEffect } from "react";
import { Search, X, Rows, Grid, LayoutGrid, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnalyticsLayout from "../components/layout";
import { visibleReports } from "../components/reportConfig";
import ReportCard from "../components/reportCard";

// Persist favourites in localStorage
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
    } catch { /* no-op */ }
  }, [favourites, key]);

  const toggleFavourite = (id) =>
    setFavourites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return [favourites, toggleFavourite];
}

// Smart open: external links in new tab, relative paths via router
function openExternalOrRoute(href, navigate) {
  if (!href) return;
  if (/^https?:\/\//i.test(href)) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  navigate(href);
}

// Storage keys for this page (separate from toolkits)
const VIEW_STORAGE_KEYS = {
  mode: "educationViewMode",           // "compact" | "cosy" | "list"
  favesOnly: "educationViewFavesOnly", // "true" | "false"
};

export default function EducationReports() {
  const navigate = useNavigate();
  const [favourites, toggleFavourite] = useFavourites();
  const [clickedStar, setClickedStar] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // View settings (persisted)
  const [mode, setMode] = useState(() => {
    try {
      const stored = localStorage.getItem(VIEW_STORAGE_KEYS.mode);
      return stored === "compact" || stored === "cosy" || stored === "list" ? stored : "cosy";
    } catch {
      return "cosy";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(VIEW_STORAGE_KEYS.mode, mode);
    } catch { /* no-op */ }
  }, [mode]);

  const [showOnlyFaves, setShowOnlyFaves] = useState(() => {
    try {
      const stored = localStorage.getItem(VIEW_STORAGE_KEYS.favesOnly);
      return stored === "true";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(VIEW_STORAGE_KEYS.favesOnly, String(showOnlyFaves));
    } catch { /* no-op */ }
  }, [showOnlyFaves]);

  // Presets sized for dashboard cards (slightly larger than toolkit tiles)
  const PRESETS = {
    compact: { size: 240, gap: 16 },
    cosy:    { size: 300, gap: 24 },
    list:    { size: 0,   gap: 0  },
  };
  const { size, gap } = PRESETS[mode];

  const TRUST_GREEN = "#205c40";

  // Filter visible reports (category + search + favourites)
  const filtered = useMemo(() => {
    const t = searchTerm.trim().toLowerCase();

    return visibleReports.filter((r) => {
      const cat = Array.isArray(r.category) ? r.category[0] : r.category;
      const inEducation =
        cat && ["dret", "bromcom"].includes(String(cat).toLowerCase());

      if (!inEducation) return false;
      if (r.status === "coming-soon") return false;
      if (showOnlyFaves && !favourites.includes(r.id)) return false;

      if (!t) return true;

      return (
        (r.name && r.name.toLowerCase().includes(t)) ||
        (r.description && r.description.toLowerCase().includes(t))
      );
    });
  }, [searchTerm, showOnlyFaves, favourites]);

  const handleFavourite = (id) => {
    toggleFavourite(id);
    setClickedStar(id);
    setTimeout(() => setClickedStar(null), 300);
  };

  return (
    <AnalyticsLayout>
      <div
        className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir"
        style={{ fontFamily: "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif" }}
      >
        {/* Top Bar */}
        <div
          className="shrink-0 z-20 shadow-sm px-6 md:px-8 h-24 flex items-center justify-between"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h1 className="text-2xl font-bold" style={{ color: TRUST_GREEN }}>
            Education Dashboards
          </h1>

          <div className="flex items-center gap-3">
            {/* View toggle */}
            <div className="hidden sm:flex items-center rounded-xl border border-gray-200 overflow-hidden">
              <button
                className={`px-3 py-2 text-sm flex items-center gap-1 ${mode === "compact" ? "bg-gray-100" : ""}`}
                onClick={() => setMode("compact")}
                title="Compact grid"
                type="button"
              >
                <Grid size={16} />
                Compact
              </button>
              <button
                className={`px-3 py-2 text-sm flex items-center gap-1 border-l border-gray-200 ${mode === "cosy" ? "bg-gray-100" : ""}`}
                onClick={() => setMode("cosy")}
                title="Cosy grid"
                type="button"
              >
                <LayoutGrid size={16} />
                Cosy
              </button>
              <button
                className={`px-3 py-2 text-sm flex items-center gap-1 border-l border-gray-200 ${mode === "list" ? "bg-gray-100" : ""}`}
                onClick={() => setMode("list")}
                title="List view"
                type="button"
              >
                <Rows size={16} />
                List
              </button>
            </div>

            {/* Favourites-only toggle button */}
            <button
              onClick={() => setShowOnlyFaves((v) => !v)}
              className={`p-2 rounded-full border transition ${
                showOnlyFaves ? "bg-yellow-100 border-yellow-400" : "border-gray-200 hover:bg-gray-100"
              }`}
              title="Toggle favourites only"
              type="button"
            >
              <Star
                size={18}
                className={`${showOnlyFaves ? "text-yellow-500" : "text-gray-400"}`}
                fill={showOnlyFaves ? "#fde047" : "none"}
                strokeWidth={1.5}
              />
            </button>

            {/* Search */}
            <div className="relative flex-shrink-0 w-[220px] md:w-[260px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search dashboards"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`w-full border ${searchFocused ? "" : "border-gray-300"} rounded-md px-4 py-2 pr-10 text-sm outline-none transition`}
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
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {filtered.length === 0 ? (
            <div className="text-gray-500 italic text-center">
              No dashboards{searchTerm ? " match this search." : "."}
            </div>
          ) : mode === "list" ? (
            // LIST VIEW — row clickable, star at end
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {filtered.map((report) => (
                  <li
                    key={report.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => openExternalOrRoute(report.href, navigate)}
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm text-gray-900">{report.name}</div>
                      {report.description && (
                        <div className="truncate text-xs text-gray-500">{report.description}</div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavourite(report.id);
                      }}
                      className="p-2 rounded-full group transition"
                      aria-label={favourites.includes(report.id) ? "Unfavourite" : "Favourite"}
                      type="button"
                    >
                      <Star
                        className={`w-5 h-5 transition-transform duration-300 ${
                          favourites.includes(report.id) ? "text-yellow-400" : "text-gray-300"
                        } ${clickedStar === report.id ? "scale-125 animate-ping-once" : ""}`}
                        strokeWidth={1.5}
                        fill={favourites.includes(report.id) ? "#fde047" : "none"}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            // GRID VIEW — auto-fill + minmax; pass through props to ReportCard
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))`,
                gap: `${gap}px`,
              }}
            >
              {filtered.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  isFavourite={favourites.includes(report.id)}
                  onFavourite={handleFavourite}
                  onClick={() => openExternalOrRoute(report.href, navigate)}
                  clickedStar={clickedStar}
                  disabled={report.status === "coming-soon"}
                  // These two are optional: if your ReportCard supports them they'll be used; otherwise harmless.
                  layoutSizePx={size}
                  subtle
                />
              ))}
            </div>
          )}
        </div>

        <style>{`
          .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 3px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
        `}</style>
      </div>
    </AnalyticsLayout>
  );
}
