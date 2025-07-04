import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import AnalyticsLayout from "../components/layout";
import ReportCard from "../components/reportCard";
import ToolkitReportCard from "../components/ToolkitReportCard";
import { reportConfig } from "../components/reportConfig";
import { toolkitConfig } from "../components/ToolkitConfig";
import { useFavourites } from "../hooks/useFavourites";

export default function FavouritesPage() {
  const [analyticsFavourites, toggleAnalyticsFavourite] = useFavourites("analyticsFavourites");
  const [toolkitFavourites, toggleToolkitFavourite] = useFavourites("toolkitFavourites");
  const allFavourites = [...new Set([...analyticsFavourites, ...toolkitFavourites])];

  const [clickedStar, setClickedStar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();
  const TRUST_GREEN = "#205c40";

  const handleFavourite = (id) => {
    if (analyticsFavourites.includes(id)) {
      toggleAnalyticsFavourite(id);
    } else if (toolkitFavourites.includes(id)) {
      toggleToolkitFavourite(id);
    } else {
      toggleAnalyticsFavourite(id); // Fallback if somehow unknown
    }

    setClickedStar(id);
    setTimeout(() => setClickedStar(null), 400);
  };

  const favouriteReports = reportConfig.filter(
    (r) =>
      !r.comingSoon &&
      r.id &&
      allFavourites.includes(r.id) &&
      (
        searchTerm.trim() === "" ||
        (r.name && r.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
  );

  const favouriteToolkits = toolkitConfig.filter(
    (t) =>
      !t.comingSoon &&
      t.id &&
      allFavourites.includes(t.id) &&
      (
        searchTerm.trim() === "" ||
        (t.name && t.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
  );

  return (
    <AnalyticsLayout>
      <div className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir">
        {/* Top Bar */}
        <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-8 h-24 flex items-center justify-between">
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
              className={`w-full border ${
                searchFocused ? "" : "border-gray-300"
              } rounded-md px-4 py-2 pr-10 text-sm outline-none transition`}
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

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-12">
          {/* Favourite Reports */}
          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ color: TRUST_GREEN }}>
              Favourite Reports
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
              {favouriteReports.length === 0 ? (
                <div className="col-span-full text-gray-500 italic text-center">
                  No favourite reports yet. Click the star on any report to favourite it!
                </div>
              ) : (
                favouriteReports.map((report, idx) => (
                  <ReportCard
                    key={report.id || idx}
                    report={report}
                    isFavourite={allFavourites.includes(report.id)}
                    onFavourite={handleFavourite}
                    onClick={() => navigate(report.href)}
                    clickedStar={clickedStar}
                    disabled={!!report.comingSoon}
                  />
                ))
              )}
            </div>
          </div>

          {/* Favourite Toolkits */}
          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ color: TRUST_GREEN }}>
              Favourite Toolkits
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {favouriteToolkits.length === 0 ? (
                <div className="col-span-full text-gray-500 italic text-center">
                  No favourite toolkits yet. Click the star on any toolkit to favourite it!
                </div>
              ) : (
                favouriteToolkits.map((toolkit, idx) => (
                  <ToolkitReportCard
                    key={toolkit.id || idx}
                    report={toolkit}
                    isFavourite={allFavourites.includes(toolkit.id)}
                    onFavourite={handleFavourite}
                    onClick={() => navigate(toolkit.href)}
                    clickedStar={clickedStar}
                    disabled={!!toolkit.comingSoon}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Optional: consistent scrollbar styling */}
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
