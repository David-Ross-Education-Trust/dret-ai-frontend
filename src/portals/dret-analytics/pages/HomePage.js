import React from "react";
import { useNavigate } from "react-router-dom";
import AnalyticsLayout from "../components/layout";
import { reportConfig } from "../components/reportConfig";
import ReportCard from "../components/reportCard";
import { useFavourites } from "../hooks/useFavourites"; // The hook from above

export default function AnalyticsHomePage() {
  const [favourites, toggleFavourite] = useFavourites();
  const [clickedStar, setClickedStar] = React.useState(null);
  const navigate = useNavigate();

  const favouriteReports = reportConfig.filter(
    (r) =>
      !r.comingSoon &&
      r.id &&
      favourites.includes(r.id)
  );

  const handleFavourite = (id) => {
    toggleFavourite(id);
    setClickedStar(id);
    setTimeout(() => setClickedStar(null), 400);
  };

  return (
    <AnalyticsLayout>
      <div className="font-sans bg-gray-50 min-h-screen h-screen flex flex-col">
        {/* Heading */}
        <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-8 h-24 flex items-center border-b border-gray-200">
          <h1 className="text-2xl font-bold" style={{ color: "#205c40" }}>
            Favourite Reports
          </h1>
        </div>
        {/* Report Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  onFavourite={(id) => {
                    handleFavourite(id);
                  }}
                  onClick={() => navigate(report.href)}
                  clickedStar={clickedStar}
                  disabled={!!report.comingSoon}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </AnalyticsLayout>
  );
}
