import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

import AnalyticsLayout from "../components/layout";
import ReportCard from "../components/reportCard";
import ToolkitReportCard from "../components/ToolkitReportCard";
import { reportConfig } from "../components/reportConfig";
import { toolkitConfig } from "../components/ToolkitConfig";
import { demoToolkitConfig } from "../reports/toolkit/DemoToolkitConfig";
import { useFavourites } from "../hooks/useFavourites";

export default function FavouritesPage() {
  const [analyticsFavourites, toggleAnalyticsFavourite] = useFavourites("analyticsFavourites");
  const [toolkitFavourites, toggleToolkitFavourite] = useFavourites("toolkitFavourites");

  const [clickedStar, setClickedStar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();
  const TRUST_GREEN = "#205c40";

  const favouriteReports = reportConfig.filter(
    (r) =>
      !r.comingSoon &&
      r.id &&
      analyticsFavourites.includes(r.id) &&
      (
        searchTerm.trim() === "" ||
        (r.name && r.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
  );

  const favouriteToolkits = [...toolkitConfig, ...demoToolkitConfig].filter(
    (t) =>
      !t.comingSoon &&
      t.id &&
      toolkitFavourites.includes(t.id) &&
      (
        searchTerm.trim() === "" ||
        (t.name && t.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
  );

  const handleFavourite = (id) => {
    if (analyticsFavourites.includes(id)) {
      toggleAnalyticsFavourite(id);
    } else {
      toggleToolkitFavourite(id); // catch both toolkit + demoToolkit
    }

    setClickedStar(id);
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
        {/* --- Top Bar --- */}
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

        {/* --- Main Content --- */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-12">
          {/* Favourite Reports */}
          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ color: TRUST_GREEN }}>
              Dashboards
            </h2>
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              }}
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
                    onFavourite={() => handleFavourite(report.id)}
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
                    key={toolkit.id || idx}
                    report={toolkit}
                    isFavourite={toolkitFavourites.includes(toolkit.id)}
                    onFavourite={() => handleFavourite(toolkit.id)}
                    onClick={() =>
                      toolkit.href?.startsWith("http")
                        ? window.open(toolkit.href, "_blank")
                        : navigate(toolkit.href)
                    }
                    clickedStar={clickedStar}
                    disabled={!!toolkit.comingSoon}
                    showSourcePrefix={true} // ✅ prefix with toolkit name
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
