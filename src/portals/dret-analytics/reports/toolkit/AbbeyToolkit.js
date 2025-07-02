import React from "react";
import ExcelIcon from "../assets/excel-icon.png"; // Use your Excel icon or an SVG
// Example file list—replace with your actual data!
const files = [
  { name: "Attendance Tracker.xlsx", url: "https://sharepoint/link/1" },
  { name: "Staff Timetable.xlsx", url: "https://sharepoint/link/2" },
  { name: "Pupil Progress.xlsx", url: "https://sharepoint/link/3" },
  // ...add up to 10 or more
];

export default function AbbeyToolkitFileGrid() {
  return (
    <div className="p-6 w-full flex flex-col">
      {/* File Explorer grid */}
      <div
        className="
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10
          gap-x-4 gap-y-6
          w-full
        "
        style={{ minHeight: 200 }}
      >
        {files.map((file, idx) => (
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
        ))}
      </div>
    </div>
  );
}
