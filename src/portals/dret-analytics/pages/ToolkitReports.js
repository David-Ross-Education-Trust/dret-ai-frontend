import React, { useState, useMemo, useEffect, useRef } from "react";
import { Search, X, Rows, Grid, LayoutGrid, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnalyticsLayout from "../components/layout";
import { toolkitConfig } from "../toolkits/toolkitConfig";
import ToolkitReportCard from "../components/toolkitCard";

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
    } catch {}
  }, [favourites, key]);
  const toggleFavourite = (id) =>
    setFavourites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  return [favourites, toggleFavourite];
}

const CUSTOM_SCHEME_RE = /^(ms-(excel|word|powerpoint|project|access|onenote|visio|office):|mailto:|tel:)/i;

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

const VIEW_STORAGE_KEYS = {
  mode: "toolkitViewMode",
  favesOnly: "toolkitViewFavesOnly",
  phase: "toolkitPhaseFilter",
};

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
  const [searchOpen, setSearchOpen] = useState(false);
  const floatingInlineRef = useRef(null);
  const searchDesktopRef = useRef(null);

  const [favourites, toggleFavourite] = useFavourites();
  const [clickedStar, setClickedStar] = useState(null);

  const [mode, setMode] = useState(() => {
    try {
      const stored = localStorage.getItem(VIEW_STORAGE_KEYS.mode);
      return stored === "compact" || stored === "cosy" || stored === "list" ? stored : "cosy";
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

  const [phase, setPhase] = useState(() => {
    try {
      const stored = localStorage.getItem(VIEW_STORAGE_KEYS.phase);
      return stored === "Primary" || stored === "Secondary" ? stored : "All";
    } catch {
      return "All";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(VIEW_STORAGE_KEYS.mode, mode);
    } catch {}
  }, [mode]);

  useEffect(() => {
    try {
      localStorage.setItem(VIEW_STORAGE_KEYS.favesOnly, String(showOnlyFaves));
    } catch {}
  }, [showOnlyFaves]);

  useEffect(() => {
    try {
      localStorage.setItem(VIEW_STORAGE_KEYS.phase, phase || "All");
    } catch {}
  }, [phase]);

  useEffect(() => {
    if (searchOpen && floatingInlineRef.current) {
      const el = floatingInlineRef.current;
      el.focus();
      el.selectionStart = el.selectionEnd = el.value.length;
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => {
      const k = e.key?.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === "k") {
        e.preventDefault();
        if (window.innerWidth < 1024) setSearchOpen(true);
        const target = window.innerWidth >= 1024 ? searchDesktopRef.current : floatingInlineRef.current;
        if (target) {
          target.focus();
          target.selectionStart = target.selectionEnd = target.value.length;
        }
      }
      if (k === "escape") {
        if (searchOpen) setSearchOpen(false);
        if (searchTerm) setSearchTerm("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, searchTerm]);

  const PRESETS = { compact: { size: 140, gap: 16 }, cosy: { size: 180, gap: 24 }, list: { size: 0, gap: 0 } };
  const { size, gap } = PRESETS[mode];

  const TRUST_GREEN = "#205c40";

  const filtered = useMemo(() => {
    const t = searchTerm.trim().toLowerCase();
    return toolkitConfig.filter((r) => {
      if (r.comingSoon) return false;
      if (phase !== "All" && getPhase(r) !== phase) return false;
      if (showOnlyFaves && !favourites.includes(r.id)) return false;
      if (!t) return true;
      return (r.name && r.name.toLowerCase().includes(t)) || (r.description && r.description.toLowerCase().includes(t));
    });
  }, [searchTerm, showOnlyFaves, favourites, phase]);

  const sorted = useMemo(() => {
    const arr = [...filtered].sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
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

  const segmentBtn = (label, withLeftBorder = false) => (
    <button
      key={label}
      className={["px-3 py-2 text-sm transition", withLeftBorder ? "border-l border-gray-200" : "", phase === label ? "text-white" : "bg-white hover:bg-gray-50 text-gray-700"].join(" ")}
      style={phase === label ? { backgroundColor: TRUST_GREEN } : undefined}
      onClick={() => setPhase(phase === label ? "All" : label)}
      title={`${label} toolkits`}
      type="button"
      aria-pressed={phase === label}
    >
      {label}
    </button>
  );

  return (
    <AnalyticsLayout>
      <div className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir">
        <div className="shrink-0 z-20 shadow-sm px-6 md:px-8 h-24 flex items-center justify-between" style={{ backgroundColor: "#ffffff" }}>
          <h1 className="text-2xl font-black" style={{ color: TRUST_GREEN }}>Education Toolkits</h1>
          <div className="flex items-center gap-3">
            {searchOpen ? (
              <div className="flex items-center lg:hidden">
                <div className="relative w-[240px]">
                  <input
                    ref={floatingInlineRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search toolkits"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm outline-none font-avenir"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setSearchTerm("");
                        setSearchOpen(false);
                      }
                    }}
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className="absolute right-9 top-2.5 text-gray-400 hover:text-gray-600" aria-label="Clear search" type="button">
                      <X size={16} />
                    </button>
                  )}
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <button onClick={() => setSearchOpen(false)} className="ml-2 p-2 rounded-md border border-gray-200 hover:bg-gray-50" aria-label="Close search" type="button">✕</button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowOnlyFaves((v) => !v)}
                  className={`hidden sm:inline-flex p-2 rounded-full border transition ${showOnlyFaves ? "bg-yellow-100 border-yellow-400" : "border-gray-200 hover:bg-gray-100"}`}
                  title="Toggle favourites only"
                  type="button"
                  aria-label="Toggle favourites only"
                  aria-pressed={showOnlyFaves}
                >
                  <Star size={18} className={`${showOnlyFaves ? "text-yellow-500" : "text-gray-400"}`} fill={showOnlyFaves ? "#fde047" : "none"} strokeWidth={1.5} />
                </button>

                <div className="hidden sm:flex items-center rounded-xl border border-gray-200 overflow-hidden">
                  <button className={`px-3 py-2 text-sm flex items-center gap-1 ${mode === "compact" ? "bg-gray-100" : "bg-white hover:bg-gray-50"}`} onClick={() => setMode("compact")} title="Compact grid" aria-label="Compact grid" type="button">
                    <Grid size={16} />
                    <span className="hidden lg:inline">Compact</span>
                  </button>
                  <button className={`px-3 py-2 text-sm flex items-center gap-1 border-l border-gray-200 ${mode === "cosy" ? "bg-gray-100" : "bg-white hover:bg-gray-50"}`} onClick={() => setMode("cosy")} title="Cosy grid" aria-label="Cosy grid" type="button">
                    <LayoutGrid size={16} />
                    <span className="hidden lg:inline">Cosy</span>
                  </button>
                  <button className={`px-3 py-2 text-sm flex items-center gap-1 border-l border-gray-200 ${mode === "list" ? "bg-gray-100" : "bg-white hover:bg-gray-50"}`} onClick={() => setMode("list")} title="List view" aria-label="List view" type="button">
                    <Rows size={16} />
                    <span className="hidden lg:inline">List</span>
                  </button>
                </div>

                <div className="relative flex-shrink-0 hidden lg:block w-[260px]">
                  <input
                    ref={searchDesktopRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search toolkits"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setSearchTerm("");
                    }}
                    className={`w-full border ${searchFocused ? "" : "border-gray-300"} rounded-md px-4 py-2 pr-10 text-sm outline-none transition font-avenir`}
                    style={{ borderColor: searchFocused ? TRUST_GREEN : undefined, boxShadow: searchFocused ? `0 0 0 2px ${TRUST_GREEN}40` : undefined }}
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className="absolute right-9 top-2.5 text-gray-400 hover:text-gray-600" tabIndex={-1} aria-label="Clear" type="button">
                      <X size={16} />
                    </button>
                  )}
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>

                <button className="hidden sm:inline-flex lg:hidden p-2 rounded-md border border-gray-200 hover:bg-gray-50" aria-label="Open search" title="Search (Ctrl/Cmd+K)" type="button" onClick={() => setSearchOpen(true)}>
                  <Search size={18} className="text-gray-600" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="mb-4 md:mb-6">
            <div className="flex items-center h-10 rounded-xl border border-gray-200 overflow-hidden w-fit">
              {segmentBtn("Primary")}
              {segmentBtn("All", true)}
              {segmentBtn("Secondary", true)}
            </div>
          </div>

          {sorted.length === 0 ? (
            <div className="text-gray-500 italic text-center">No toolkits{searchTerm ? " match this search." : "."}</div>
          ) : mode === "list" ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {sorted.map((report) => (
                  <li
                    key={report.id}
                    role="button"
                    tabIndex={0}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => openExternalOrRoute(report.href, navigate)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openExternalOrRoute(report.href, navigate);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {report.logoUrl && <img src={report.logoUrl} alt="" className="w-8 h-8 object-contain flex-shrink-0" />}
                      <div className="min-w-0">
                        <div className="truncate text-sm text-gray-900">{report.name}</div>
                        {report.sourceToolkit && <div className="truncate text-xs text-gray-500">{report.sourceToolkit}</div>}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavourite(report.id);
                      }}
                      className="p-2 rounded-full group transition z-20"
                      aria-label={favourites.includes(report.id) ? "Unfavourite" : "Favourite"}
                      aria-pressed={favourites.includes(report.id)}
                      type="button"
                    >
                      <Star
                        className={`w-5 h-5 transition-transform duration-300 ${favourites.includes(report.id) ? "text-yellow-400" : "text-gray-300"} ${clickedStar === report.id ? "scale-125 animate-ping-once" : ""}`}
                        strokeWidth={1.5}
                        fill={favourites.includes(report.id) ? "#fde047" : "none"}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div
              className="grid"
              style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))`, gap: `${gap}px` }}
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
                  showMoreMenu={Boolean(report.openInBrowserHref || report.openInBrowserUrl)}
                  layoutSizePx={size}
                  subtle={true}
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
