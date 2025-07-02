import React, { useState } from "react";
import { Search, X } from "lucide-react";
import AnalyticsLayout from "../components/layout";

export default function AbbeyToolkit() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // Placeholder file data
  const files = [
    { name: "Attendance Tracker", link: "#" },
    { name: "Staff Timetable", link: "#" },
    { name: "Pupil Progress", link: "#" },
    { name: "Assessment Overview", link: "#" },
    { name: "Behaviour Log", link: "#" },
    { name: "Intervention Register", link: "#" },
    { name: "SEND Records", link: "#" },
    { name: "Clubs List", link: "#" },
    { name: "Parent Contacts", link: "#" },
    { name: "Risk Assessment", link: "#" },
  ];

  const TRUST_GREEN = "#205c40";

  // Filter files by search term
  const filteredFiles = files.filter(
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
        {/* --- Top Bar with heading + search bar --- */}
        <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-8 h-24 flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: TRUST_GREEN }}>
            Abbey CE Academy Toolkit
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
                fontFamily: "AvenirLTStdLight, Avenir, sans-serif",
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
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="grid grid-cols-5 gap-12">
            {filteredFiles.length === 0 ? (
              <div className="col-span-full text-gray-500 italic text-center">
                No files found{searchTerm ? " for this search." : "."}
              </div>
            ) : (
              filteredFiles.map((file, idx) => (
                <button
                  key={idx}
                  className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none bg-transparent border-0"
                  onClick={() => window.open(file.link, "_blank")}
                  tabIndex={0}
                  style={{ outline: "none" }}
                >
                  <img
                    src="/excel-thumbnail.png"
                    alt=""
                    style={{
                      width: 74,
                      height: 90,
                      marginBottom: 12,
                      objectFit: "contain",
                      display: "block",
                      transition: "box-shadow 0.13s",
                      boxShadow: "0 1px 5px 0 rgba(60, 90, 70, 0.06)",
                    }}
                  />
                  <span
                    className="text-gray-700 text-base font-medium truncate w-32 text-center"
                    style={{
                      fontFamily: "AvenirLTStdLight, Avenir, sans-serif",
                    }}
                    title={file.name}
                  >
                    {file.name}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
        {/* --- Custom Scrollbar Styles --- */}
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
