import React, { useState } from "react";
import { Search, X } from "lucide-react";
import AnalyticsLayout from "../../../components/layout";
import ToolkitReportCard from "../../../components/ToolkitReportCard";
import { WoldConfig } from "./WoldConfig";

const TRUST_GREEN = "#205c40";

function useFavourites(key = "toolkitFavourites_Wold") {
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

export default function WoldToolkit() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [favourites, toggleFavourite] = useFavourites(
    "toolkitFavourites_Wold"
  );
  const [clickedStar, setClickedStar] = useState(null);

  const shownFiles = WoldConfig.filter(
    (file) =>
      searchTerm.trim() === "" ||
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div
          className="shrink-0 z-20 shadow-sm px-8 h-24 flex items-center justify-between"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h1 className="text-2xl font-bold" style={{ color: TRUST_GREEN }}>
            Wold Academy
          </h1>
          <div className="relative flex-shrink-0 w-[240px] ml-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search files"
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

        {/* File Grid */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {shownFiles.length === 0 ? (
              <div className="col-span-full text-gray-500 italic text-center mt-20">
                No files found.
              </div>
            ) : (
              shownFiles.map((file) => (
                <ToolkitReportCard
                  key={file.id}
                  report={file}
                  isFavourite={favourites.includes(file.id)}
                  onFavourite={() => {
                    toggleFavourite(file.id);
                    setClickedStar(file.id);
                    setTimeout(() => setClickedStar(null), 400);
                  }}
                  clickedStar={clickedStar}
                  onClick={() => window.open(file.href, "_blank")}
                  disabled={false}
                  showMoreMenu={true}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </AnalyticsLayout>
  );
}
