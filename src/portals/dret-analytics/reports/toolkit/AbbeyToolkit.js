import React from "react";
import AnalyticsLayout from "../../components/layout";
import { FileSpreadsheet } from "lucide-react";

const excelFiles = [
  {
    label: "Attendance Tracker",
    url: "https://yourtenant.sharepoint.com/sites/abbey/Shared%20Documents/Attendance.xlsx",
  },
  {
    label: "Staff Timetable",
    url: "https://yourtenant.sharepoint.com/sites/abbey/Shared%20Documents/StaffTimetable.xlsx",
  },
  {
    label: "Pupil Progress",
    url: "https://yourtenant.sharepoint.com/sites/abbey/Shared%20Documents/PupilProgress.xlsx",
  },
  // ...add more as needed!
];

const getExcelDesktopLink = (url) => `ms-excel:ofv|u|${url}`;

export default function AbbeyToolkit() {
  return (
    <AnalyticsLayout>
      <div className="font-sans bg-gray-50 min-h-screen h-screen flex flex-col">
        {/* Heading */}
        <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-8 h-24 flex items-center border-b border-gray-200">
          <h1 className="text-2xl font-bold flex items-center gap-3" style={{ color: "#205c40" }}>
            <img
              src="/your-path-to/abbey-logo.png" // Update this!
              alt="Abbey CE Academy"
              className="w-12 h-12 object-contain rounded-lg mr-2"
              style={{ background: "#fff" }}
            />
            Abbey CE Academy Toolkit
          </h1>
        </div>
        {/* Excel Tool Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {excelFiles.length === 0 ? (
              <div className="col-span-full text-gray-500 italic text-center">
                No tools available yet.
              </div>
            ) : (
              excelFiles.map((file, idx) => (
                <a
                  key={idx}
                  href={getExcelDesktopLink(file.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    flex flex-col items-center justify-center
                    bg-white rounded-xl shadow-md hover:shadow-lg
                    transition-all cursor-pointer aspect-square w-full min-w-[140px] min-h-[140px] max-w-[220px] max-h-[220px]
                    border border-gray-100 relative group
                  `}
                  title="Open in Excel desktop app"
                  style={{ textDecoration: "none" }}
                >
                  <FileSpreadsheet className="w-10 h-10 text-green-500 group-hover:text-green-700 transition mb-2" />
                  <span className="text-center font-medium text-gray-800 group-hover:text-green-800 text-base">
                    {file.label}
                  </span>
                  <span className="text-xs text-gray-400 mt-2 group-hover:text-green-600">
                    Open in Excel
                  </span>
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </AnalyticsLayout>
  );
}
