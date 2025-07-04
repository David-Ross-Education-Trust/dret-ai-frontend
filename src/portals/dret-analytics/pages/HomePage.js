import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import AnalyticsLayout from "../components/layout";
import ReportCard from "../components/reportCard";
import ToolkitReportCard from "../components/ToolkitReportCard";
import { reportConfig } from "../components/reportConfig";
import { toolkitConfig } from "../components/ToolkitConfig";

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

export default function FavouritesPage() {
  const [favourites, toggleFavourite] = useFavourites();
  const [clickedStar, setClickedStar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();
  const TRUST_GREEN = "#205c40";

  const favouriteReports = reportConfig.filter(
    (r) => !r.comingSoon && r.id && favourites.includes(r.id)
  );

  const favouriteToolkits = toolkitConfig.filter(
    (t) => !t.comingSoon && t.name && favourites.includes(t.name)
  );

  const handleFavourite = (id) => {
    toggleFavourite(id);
    setClickedStar(id);
    setTimeout(() => setClickedStar(null), 400);
  };

  return (
    <AnalyticsLayout>
      <div className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir">
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

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <h2 className="text-xl font-semibold mb-4" style={{ color: TRUST_GREEN }}>
            Dashboards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {favouriteReports.map((report, idx) => (
              <ReportCard
                key={report.id || idx}
                report={report}
                isFavourite={favourites.includes(report.id)}
                onFavourite={handleFavourite}
                onClick={() => navigate(report.href)}
                clickedStar={clickedStar}
                disabled={!!report.comingSoon}
              />
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-4" style={{ color: TRUST_GREEN }}>
            Toolkits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favouriteToolkits.map((toolkit, idx) => (
              <ToolkitReportCard
                key={toolkit.id || idx}
                tool={toolkit}
                isFavourite={favourites.includes(toolkit.name)}
                onFavourite={handleFavourite}
                onClick={() => navigate(toolkit.href)}
                clickedStar={clickedStar}
                disabled={!!toolkit.comingSoon}
              />
            ))}
          </div>
        </div>
      </div>
    </AnalyticsLayout>
  );
}
