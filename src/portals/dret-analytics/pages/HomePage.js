import React, { useEffect, useMemo, useState } from "react";
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

function storageKeyForItem(item) {
  const school = item?.sourceToolkit?.replace(/\s*Toolkit\s*$/i, "")?.replace(/\s+/g, "");
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
  const navigate = useNavigate();

  const textMatches = (obj, term) => {
    if (!term) return true;
    const t = term.toLowerCase();
    return (
      (obj.name && obj.name.toLowerCase().includes(t)) ||
      (obj.description && obj.description.toLowerCase().includes(t))
    );
  };

  const favouriteReports = reportConfig.filter(
    (r) =>
      !r.comingSoon &&
      r.id &&
      analyticsFavourites.includes(r.id) &&
      textMatches(r, searchTerm)
  );

  const favouriteToolkits = useMemo(() => {
    const items = [...toolkitConfig, ...demoToolkitConfig, ...allToolkitConfigs];
    return items.filter((item) => {
      if (!item?.id || item?.comingSoon) return false;
      const key = storageKeyForItem(item);
      const inSchool = toolkitFavSets[key]?.has(item.id);
      const inLegacy = toolkitFavSets["toolkitFavourites"]?.has(item.id);
      return (inSchool || inLegacy) && textMatches(item, searchTerm);
    });
  }, [toolkitFavSets, searchTerm]);

  const handleDashboardFavourite = (id) => {
    toggleAnalyticsFavourite(id);
    setClickedStar(id);
    setTimeout(() => setClickedStar(null), 400);
  };

  const toggleToolkitItemFavourite = (item) => {
    const key = storageKeyForItem(item);
    const legacyKey = "toolkitFavourites";
    const candidates = [key, legacyKey];
    const existingKey = candidates.find((k) => readSetFromLS(k).has(item.id));
    const targetKey = existingKey || key;
    const arr = JSON.parse(localStorage.getItem(targetKey) || "[]");
    const exists = arr.includes(item.id);
    const next = exists ? arr.filter((x) => x !== item.id) : [...arr, item.id];
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
                    isFavourite={
                      readSetFromLS(storageKeyForItem(toolkit)).has(toolkit.id) ||
                      readSetFromLS("toolkitFavourites").has(toolkit.id)
                    }
                    onFavourite={() => toggleToolkitItemFavourite(toolkit)}
                    onClick={() =>
                      toolkit.href?.startsWith("http")
                        ? window.open(toolkit.href, "_blank")
                        : navigate(toolkit.href)
                    }
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
