import React, { useState, useMemo, useEffect, useRef } from "react";
import { Search, X, Rows, Grid, LayoutGrid, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnalyticsLayout from "../components/layout";
import { visibleReports } from "../reports/FinanceConfig";
import ReportCard from "../components/reportCard";

function useFavourites(key = "financeFavourites") {
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

function openExternalOrRoute(href, navigate) {
  if (!href) return;
  if (/^https?:\/\//i.test(href)) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  navigate(href);
}

const VIEW_STORAGE_KEYS = {
  mode: "financeViewMode",
  favesOnly: "financeViewFavesOnly",
};

export default function FinanceReports() {
  const navigate = useNavigate();
  const [favourites, toggleFavourite] = useFavourites();
  const [clickedStar, setClickedStar] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInlineRef = useRef(null);
  const searchDesktopRef = useRef(null);

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
    } catch {}
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
    } catch {}
  }, [showOnlyFaves]);

  const PRESETS = {
    compact: { size: 240, gap: 16 },
    cosy: { size: 300, gap: 24 },
    list: { size: 0, gap: 0 },
  };
  const { size, gap } = PRESETS[mode];

  const TRUST_GREEN = "#205c40";

  const filtered = useMemo(() => {
    const t = searchTerm.trim().toLowerCase();
    return visibleReports.filter((r) => {
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
          <h1 className="text-2xl font-extrabold" style={{ color: TRUST_GREEN }}>
            Finance Dashboards
          </h1>

          <div className="flex items-center gap-3">
            {searchOpen ? (
              <div className="flex items-center lg:hidden">
                <div className="relative w-[240px]">
                  <input
                    ref={searchInlineRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setSearchTerm("");
                        setSearchOpen(false);
                      }
                    }}
                    placeholder="Search dashboards"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm outline-none font-avenir"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-9 top-2.5 text-gray-400 hover:text-gray-600"
                      aria-label="Clear search"
                      type="button"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="ml-2 p-2 rounded-md border border-gray-200 hover:bg-gray-50"
                  aria-label="Close search"
                  type="button"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowOnlyFaves((v) => !v)}
                  className={`hidden sm:inline-flex p-2 rounded-full border transition ${
                    showOnlyFaves ? "bg-yellow-100 border-yellow-400" : "border-gray-200 hover:bg-gray-100"
                  }`}
                  title="Toggle favourites only"
                  type="button"
                  aria-label="Toggle favourites only"
                  aria-pressed={showOnlyFaves}
                >
                  <Star
                    size={18}
                    className={`${showOnlyFaves ? "text-yellow-500" : "text-gray-400"}`}
                    fill={showOnlyFaves ? "#fde047" : "none"}
                    strokeWidth={1.5}
                  />
                </button>

                <div className="hidden sm:flex items-center rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    className={`px-3 py-2 text-sm flex items-center gap-1 ${mode === "compact" ? "bg-gray-100" : "bg-white hover:bg-gray-50"}`}
                    onClick={() => setMode("compact")}
                    title="Compact grid"
                    aria-label="Compact grid"
                    type="button"
                  >
                    <Grid size={16} />
                    <span className="hidden lg:inline">Compact</span>
                  </button>
                  <button
                    className={`px-3 py-2 text-sm flex items-center gap-1 border-l border-gray-200 ${mode === "cosy" ? "bg-gray-100" : "bg-white hover:bg-gray-50"}`}
                    onClick={() => setMode("cosy")}
                    title="Cosy grid"
                    aria-label="Cosy grid"
                    type="button"
                  >
                    <LayoutGrid size={16} />
                    <span className="hidden lg:inline">Cosy</span>
                  </button>
                  <button
                    className={`px-3 py-2 text-sm flex items-center gap-1 border-l border-gray-200 ${mode === "list" ? "bg-gray-100" : "bg-white hover:bg-gray-50"}`}
                    onClick={() => setMode("list")}
                    title="List view"
                    aria-label="List view"
                    type="button"
                  >
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
                    placeholder="Search dashboards"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setSearchTerm("");
                    }}
                    className={`w-full border ${searchFocused ? "" : "border-gray-300"} rounded-md px-4 py-2 pr-10 text-sm outline-none transition font-avenir`}
                    style={{
                      borderColor: searchFocused ? TRUST_GREEN : undefined,
                      boxShadow: searchFocused ? `0 0 0 2px ${TRUST_GREEN}40` : undefined,
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

                <button
                  className="hidden sm:inline-flex lg:hidden p-2 rounded-md border border-gray-200 hover:bg-gray-50"
                  aria-label="Open search"
                  title="Search (Ctrl/Cmd+K)"
                  type="button"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search size={18} className="text-gray-600" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {filtered.length === 0 ? (
            <div className="text-gray-500 italic text-center">
              No dashboards{searchTerm ? " match this search." : "."}
            </div>
          ) : mode === "list" ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {filtered.map((report) => (
                  <li
                    role="button"
                    tabIndex={0}
                    key={report.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => openExternalOrRoute(report.href, navigate)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openExternalOrRoute(report.href, navigate);
                      }
                    }}
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
                      aria-pressed={favourites.includes(report.id)}
                      title={favourites.includes(report.id) ? "Unfavourite" : "Favourite"}
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
          .custom-scrollbar-thumb { background-color: #cbd5e1; border-radius: 3px; }
          .custom-scrollbar-thumb:hover { background-color: #94a3b8; }
        `}</style>
      </div>
    </AnalyticsLayout>
  );
}
