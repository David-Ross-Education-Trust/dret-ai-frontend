import React from "react";
import { FileSpreadsheet } from "lucide-react";

// Replace these with your actual SharePoint Excel docs
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
  // ...add more as needed
];

const getExcelDesktopLink = (url) => `ms-excel:ofv|u|${url}`;

export default function AbbeyToolkit() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 py-10 px-2">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md flex flex-col items-center justify-center w-full max-w-lg px-8 py-6 mb-8 border border-gray-100">
        <img
          src="/your-path-to/abbey-logo.png" // Replace with your logo path!
          alt="Abbey CE Academy logo"
          className="w-24 h-24 object-contain mb-3"
        />
        <h1 className="text-2xl font-bold text-center mb-1" style={{ fontFamily: "AvenirLTStdLight, system-ui, sans-serif" }}>
          Abbey CE Academy Toolkit
        </h1>
        <div className="text-sm text-gray-500 text-center">
          Direct links to key Excel tools
        </div>
      </div>

      {/* Excel Files Grid */}
      <div className="w-full max-w-xl grid grid-cols-2 sm:grid-cols-3 gap-6">
        {excelFiles.map((file, idx) => (
          <a
            key={idx}
            href={getExcelDesktopLink(file.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex flex-col items-center justify-center gap-2
              bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition
              border border-gray-100 group
              text-center
            "
            title="Open in Excel desktop app"
            style={{ minHeight: 110 }}
          >
            <FileSpreadsheet className="w-10 h-10 text-green-500 group-hover:text-green-600 transition" />
            <span className="text-[15px] font-medium text-gray-800 group-hover:text-green-700">
              {file.label}
            </span>
            <span className="text-xs text-gray-400 group-hover:text-green-500">Open in Excel</span>
          </a>
        ))}
      </div>
    </div>
  );
}
