import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Rows, Grid, LayoutGrid, Star } from "lucide-react";

import AnalyticsLayout from "../components/layout";
import ReportCard from "../components/reportCard";
import ToolkitReportCard from "../components/toolkitCard";
import { visibleReports } from "../components/reportConfig";
import { toolkitConfig } from "../toolkits/toolkitConfig";
import { demoToolkitConfig } from "../toolkits/demo/DemoToolkitConfig";
import { allToolkitConfigs } from "../toolkits/allToolkits";
import { useFavourites } from "../hooks/useFavourites";

const TRUST_GREEN = "#205c40";

function normaliseSchoolLabel(label) {
  if (!label) return "";
  return label.replace(/\bToolkit\b/i, "").replace(/\bAcademy\b/i, "").replace(/\bPrimary\b/i, "").replace(/[\W_]+/g, "").trim();
}

function storageKeyForItem(item) {
  const raw = item?.sourceToolkit || item?.source || item?.school || "";
  const school = normaliseSchoolLabel(raw);
  return school ? `toolkitFavourites_${school}` : "toolkitFavourites";
}

function readSetFromLS(key) {
  try {
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
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

const HOME_VIEW_KEY = "homeViewMode";

export default function HomePage() {
  const [analyticsFavourites, toggleAnalyticsFavourite] = useFavourites("analyticsFavourites");

  const [toolkitFavVersion, setToolkitFavVersion] = useState(0);
  const [toolkitFavSets, setToolkitFavSets] = useState({});

  useEffect(() => {
    const sets = {};
    sets["toolkitFavourites"] = readSetFromLS("toolkitFavourites");
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith("toolkitFavourites_")) {
        sets[key] = readSetFromLS(key);
      }
    }
    setToolkitFavSets(sets);
  }, [toolkitFavVersion]);

  const [clickedStar, setClickedStar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInlineRef = useRef(null);
  const searchDesktopRef = useRef(null);

  const navigate = useNavigate();

  const [mode, setMode] = useState(() => {
    try {
      const stored = localStorage.getItem(HOME_VIEW_KEY);
      return stored === "compact" || stored === "cosy" || stored === "list" ? stored : "cosy";
    } catch {
      return "cosy";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(HOME_VIEW_KEY, mode);
    } catch {}
  }, [mode]);

  const DASH_PRESETS = { compact: { size: 240, gap: 16 }, cosy: { size: 300, gap: 24 } };
  const TK_PRESETS = { compact: { size: 140, gap: 16 }, cosy: { size: 180, gap: 24 } };
  const { size: dashSize, gap: dashGap } = mode === "list" ? { size: 0, gap: 0 } : DASH_PRESETS[mode];
  const { size: tkSize, gap: tkGap } = mode === "list" ? { size: 0, gap: 0 } : TK_PRESETS[mode];

  const textMatches = (obj, term) => {
    if (!term) return true;
    const t = term.toLowerCase();
    return (obj?.name && obj.name.toLowerCase().includes(t)) || (obj?.description && obj.description.toLowerCase().includes(t));
  };

  const favouriteReports = useMemo(
    () =>
      visibleReports.filter(
        (r) => r?.id && analyticsFavourites.includes(r.id) && textMatches(r, searchTerm)
      ),
    [analyticsFavourites, searchTerm]
  );

  const isToolkitFavedForItem = useCallback(
    (item) => {
      const key = storageKeyForItem(item);
      return toolkitFavSets[key]?.has?.(item.id) || toolkitFavSets["toolkitFavourites"]?.has?.(item.id);
    },
    [toolkitFavSets]
  );

  const favouriteToolkits = useMemo(() => {
    const items = [...toolkitConfig, ...demoToolkitConfig, ...allToolkitConfigs];
    return items.filter((item) => isToolkitFavedForItem(item) && textMatches(item, searchTerm));
  }, [isToolkitFavedForItem, searchTerm]);

  const handleDashboardFavourite = (id) => {
    toggleAnalyticsFavourite(id);
    setClickedStar(id);
    setTimeout(() => setClickedStar(null), 400);
  };

  const toggleToolkitItemFavourite = (item) => {
    const targetKey = storageKeyForItem(item);
    const currentArr = JSON.parse(localStorage.getItem(targetKey) || "[]");
    const exists = currentArr.includes(item.id);
    const next = exists ? currentArr.filter((x) => x !== item.id) : [...currentArr, item.id];
    localStorage.setItem(targetKey, JSON.stringify(next));
    setToolkitFavVersion((v) => v + 1);
    setClickedStar(`${targetKey}:${item.id}`);
    setTimeout(() => setClickedStar(null), 400);
  };

  useEffect(() => {
    if (searchOpen && searchInlineRef.current) {
      const el = searchInlineRef.current;
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
        const target = window.innerWidth >= 1024 ? searchDesktopRef.current : searchInlineRef.current;
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

  return (
    <AnalyticsLayout>
      <div className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir">
        <div className="shrink-0 z-20 shadow-sm px-6 md:px-8 h-24 flex items-center justify-between" style={{ backgroundColor: "#ffffff" }}>
          <h1 className="text-2xl font-black" style={{ color: TRUST_GREEN }}>

          <div className="flex items-center gap-3">
            {searchOpen ? (
              <div className="flex items-center lg:hidden">
                <div className="relative w-[240px]">
                  <input
                    ref={searchInlineRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search favourites"
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
                <div className="hidden sm:flex items-center rounded-xl border border-gray-200 overflow-hidden">
                  <button className={`px-3 py-2 text-sm flex items-center gap-1 ${mode === "compact" ? "bg-gray-100" : ""}`} onClick={() => setMode("compact")} title="Compact grid" aria-label="Compact grid" type="button">
                    <Grid size={16} />
                    <span className="hidden lg:inline">Compact</span>
                  </button>
                  <button className={`px-3 py-2 text-sm flex items-center gap-1 border-l border-gray-200 ${mode === "cosy" ? "bg-gray-100" : ""}`} onClick={() => setMode("cosy")} title="Cosy grid" aria-label="Cosy grid" type="button">
                    <LayoutGrid size={16} />
                    <span className="hidden lg:inline">Cosy</span>
                  </button>
                  <button className={`px-3 py-2 text-sm flex items-center gap-1 border-l border-gray-200 ${mode === "list" ? "bg-gray-100" : ""}`} onClick={() => setMode("list")} title="List view" aria-label="List view" type="button">
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
                    placeholder="Search favourites"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setSearchTerm("");
                    }}
                    className={`w-full border ${searchFocused ? "" : "border-gray-300"} rounded-md px-4 py-2 pr-10 text-sm outline-none transition font-avenir`}
                    style={{ borderColor: searchFocused ? TRUST_GREEN : undefined, boxShadow: searchFocused ? `0 0 0 2px ${TRUST_GREEN}40` : undefined }}
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className="absolute right-9 top-2.5 text-gray-400 hover:text-gray-600" aria-label="Clear" tabIndex={-1} type="button">
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

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar space-y-12">
          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ color: TRUST_GREEN }}>Dashboards</h2>

            {favouriteReports.length === 0 ? (
              <div className="text-gray-500 italic text-center w-full">No favourite dashboards yet.</div>
            ) : mode === "list" ? (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  {favouriteReports.map((report) => (
                    <li
                      role="button"
                      tabIndex={0}
                      key={report.id}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(report.href)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          navigate(report.href);
                        }
                      }}
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm text-gray-900">{report.name}</div>
                        {report.description && <div className="truncate text-xs text-gray-500">{report.description}</div>}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDashboardFavourite(report.id);
                        }}
                        className="p-2 rounded-full group transition"
                        aria-label={analyticsFavourites.includes(report.id) ? "Unfavourite" : "Favourite"}
                        aria-pressed={analyticsFavourites.includes(report.id)}
                        title={analyticsFavourites.includes(report.id) ? "Unfavourite" : "Favourite"}
                        type="button"
                      >
                        <Star
                          className={`w-5 h-5 transition-transform duration-300 ${analyticsFavourites.includes(report.id) ? "text-yellow-400" : "text-gray-300"} ${clickedStar === report.id ? "scale-125 animate-ping-once" : ""}`}
                          strokeWidth={1.5}
                          fill={analyticsFavourites.includes(report.id) ? "#fde047" : "none"}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div
                className="grid"
                style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${dashSize}px, 1fr))`, gap: `${dashGap}px` }}
              >
                {favouriteReports.map((report, idx) => (
                  <ReportCard
                    key={report.id || idx}
                    report={report}
                    isFavourite={analyticsFavourites.includes(report.id)}
                    onFavourite={() => handleDashboardFavourite(report.id)}
                    onClick={() => navigate(report.href)}
                    clickedStar={clickedStar}
                    disabled={!!report.comingSoon}
                    layoutSizePx={dashSize}
                    subtle
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ color: TRUST_GREEN }}>Toolkits</h2>

            {favouriteToolkits.length === 0 ? (
              <div className="text-gray-500 italic text-center">No favourite toolkits yet.</div>
            ) : mode === "list" ? (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  {favouriteToolkits.map((tk, idx) => (
                    <li
                      key={`${storageKeyForItem(tk)}:${tk.id}:${idx}`}
                      role="button"
                      tabIndex={0}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() => openExternalOrRoute(tk.href, navigate)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openExternalOrRoute(tk.href, navigate);
                        }
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {tk.logoUrl && <img src={tk.logoUrl} alt="" className="w-6 h-6 object-contain flex-shrink-0" />}
                        <div className="min-w-0">
                          <div className="truncate text-sm text-gray-900">{tk.name}</div>
                          {tk.sourceToolkit && <div className="truncate text-xs text-gray-500">{tk.sourceToolkit}</div>}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleToolkitItemFavourite(tk);
                        }}
                        className="p-2 rounded-full group transition"
                        aria-label={isToolkitFavedForItem(tk) ? "Unfavourite" : "Favourite"}
                        aria-pressed={isToolkitFavedForItem(tk)}
                        title={isToolkitFavedForItem(tk) ? "Unfavourite" : "Favourite"}
                        type="button"
                      >
                        <Star
                          className={`w-5 h-5 transition-transform duration-300 ${isToolkitFavedForItem(tk) ? "text-yellow-400" : "text-gray-300"} ${clickedStar === `${storageKeyForItem(tk)}:${tk.id}` ? "scale-125 animate-ping-once" : ""}`}
                          strokeWidth={1.5}
                          fill={isToolkitFavedForItem(tk) ? "#fde047" : "none"}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div
                className="grid"
                style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${tkSize}px, 1fr))`, gap: `${tkGap}px` }}
              >
                {favouriteToolkits.map((toolkit, idx) => (
                  <ToolkitReportCard
                    key={`${storageKeyForItem(toolkit)}:${toolkit.id}:${idx}`}
                    report={toolkit}
                    isFavourite={isToolkitFavedForItem(toolkit)}
                    onFavourite={() => toggleToolkitItemFavourite(toolkit)}
                    onClick={() => openExternalOrRoute(toolkit.href, navigate)}
                    clickedStar={clickedStar}
                    disabled={!!toolkit.comingSoon}
                    showSourcePrefix={true}
                    showMoreMenu={Boolean(toolkit.openInBrowserHref || toolkit.openInBrowserUrl)}
                    layoutSizePx={tkSize}
                    subtle
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <style>{`
          .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar-track { background: transparent; }
          .custom-scrollbar-thumb { background-color: #cbd5e1; border-radius: 3px; }
          .custom-scrollbar-thumb:hover { background-color: #94a3b8; }
        `}</style>
      </div>
    </AnalyticsLayout>
  );
}
