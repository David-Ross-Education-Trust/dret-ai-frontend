import React, { useMemo, useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnalyticsLayout from "../components/layout";
import { visibleReports } from "../components/reportConfig";
import ReportCard from "../components/reportCard";

// --- favourites (unchanged)
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
    } catch {}
  }, [favourites, key]);

  const toggleFavourite = (id) =>
    setFavourites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return [favourites, toggleFavourite];
}

const TRUST_GREEN = "#205c40";

// Chip palettes (kept simple & close to your AI Tools page)
const filterColors = {
  Favourites: "bg-yellow-50 text-yellow-800 border-yellow-200",
  New: "bg-green-50 text-green-800 border-green-200",
  Hot: "bg-red-50 text-red-700 border-red-200",
  Demo: "bg-violet-50 text-violet-800 border-violet-200",
  defaultCat: "bg-blue-50 text-blue-800 border-blue-200",
};
const filterActiveColors = {
  Favourites: "bg-yellow-100 text-yellow-800 border-yellow-200",
  New: "bg-green-100 text-green-800 border-green-200",
  Hot: "bg-red-100 text-red-700 border-red-200",
  Demo: "bg-violet-100 text-violet-800 border-violet-200",
  defaultCat: "bg-blue-100 text-blue-800 border-blue-200",
};
const filterGrey = "bg-gray-200 text-gray-400 border-gray-200";

// Special chip keys
const SPECIALS = ["Favourites", "New", "Hot", "Demo"];

/** Pull a canonical list of categories from config (strings only, not arrays) */
function getCategoriesFromConfig(list) {
  const set = new Set();
  for (const r of list) {
    if (Array.isArray(r.category)) {
      r.category.forEach((c) => typeof c === "string" && set.add(c));
    } else if (typeof r.category === "string") {
      set.add(r.category);
    }
  }
  // Prefer your known order if present:
  const preferred = ["Education", "DRET", "Bromcom", "Operations", "HR", "Finance", "IT & Data"];
  const rest = [...set].filter((c) => !preferred.includes(c));
  return [...preferred.filter((c) => set.has(c)), ...rest];
}

export default function EducationReports() {
  const [favourites, toggleFavourite] = useFavourites();
  const [clickedStar, setClickedStar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeSpecials, setActiveSpecials] = useState([]); // multi-select
  const [activeCategory, setActiveCategory] = useState("");  // single-select
  const navigate = useNavigate();

  const categories = useMemo(() => getCategoriesFromConfig(visibleReports), []);

  const textMatch = (t, needle) =>
    !needle ||
    (t?.name && t.name.toLowerCase().includes(needle)) ||
    (t?.description && t.description.toLowerCase().includes(needle));

  const filteredReports = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();
    return visibleReports
      .filter((r) => {
        // search
        if (!textMatch(r, needle)) return false;

        // category (single)
        if (activeCategory) {
          const hasCat = Array.isArray(r.category)
            ? r.category.includes(activeCategory)
            : r.category === activeCategory;
          if (!hasCat) return false;
        }

        // specials (multi): Favourites / New / Hot / Demo
        let ok = true;
        if (activeSpecials.includes("Favourites")) {
          ok = ok && favourites.includes(r.id);
        }
        if (activeSpecials.includes("New")) {
          ok = ok && r.tag === "New";
        }
        if (activeSpecials.includes("Hot")) {
          ok = ok && r.tag === "Hot";
        }
        if (activeSpecials.includes("Demo")) {
          ok = ok && (r.demo === true || r.tag === "Demo" || r.tag === "DEMO");
        }
        return ok;
      })
      .sort((a, b) => {
        // Keep a pleasant ordering: favourites first, then New/Hot/Demo, then name
        const favA = favourites.includes(a.id) ? 1 : 0;
        const favB = favourites.includes(b.id) ? 1 : 0;
        if (favA !== favB) return favB - favA;

        const tagRank = (r) =>
          r.tag === "Hot" ? 3 : r.tag === "New" ? 2 : (r.demo || r.tag === "Demo" || r.tag === "DEMO") ? 1 : 0;
        const tA = tagRank(a);
        const tB = tagRank(b);
        if (tA !== tB) return tB - tA;

        return (a.name || "").localeCompare(b.name || "");
      });
  }, [searchTerm, activeCategory, activeSpecials, favourites]);

  const handleFavourite = (id) => {
    toggleFavourite(id);
    setClickedStar(id);
    setTimeout(() => setClickedStar(null), 350);
  };

  const chipBase =
    "px-3 py-1.5 border rounded-full text-xs font-medium cursor-pointer transition-all select-none";

  const renderSpecialChip = (label) => {
    const active = activeSpecials.includes(label);
    const cls = active
      ? `${chipBase} ${filterActiveColors[label] || filterActiveColors.defaultCat} shadow-sm`
      : `${chipBase} ${filterColors[label] || filterColors.defaultCat} hover:brightness-95`;
    return (
      <span
        key={label}
        className={cls}
        onClick={() =>
          setActiveSpecials((prev) =>
            prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
          )
        }
        style={{ borderWidth: 1, whiteSpace: "nowrap", fontFamily: "AvenirLTStdLight, Avenir, sans-serif" }}
      >
        {label}
      </span>
    );
  };

  const renderCategoryChip = (label) => {
    const active = activeCategory === label;
    const dimmed = activeCategory && !active;
    const cls = active
      ? `${chipBase} ${filterActiveColors.defaultCat} shadow-sm`
      : dimmed
      ? `${chipBase} ${filterGrey}`
      : `${chipBase} ${filterColors.defaultCat} hover:brightness-95`;
    return (
      <span
        key={label}
        className={cls}
        onClick={() => setActiveCategory(active ? "" : label)}
        style={{ borderWidth: 1, whiteSpace: "nowrap", fontFamily: "AvenirLTStdLight, Avenir, sans-serif" }}
      >
        {label}
      </span>
    );
  };

  return (
    <AnalyticsLayout>
      <div
        className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir"
        style={{ fontFamily: "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif" }}
      >
        {/* Top Bar with Filters + Search */}
        <div className="shrink-0 z-20 bg-white shadow-sm px-6 md:px-8">
          <div className="h-24 w-full flex items-center justify-between">
            <h1 className="text-2xl font-bold" style={{ color: TRUST_GREEN }}>
              Education Dashboards
            </h1>

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
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-9 top-2.5 text-gray-400 hover:text-gray-600"
                  aria-label="Clear"
                  tabIndex={-1}
                >
                  <X size={16} />
                </button>
              )}
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Filter chips row */}
          <div className="pb-4 flex flex-wrap items-center gap-2">
            {/* Specials first */}
            {SPECIALS.map(renderSpecialChip)}
            {/* Divider */}
            <span aria-hidden className="mx-2 h-6 border-l border-gray-300 opacity-60" />
            {/* Categories from config */}
            {categories.map(renderCategoryChip)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
          >
            {filteredReports.length === 0 ? (
              <div className="text-gray-500 italic text-center w-full col-span-full">
                No dashboards match your filters.
              </div>
            ) : (
              filteredReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  isFavourite={favourites.includes(report.id)}
                  onFavourite={handleFavourite}
                  onClick={() => navigate(report.href)}
                  clickedStar={null}
                  disabled={!!report.comingSoon}
                  // sizing left to parent (we keep the lean defaults inside card)
                />
              ))
            )}
          </div>
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
