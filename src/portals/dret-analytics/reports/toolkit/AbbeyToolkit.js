import React, { useState } from "react";
import { Search, X } from "lucide-react";
import AnalyticsLayout from "../../components/layout";
import excelIcon from "../../../../assets/excel-icon.png";

const dummyFiles = [
  { name: "Attendance Tracker", url: "#", },
  { name: "Staff Timetable", url: "#", },
  { name: "Pupil Progress", url: "#", },
  { name: "Yearly Budget", url: "#", },
  { name: "Student Contacts", url: "#", },
  { name: "Classroom Resources", url: "#", },
  { name: "Assessment Results", url: "#", },
  { name: "Curriculum Map", url: "#", },
  { name: "Parent Communications", url: "#", },
  { name: "Site Risk Assessment", url: "#", },
];

const TRUST_GREEN = "#205c40";

export default function AbbeyToolkit() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // Filter files by search term
  const shownFiles = dummyFiles.filter(
    f =>
      searchTerm.trim() === "" ||
      f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnalyticsLayout>
      <div
        className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir"
        style={{
          fontFamily: "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* Top Bar */}
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

        {/* File Explorer Grid */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-10">
              {shownFiles.length === 0 ? (
                <div className="col-span-full text-gray-500 italic text-center mt-20">
                  No files found.
                </div>
              ) : (
                shownFiles.map((file, idx) => (
                  <a
                    key={file.name}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center justify-start select-none cursor-pointer transition focus:outline-none"
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={excelIcon}
                      alt=""
                      style={{
                        width: 74,
                        height: 90,
                        marginBottom: 12,
                        objectFit: "contain",
                        display: "block",
                        transition: "box-shadow 0.13s",
                        boxShadow: "0 1px 5px 0 rgba(60,90,70,0.06)",
                        filter: "drop-shadow(0 2px 12px rgba(60,90,70,0.09))",
                      }}
                      className="group-hover:shadow-xl"
                    />
                    <span
                      className="block text-base text-gray-800 truncate max-w-[112px] text-center"
                      style={{
                        fontFamily: "AvenirLTStdLight, Avenir, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 500,
                        marginBottom: 4,
                        lineHeight: "1.25",
                        letterSpacing: "0.01em",
                      }}
                      title={file.name}
                    >
                      {file.name}
                    </span>
                    <span
                      className="block text-xs text-gray-400"
                      style={{
                        fontFamily: "AvenirLTStdLight, Avenir, sans-serif",
                        fontSize: "0.83rem",
                        fontWeight: 400,
                        letterSpacing: "0.01em",
                        textAlign: "center",
                      }}
                    >
                      Open in Excel
                    </span>
                  </a>
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
