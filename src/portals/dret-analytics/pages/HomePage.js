import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

import AnalyticsLayout from "../components/layout";
import ReportCard from "../components/reportCard";
import ToolkitReportCard from "../components/ToolkitReportCard";
import { reportConfig } from "../components/reportConfig";
import { toolkitConfig } from "../components/ToolkitConfig";
import { demoToolkitConfig } from "../reports/toolkit/DemoToolkitConfig";
import { allToolkitConfigs } from "../reports/toolkit/allToolkits";
import { useFavourites } from "../hooks/useFavourites";

const TRUST_GREEN = "#205c40";

// --- Treat Office deep links and other custom schemes as external navigations.
const CUSTOM_SCHEME_RE =
  /^(ms-(excel|word|powerpoint|project|access|onenote|visio|office):|mailto:|tel:)/i;

function openExternalOrRoute(href, navigate) {
  if (!href) return;

  // Custom schemes → hard navigation (don’t let the router touch it)
  if (CUSTOM_SCHEME_RE.test(href)) {
    window.location.assign(href); // or window.location.href = href
    return;
  }

  // Normal web links → new tab
  if (/^https?:\/\//i.test(href)) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }

  // In-app paths → SPA navigation
  navigate(href);
}

// --- Normalise a label like "Barnes Wallis Academy Toolkit" -> "BarnesWallis"
function normaliseSchoolLabel(label) {
  if (!label) return "";
  return (
    label
      .replace(/\bToolkit\b/i, "")
      .replace(/\bAcademy\b/i, "")
      .replace(/\bPrimary\b/i, "")
      .replace(/[\W_]+/g, "") // remove spaces, punctuation, underscores
      .trim()
  );
}

// Build LS key from item metadata (sourceToolkit preferred)
function storageKeyForItem(item) {
  const raw =
    item?.sourceToolkit ||
    item?.source ||
    item?.school ||
    ""; // fallbacks if some configs use different fields
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

export default function HomePage() {
  const [analyticsFavourites, toggleAnalyticsFavourite] = useFavourites("analyticsFavourites");

  // Keep an in-memory snapshot of all toolkit favourites sets
  const [toolkitFavVersion, setToolkitFavVersion] = useState(0);
  const [toolkitFavSets, setToolkitFavSets] = useState({});

  useEffect(() => {
    const sets = {};
    // legacy/global
    sets["toolkitFavourites"] = readSetFromLS("toolkitFavourites");
    // all per-school keys
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
  const navigate = useNavigate();

  const textMatches = (obj, term) => {
    if (!term) return true;
    const t = term.toLowerCase();
    return (
      (obj.name && obj.name.toLowerCase().includes(t)) ||
      (obj.description && obj.description.toLowerCase().includes(t))
    );
  };

  // Dashboards favourites (unchanged)
  const favouriteReports = reportConfig.filter(
    (r) =>
      !r.comingSoon &&
      r.id &&
      analyticsFavourites.includes(r.id) &&
      textMatches(r, searchTerm)
  );

  // ✅ Scoped favourite check: only consider THIS item's school key (plus legacy)
  const isToolkitFavedForItem = useCallback(
    (item) => {
      const key = storageKeyForItem(item);
      return (
        toolkitFavSets[key]?.has?.(item.id) ||
        toolkitFavSets["toolkitFavourites"]?.has?.(item.id) // legacy/global fallback
      );
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

  // Toggle toolkit favourite ONLY in this item's normalised school key
  const toggleToolkitItemFavourite = (item) => {
    const targetKey = storageKeyForItem(item); // enforce per-school storage
    const currentArr = JSON.parse(localStorage.getItem(targetKey) || "[]");
    const exists = currentArr.includes(item.id);
    const next = exists ? currentArr.filter((x) => x !== item.id) : [...currentArr, item.id];
    localStorage.setItem(targetKey, JSON.stringify(next));

    setToolkitFavVersion((v) => v + 1);
    setClickedStar(`${targetKey}:${item.id}`);
    setTimeout(() => setClickedStar(null), 400);
  };

  return (
    <AnalyticsLayout>
      <div
        className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir"
        style={{
          fontFamily: "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          className="shrink-0 z-20 shadow-sm px-8 h-24 flex items-center justify-between"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h1 className="text-2xl font-bold" style={{ color: TRUST_GREEN }}>
            Favourites
          </h1>
          <div className="relative flex-shrink-0 w-[240px] ml-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search favourites"
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
              >
                <X size={16} />
              </button>
            )}
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-12">
          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ color: TRUST_GREEN }}>
              Dashboards
            </h2>
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
            >
              {favouriteReports.length === 0 ? (
                <div className="text-gray-500 italic text-center w-full col-span-full">
                  No favourite dashboards yet.
                </div>
              ) : (
                favouriteReports.map((report, idx) => (
                  <ReportCard
                    key={report.id || idx}
                    report={report}
                    isFavourite={analyticsFavourites.includes(report.id)}
                    onFavourite={() => handleDashboardFavourite(report.id)}
                    onClick={() => navigate(report.href)}
                    clickedStar={clickedStar}
                    disabled={!!report.comingSoon}
                  />
                ))
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ color: TRUST_GREEN }}>
              Toolkits
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {favouriteToolkits.length === 0 ? (
                <div className="col-span-full text-gray-500 italic text-center">
                  No favourite toolkits yet.
                </div>
              ) : (
                favouriteToolkits.map((toolkit, idx) => (
                  <ToolkitReportCard
                    key={`${storageKeyForItem(toolkit)}:${toolkit.id}:${idx}`}
                    report={toolkit}
                    isFavourite={isToolkitFavedForItem(toolkit)}
                    onFavourite={() => toggleToolkitItemFavourite(toolkit)}
                    onClick={() => openExternalOrRoute(toolkit.href, navigate)}
                    clickedStar={clickedStar}
                    disabled={!!toolkit.comingSoon}
                    showSourcePrefix={true}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AnalyticsLayout>
  );
}
