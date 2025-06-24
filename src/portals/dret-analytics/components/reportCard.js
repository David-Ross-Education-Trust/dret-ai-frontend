import React from "react";
import { Sparkles } from "lucide-react"; // optional

export default function ReportCard({ report, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4 pt-3 h-[150px] flex flex-col justify-start ${
        report.comingSoon ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="flex flex-col gap-0 mb-10 mt-1">
        <h3 className="text-base font-bold pr-8 leading-tight">{report.name || "Coming Soon"}</h3>
        <p className="text-[13px] text-gray-500 font-normal leading-snug mt-2">{report.description || ""}</p>
      </div>
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 text-xs items-center">
        {report.category && !report.comingSoon && (
          <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
            {report.category}
          </span>
        )}
        {report.tag === "New" && (
          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            New
          </span>
        )}
        {report.comingSoon && (
          <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-medium">
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );
}
