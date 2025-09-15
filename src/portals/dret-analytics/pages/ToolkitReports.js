import React, { useState, useMemo, useEffect } from "react";
import { Search, X, Rows, Grid, LayoutGrid, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnalyticsLayout from "../components/layout";
import { toolkitConfig } from "../components/ToolkitConfig";
import ToolkitReportCard from "../components/ToolkitReportCard";

// Persist favourites in localStorage
function useFavourites(key = "toolkitFavourites") {
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

// Storage keys for view preferences
const VIEW_STORAGE_KEYS = {
  mode: "toolkitViewMode", // "compact" | "cosy" | "list"
  favesOnly: "toolkitViewFavesOnly", // "true" | "false"
  phase: "toolkitPhaseFilter", // "All" | "Primary" | "Secondary"
};

// Known secondary toolkit IDs (others are assumed Primary)
const SECONDARY_IDS = new Set([
  "charlesread",
  "charnwood",
  "havelock",
  "humberston",
  "kevi",
  "lodgepark",
  "malcolmarnold",
  "sgs",
  "thomasmiddlecott",
  "bobbymoore",
  "barneswallis",
]);

const getPhase = (item) => (SECONDARY_IDS.has(item.id) ? "Secondary" : "Primary");

export default function ToolkitReports() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [favourites, toggleFavourite] = useFavourites();
  const [clickedStar, setClickedStar] = useState(null);

  // ---- Load persisted view settings (with fallbacks)
  const [mode, setMode] = useState(() => {
    try {
      const stored = localStorage.getItem(VIEW_STORAGE_KEYS.mode);
      return stored === "compact" || stored === "cosy" || stored === "list"
        ? stored
        : "cosy";
    } catch {
      return "cosy";
    }
  });

  const [showOnlyFaves, setShowOnlyFaves] = useState(() => {
    try {
      const stored = localStorage.getItem(VIEW_STORAGE_KEYS.favesOnly);
      return stored === "true";
    } catch {
      return false;
    }
  });

  // NEW: Persisted Phase filter ("All" default)
  const [phase, setPhase] = useState(() => {
    try {
      const stored = localStorage.getItem(VIEW_STORAGE_KEYS.phase);
      return stored === "Primary" || stored === "Secondary" ? stored : "All";
    } catch {
      return "All";
    }
  });

  // ---- Persist view settings when they change
  useEffect(() => {
    try {
      localStorage.setItem(VIEW_STORAGE_KEYS.mode, mode);
    } catch {
      /* no-op */
    }
  }, [mode]);

  useEffect(() => {
    try {
      localStorage.setItem(VIEW_STORAGE_KEYS.favesOnly, String(showOnlyFaves));
    } catch {
      /* no-op */
    }
  }, [showOnlyFaves]);

  useEffect(() => {
    try {
      localStorage.setItem(VIEW_STORAGE_KEYS.phase, phase || "All");
    } catch {
      /* no-op */
    }
  }, [phase]);

  // Presets with generous gaps; cosy is larger
  const PRESETS = {
    compact: { size: 140, gap: 16 },
    cosy: { size: 180, gap: 24 },
    list: { size: 0, gap: 0 },
  };
  const { size, gap } = PRESETS[mode];

  const TRUST_GREEN = "#205c40";

  // Filter visible toolkits
  const filtered = useMemo(() => {
    const t = searchTerm.trim().toLowerCase();
    return toolkitConfig.filter((r) => {
      if (r.comingSoon) return false;

      // Apply Primary/Secondary filter if chosen
      if (phase !== "All" && getPhase(r) !== phase) return false;

      if (showOnlyFaves && !favourites.includes(r.id)) return false;

      if (!t) return true;
      return (
        (r.name && r.name.toLowerCase().includes(t)) ||
        (r.description && r.description.toLowerCase().includes(t))
      );
    });
  }, [searchTerm, showOnlyFaves, favourites, phase]);

  // Sort alphabetically; keep Demo Toolkit first if present
  const sorted = useMemo(() => {
    const arr = [...filtered].sort((a, b) =>
      a.name.localeCompare(b.name, "en", { sensitivity: "base" })
    );
    const demoIdx = arr.findIndex((x) => x.id === "demotoolkit");
    if (demoIdx > 0) {
      const [demo] = arr.splice(demoIdx, 1);
      arr.unshift(demo);
    }
    return arr;
  }, [filtered]);

  const handleFavourite = (id) => {
    toggleFavourite(id);
    setClickedStar(id);
    setTimeout(() => setClickedStar(null), 300);
  };

  const segmentBtn = (label) => (
    <button
      key={label}
      className={[
        "px-2.5 py-1.5 text-[13px] transition", // slightly smaller control
        phase === label ? "text-white" : "bg-white hover:bg-gray-50 text-gray-700",
      ].join(" ")}
      style={phase === label ? { backgroundColor: TRUST_GREEN } : undefined}
      onClick={() => setPhase(phase === label ? "All" : label)}
      title={`${label} toolkits`}
      type="button"
    >
      {label}
    </button>
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
          className="shrink-0 z-20 shadow-sm px-6 md:px-8 h-24 flex items-center justify-between"
          style={{ backgroundColor: "#ffffff" }}
        >
          {/* Title + Phase segmented filter */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold" style={{ color: TRUST_GREEN }}>
              Education Toolkits
            </h1>

            {/* Phase segmented control: Primary | All | Secondary */}
            <div className="hidden sm:flex items-center rounded-xl border border-gray-200 overflow-hidden">
              {segmentBtn("Primary")}
              <div className="h-6 w-px bg-gray-200" />
              {segmentBtn("All")}
              <div className="h-6 w-px bg-gray-200" />
              {segmentBtn("Secondary")}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Favourites filter toggle button */}
            <button
              onClick={() => setShowOnlyFaves((v) => !v)}
              className={`p-2 rounded-full border transition ${
                showOnlyFaves
                  ? "bg-yellow-100 border-yellow-400"
                  : "border-gray-200 hover:bg-gray-100"
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

            {/* View toggle */}
            <div className="hidden sm:flex items-center rounded-xl border border-gray-200 overflow-hidden">
              <button
                className={`px-3 py-2 text-sm flex items-center gap-1 ${
                  mode === "compact" ? "bg-gray-100" : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => setMode("compact")}
                title="Compact grid"
                type="button"
              >
                <Grid size={16} />
                Compact
              </button>
              <div className="h-6 w-px bg-gray-200" />
              <button
                className={`px-3 py-2 text-sm flex items-center gap-1 ${
                  mode === "cosy" ? "bg-gray-100" : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => setMode("cosy")}
                title="Cosy grid"
                type="button"
              >
                <LayoutGrid size={16} />
                Cosy
              </button>
              <div className="h-6 w-px bg-gray-200" />
              <button
                className={`px-3 py-2 text-sm flex items-center gap-1 ${
                  mode === "list" ? "bg-gray-100" : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => setMode("list")}
                title="List view"
                type="button"
              >
                <Rows size={16} />
                List
              </button>
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
                className={`w-full border ${
                  searchFocused ? "" : "border-gray-300"
                } rounded-md px-4 py-2 pr-10 text-sm outline-none transition`}
                style={{
                  borderColor: searchFocused ? TRUST_GREEN : undefined,
                  boxShadow: searchFocused
                    ? `0 0 0 2px ${TRUST_GREEN}40`
                    : undefined,
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
          {sorted.length === 0 ? (
            <div className="text-gray-500 italic text-center">
              No toolkits{searchTerm ? " match this search." : "."}
            </div>
          ) : mode === "list" ? (
            // LIST VIEW — row clickable, star icon at end
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {sorted.map((report) => (
                  <li
                    key={report.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => openExternalOrRoute(report.href, navigate)}
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
                        <div className="truncate text-sm text-gray-900">
                          {report.name}
                        </div>
                        {report.sourceToolkit && (
                          <div className="truncate text-xs text-gray-500">
                            {report.sourceToolkit}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // stop row navigation
                        handleFavourite(report.id);
                      }}
                      className="p-2 rounded-full group transition z-20"
                      aria-label={
                        favourites.includes(report.id)
                          ? "Unfavourite"
                          : "Favourite"
                      }
                      type="button"
                    >
                      <Star
                        className={`w-5 h-5 transition-transform duration-300 ${
                          favourites.includes(report.id)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } ${
                          clickedStar === report.id ? "scale-125 animate-ping-once" : ""
                        }`}
                        strokeWidth={1.5}
                        fill={favourites.includes(report.id) ? "#fde047" : "none"}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            // GRID VIEW
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))`,
                gap: `${gap}px`,
              }}
            >
              {sorted.map((report) => (
                <ToolkitReportCard
                  key={report.id}
                  report={report}
                  isFavourite={favourites.includes(report.id)}
                  onFavourite={handleFavourite}
                  clickedStar={clickedStar}
                  onClick={() => openExternalOrRoute(report.href, navigate)}
                  disabled={!!report.comingSoon}
                  showMoreMenu={Boolean(
                    report.openInBrowserHref || report.openInBrowserUrl
                  )}
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
            .custom-scrollbar-track { background: transparent; }
            .custom-scrollbar-thumb { background-color: #cbd5e1; border-radius: 3px; }
            .custom-scrollbar-thumb:hover { background-color: #94a3b8; }
          `}
        </style>
      </div>
    </AnalyticsLayout>
  );
}
