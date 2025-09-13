import React, { useState, useMemo } from "react";
import { Search, X, LayoutGrid, Rows, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnalyticsLayout from "../components/layout";
import { toolkitConfig } from "../components/ToolkitConfig";
import ToolkitReportCard from "../components/ToolkitReportCard";

// Persist favourites in localStorage
function useFavourites(key = "toolkitFavourites") {
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  });
  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(favourites));
  }, [favourites, key]);

  const toggleFavourite = (id) =>
    setFavourites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return [favourites, toggleFavourite];
}

// Smart open: deep links same-tab; https new tab; internal via router
const CUSTOM_SCHEME_RE =
  /^(ms-(excel|word|powerpoint|project|access|onenote|visio|office):|mailto:|tel:)/i;

function openExternalOrRoute(href, navigate) {
  if (!href) return;
  if (CUSTOM_SCHEME_RE.test(href)) {
    window.location.assign(href);
    return;
  }
  if (/^https?:\/\//i.test(href)) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  navigate(href);
}

export default function ToolkitReports() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [favourites, toggleFavourite] = useFavourites();
  const [clickedStar, setClickedStar] = useState(null);

  // View mode: compact | cozy | list
  const [mode, setMode] = useState("cozy");
  const [showOnlyFaves, setShowOnlyFaves] = useState(false);

  // Updated gaps: more breathing room
  const PRESETS = {
    compact: { size: 130, gap: 14 }, // was 8
    cozy: { size: 160, gap: 20 },    // was 12
    list: { size: 0, gap: 0 },
  };
  const { size, gap } = PRESETS[mode];

  const TRUST_GREEN = "#205c40";

  const filtered = useMemo(() => {
    const t = searchTerm.trim().toLowerCase();
    return toolkitConfig.filter((r) => {
      if (r.comingSoon) return false;
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
            Education Toolkits
          </h1>

          <div className="flex items-center gap-3">
            {/* View toggle */}
            <div className="hidden sm:flex items-center rounded-xl border border-gray-200 overflow-hidden">
              <button
                className={`px-3 py-2 text-sm flex items-center gap-1 ${mode === "compact" ? "bg-gray-100" : ""}`}
                onClick={() => setMode("compact")}
                title="Compact grid"
              >
                <Sparkles size={16} />
                Compact
              </button>
              <button
                className={`px-3 py-2 text-sm flex items-center gap-1 border-l border-gray-200 ${mode === "cozy" ? "bg-gray-100" : ""}`}
                onClick={() => setMode("cozy")}
                title="Cozy grid"
              >
                <LayoutGrid size={16} />
                Cozy
              </button>
              <button
                className={`px-3 py-2 text-sm flex items-center gap-1 border-l border-gray-200 ${mode === "list" ? "bg-gray-100" : ""}`}
                onClick={() => setMode("list")}
                title="List view"
              >
                <Rows size={16} />
                List
              </button>
            </div>

            {/* Favourites filter */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showOnlyFaves}
                onChange={(e) => setShowOnlyFaves(e.target.checked)}
              />
              Favourites only
            </label>

            {/* Search */}
            <div className="relative flex-shrink-0 w-[220px] md:w-[260px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search toolkits"
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
              No toolkits{searchTerm ? " match this search." : "."}
            </div>
          ) : mode === "list" ? (
            // LIST VIEW — calmer rows
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {filtered.map((report) => (
                  <li
                    key={report.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {report.logoUrl && (
                        <img
                          src={report.logoUrl}
                          alt=""
                          className="w-8 h-8 object-contain flex-shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <div className="truncate text-sm text-gray-900">{report.name}</div>
                        {report.sourceToolkit && (
                          <div className="truncate text-xs text-gray-500">
                            {report.sourceToolkit}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 text-sm rounded border border-gray-200 hover:bg-gray-100"
                        onClick={() => openExternalOrRoute(report.href, navigate)}
                      >
                        Open
                      </button>
                      <button
                        className={`px-2 py-1 text-sm rounded border ${
                          favourites.includes(report.id)
                            ? "border-yellow-300 bg-yellow-50"
                            : "border-gray-200 hover:bg-gray-100"
                        }`}
                        onClick={() => handleFavourite(report.id)}
                      >
                        {favourites.includes(report.id) ? "★" : "☆"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            // GRID VIEW — compact or cozy
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))`,
                gap: `${gap}px`,
              }}
            >
              {filtered.map((report) => (
                <ToolkitReportCard
                  key={report.id}
                  report={report}
                  isFavourite={favourites.includes(report.id)}
                  onFavourite={handleFavourite}
                  clickedStar={clickedStar}
                  onClick={() => openExternalOrRoute(report.href, navigate)}
                  disabled={!!report.comingSoon}
                  showMoreMenu={Boolean(report.openInBrowserHref || report.openInBrowserUrl)}
                  layoutSizePx={size}
                  subtle={true}
                />
              ))}
            </div>
          )}
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
