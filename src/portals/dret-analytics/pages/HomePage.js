import { reportConfig } from "../components/reportConfig";
import { toolkitConfig } from "../components/ToolkitConfig";
import { useFavourites } from "../hooks/useFavourites";
import ReportCard from "../components/reportCard";
import ToolkitReportCard from "../components/ToolkitReportCard";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Search, X } from "lucide-react";
import AnalyticsLayout from "../components/layout";

export default function AnalyticsHomePage() {
  const [favourites, toggleFavourite] = useFavourites();
  const [clickedStar, setClickedStar] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchFocused, setSearchFocused] = React.useState(false);
  const navigate = useNavigate();

  // Filter favourite reports (not coming soon)
  const favouriteReports = reportConfig.filter(
    (r) =>
      !r.comingSoon &&
      r.id &&
      favourites.includes(r.id) &&
      (
        searchTerm.trim() === "" ||
        (r.name && r.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
  );

  // Filter favourite toolkits (not coming soon)
  const favouriteToolkits = toolkitConfig.filter(
    (t) =>
      !t.comingSoon &&
      t.id &&
      favourites.includes(t.id) &&
      (
        searchTerm.trim() === "" ||
        (t.name && t.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
      <div
        className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir"
        style={{
          fontFamily:
            "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif",
        }}
      >
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
                boxShadow: searchFocused
                  ? `0 0 0 2px ${TRUST_GREEN}40`
                  : undefined,
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

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-12">
          {/* Favourite Reports */}
          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ color: TRUST_GREEN }}>
              Favourite Reports
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {favouriteReports.length === 0 ? (
                <div className="col-span-full text-gray-500 italic text-center">
                  No favourite reports yet. Click the star on any report to favourite it!
                </div>
              ) : (
                favouriteReports.map((report, idx) => (
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

          {/* Favourite Toolkits */}
          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ color: TRUST_GREEN }}>
              Favourite Toolkits
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {favouriteToolkits.length === 0 ? (
                <div className="col-span-full text-gray-500 italic text-center">
                  No favourite toolkits yet. Click the star on any toolkit to favourite it!
                </div>
              ) : (
                favouriteToolkits.map((toolkit, idx) => (
                  <ToolkitReportCard
                    key={toolkit.id || idx}
                    report={toolkit}
                    isFavourite={favourites.includes(toolkit.id)}
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
