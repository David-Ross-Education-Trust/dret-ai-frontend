import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnalyticsLayout from "../components/layout";
import { toolkitConfig } from "../components/ToolkitConfig";
import ToolkitReportCard from "../components/ToolkitReportCard";

// Custom hook for persisting favourites in localStorage
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

// Helper: open links smartly (deep links same-tab; https in new tab; in-app via router)
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

  // NEW: slider controls overall visual scale of cards (0.8x–1.3x)
  const [scalePct, setScalePct] = useState(100); // 80–130
  const visualScale = Math.max(50, Math.min(200, scalePct)) / 100;

  const [showOnlyFaves, setShowOnlyFaves] = useState(false);

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

          <div className="flex items-center gap-4">
            {/* Favourites filter */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showOnlyFaves}
                onChange={(e) => setShowOnlyFaves(e.target.checked)}
              />
              Favourites only
            </label>

            {/* Size slider */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Size</span>
              <input
                type="range"
                min={80}
                max={130}
                value={scalePct}
                onChange={(e) => setScalePct(parseInt(e.target.value, 10))}
                className="w-36 accent-[##205c40]"
                aria-label="Card size"
              />
              <span className="text-xs w-10 text-right text-gray-600">{scalePct}%</span>
            </div>

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
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
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
                  size="medium"
                  subtle={true}
                  visualScale={visualScale}   // ← slider-driven scale
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
