// Updated DemoToolkit.js
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import AnalyticsLayout from "../../components/layout";
import ToolkitReportCard from "../../components/toolkitReportCard";
import excelIcon from "../../../../assets/excel-icon.png";

const dummyFiles = [
  { name: "Attendance Tracker", url: "ms-excel:ofe|u|https://.../Attendance%20Tracker.xlsx" },
  { name: "Behaviour Tracker", url: "ms-excel:ofe|u|https://.../Behaviour%20Tracker.xlsx" },
  { name: "Academy Context", url: "ms-excel:ofe|u|https://.../Academy%20Context.xlsx" },
  { name: "Inclusion Map", url: "ms-excel:ofe|u|https://.../Inclusion%20Map.xlsx" },
  { name: "School Around The Child", url: "ms-excel:ofe|u|https://.../School%20Around%20The%20Child.xlsx" },
  { name: "Year 7 Achievement Tracker", url: "ms-excel:ofe|u|https://.../Year%207%20Achievement%20Tracker.xlsx" },
  { name: "Year 8 Achievement Tracker", url: "ms-excel:ofe|u|https://.../Year%208%20Achievement%20Tracker.xlsx" },
  { name: "Year 9 Achievement Tracker", url: "ms-excel:ofe|u|https://.../Year%209%20Achievement%20Tracker.xlsx" },
  { name: "Year 10 Achievement Tracker", url: "ms-excel:ofe|u|https://.../Year%2010%20Achievement%20Tracker.xlsx" },
  { name: "Year 11 Achievement Tracker", url: "ms-excel:ofe|u|https://.../Year%2011%20Achievement%20Tracker.xlsx" }
];

const TRUST_GREEN = "#205c40";

function useFavourites(key = "toolkitFavourites") {
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

export default function DemoToolkit() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [favourites, toggleFavourite] = useFavourites();
  const [clickedStar, setClickedStar] = useState(null);

  const shownFiles = dummyFiles.filter(
    (f) =>
      searchTerm.trim() === "" ||
      f.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            Demo Toolkit
          </h1>
          <div className="relative flex-shrink-0 w-[240px] ml-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search files"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-full border ${searchFocused ? "" : "border-gray-300"} rounded-md px-4 py-2 pr-10 text-sm outline-none transition`}
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
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-10">
              {shownFiles.length === 0 ? (
                <div className="col-span-full text-gray-500 italic text-center mt-20">
                  No files found.
                </div>
              ) : (
                shownFiles.map((file) => (
                  <ToolkitReportCard
                    key={file.name}
                    report={{ ...file, id: file.name, logoUrl: excelIcon }}
                    isFavourite={favourites.includes(file.name)}
                    onFavourite={(id) => {
                      toggleFavourite(id);
                      setClickedStar(id);
                      setTimeout(() => setClickedStar(null), 400);
                    }}
                    clickedStar={clickedStar}
                    onClick={() => window.open(file.url, "_blank")}
                    disabled={false}
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
