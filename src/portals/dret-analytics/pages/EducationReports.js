import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnalyticsLayout from "../components/layout";
import { visibleReports } from "../components/reportConfig"; // base list (excludes hidden)
import ReportCard from "../components/reportCard";
import { useAllowedReports } from "../hooks/useAllowedReports";

// Custom hook for persisting favourites in localStorage
function useFavourites(key = "analyticsFavourites") {
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(favourites));
  }, [favourites, key]);

  const toggleFavourite = (id) =>
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );

  return [favourites, toggleFavourite];
}

export default function EducationReports() {
  const [favourites, toggleFavourite] = useFavourites();
  const [clickedStar, setClickedStar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  // 🔐 Fetch allowlist from backend
  const { loading, error, allowed } = useAllowedReports();
  const allowSet = new Set(allowed || []);

  // Base filter: only DRET/Bromcom + search
  let educationReports = visibleReports.filter((r) => {
    const category = Array.isArray(r.category) ? r.category[0] : r.category;
    const inCategory = category && ["dret", "bromcom"].includes(String(category).toLowerCase());
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !q ||
      r.name?.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q);
    return inCategory && matchesSearch;
  });

  // ✅ After allowlist loads (and no error), hide everything not allowed
  if (!loading && !error) {
    educationReports = educationReports.filter((r) => allowSet.has(r.id));
  }

  const TRUST_GREEN = "#205c40";

  const handleFavourite = (id) => {
    toggleFavourite(id);
    setClickedStar(id);
    setTimeout(() => setClickedStar(null), 400);
  };

  return (
    <AnalyticsLayout>
      <div
        className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir"
        style={{ fontFamily: "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif" }}
      >
        {/* --- Top Bar --- */}
        <div className="shrink-0 z-20 shadow-sm px-8 h-24 flex items-center justify-between bg-white">
          <h1 className="text-2xl font-bold" style={{ color: TRUST_GREEN }}>
            Education Dashboards
          </h1>
          <div className="relative flex-shrink-0 w-[240px] ml-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search education reports"
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
              >
                <X size={16} />
              </button>
            )}
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* --- Report Grid --- */}
        <div className="scroll-area flex-1 overflow-y-auto bg-gray-100 font-avenir p-8 pb-16">
          {loading ? (
            <div className="text-gray-500 italic text-center w-full">
              Loading available reports…
            </div>
          ) : error ? (
            <div className="text-red-600 text-center w-full">
              Couldn’t determine your report access. Showing none.
              <div className="text-xs text-gray-500 mt-2">{String(error)}</div>
            </div>
          ) : (
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
            >
              {educationReports.length === 0 ? (
                <div className="text-gray-500 italic text-center w-full col-span-full">
                  No education reports available{searchTerm ? " for this search." : "."}
                </div>
              ) : (
                educationReports.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    isFavourite={favourites.includes(report.id)}
                    onFavourite={handleFavourite}
                    onClick={() => navigate(report.href)}
                    clickedStar={clickedStar}
                    disabled={false}
                  />
                ))
              )}
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
