import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnalyticsLayout from "../components/layout";
import { reportConfig } from "../reports/educationReportConfig";
import ReportCard from "../components/reportCard";

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

export default function FinanceReports() {
  const [favourites, toggleFavourite] = useFavourites();
  const [clickedStar, setClickedStar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  const reports = reportConfig.filter(
    (r) =>
      !r.comingSoon &&
      r.category &&
      r.category.toLowerCase() === "finance" &&
      (
        searchTerm.trim() === "" ||
        (r.name && r.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
  );

  const TRUST_GREEN = "#205c40";

  const handleFavourite = (id) => {
    toggleFavourite(id);
    setClickedStar(id);
    setTimeout(() => setClickedStar(null), 400);
  };

  return (
    <AnalyticsLayout>
      <div className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir" style={{
        fontFamily: "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif",
      }}>
        <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-8 h-24 flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: TRUST_GREEN }}>
            Finance Analytics
          </h1>
          <div className="relative flex-shrink-0 w-[240px] ml-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reports"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-full border ${searchFocused ? "" : "border-gray-300"} rounded-md px-4 py-2 pr-10 text-sm outline-none transition`}
              style={{
                borderColor: searchFocused ? TRUST_GREEN : undefined,
                boxShadow: searchFocused ? `0 0 0 2px ${TRUST_GREEN}40` : undefined,
                fontFamily: "AvenirLTStdLight, Avenir, sans-serif"
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
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {reports.length === 0 ? (
              <div className="col-span-full text-gray-500 italic text-center">
                No reports available{searchTerm ? " for this search." : " yet."}
              </div>
            ) : (
              reports.map((report, idx) => (
                <ReportCard
                  key={report.id || idx}
                  report={report}
                  isFavourite={favourites.includes(report.id)}
                  onFavourite={handleFavourite}
                  onClick={() => navigate(report.href)}
                  clickedStar={clickedStar}
                  disabled={!!report.comingSoon}
                />
              ))
            )}
          </div>
        </div>
        <style>
          {`
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #cbd5e1 transparent;
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #cbd5e1;
              border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: #94a3b8;
            }
          `}
        </style>
      </div>
    </AnalyticsLayout>
  );
}
