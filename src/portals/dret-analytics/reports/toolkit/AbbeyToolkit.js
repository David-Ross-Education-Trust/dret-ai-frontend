import React, { useState } from "react";
import { Search, X } from "lucide-react";
import AnalyticsLayout from "../../components/layout";
import ExcelIcon from "../../../../assets/excel-icon.png";

// Replace this array with your actual files for Abbey CE Academy
const abbeyFiles = [
  { name: "Attendance Tracker.xlsx", url: "https://sharepoint/link/1" },
  { name: "Staff Timetable.xlsx", url: "https://sharepoint/link/2" },
  { name: "Pupil Progress.xlsx", url: "https://sharepoint/link/3" },
  // ... up to 10 or more
];

export default function AbbeyToolkit() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // Filter files by search
  const filteredFiles = abbeyFiles.filter(
    file =>
      !searchTerm.trim() ||
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TRUST_GREEN = "#205c40";

  return (
    <AnalyticsLayout>
      <div
        className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir"
        style={{
          fontFamily:
            "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* --- Top Bar --- */}
        <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-8 h-24 flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: TRUST_GREEN }}>
            Abbey CE Academy Toolkit
          </h1>
          <div className="relative flex-shrink-0 w-[240px] ml-4">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
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
                fontFamily: "AvenirLTStdLight, Avenir, sans-serif"
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
        {/* --- File Grid --- */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div
            className="
              grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10
              gap-x-4 gap-y-6
              w-full
            "
            style={{ minHeight: 200 }}
          >
            {filteredFiles.length === 0 ? (
              <div className="col-span-full text-gray-500 italic text-center">
                No files available{searchTerm ? " for this search." : " yet."}
              </div>
            ) : (
              filteredFiles.map((file, idx) => (
                <a
                  key={idx}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex flex-col items-center justify-center
                    p-2 bg-white rounded-xl shadow hover:shadow-lg transition-shadow
                    group cursor-pointer
                  "
                  style={{ minWidth: 90, maxWidth: 120 }}
                  title={file.name}
                >
                  <img
                    src={ExcelIcon}
                    alt="Excel File"
                    className="w-12 h-12 object-contain mb-2"
                  />
                  <span
                    className="
                      text-xs text-gray-700 text-center truncate w-full
                      font-medium group-hover:text-[var(--trust-green)]
                      px-1
                    "
                    style={{
                      fontFamily: "AvenirLTStdLight, Avenir, sans-serif",
                      maxWidth: 90,
                      minHeight: 30,
                    }}
                  >
                    {file.name}
                  </span>
                </a>
              ))
            )}
          </div>
        </div>
        {/* --- Custom Scrollbar Style --- */}
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