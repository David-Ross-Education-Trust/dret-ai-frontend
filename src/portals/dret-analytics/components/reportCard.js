import React from "react";
import { Flame, Sparkles } from "lucide-react";

const categoryColors = {
  Education: "bg-blue-50 text-blue-800",
  Operations: "bg-green-50 text-green-800",
  HR: "bg-yellow-50 text-yellow-800",
  Finance: "bg-red-50 text-red-800",
  "IT & Data": "bg-purple-50 text-purple-800",
  // ...add more as needed
};

const tagStyles = {
  Hot: "bg-red-50 text-red-600",
  New: "bg-green-50 text-green-800",
};

export default function ReportCard({ report, onClick, disabled }) {
  return (
    <div
      onClick={!disabled ? () => onClick(report) : undefined}
      className={`relative rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4 pt-3 h-[150px] flex flex-col justify-start ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="flex flex-col gap-0 mb-10 mt-1">
        <h3
          className="text-base font-bold pr-8 leading-tight"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          {report.name}
        </h3>
        <p
          className="text-[13px] text-gray-500 font-normal leading-snug mt-2"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          {report.description}
        </p>
      </div>
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 text-xs items-center">
        {report.tag === "New" && (
          <span className={`${tagStyles.New} px-2 py-0.5 rounded-full font-medium flex items-center gap-1`}>
            <Sparkles className="w-3 h-3" />
            New
          </span>
        )}
        {report.category && (
          <span
            className={`px-3 py-1 rounded-full font-medium ${categoryColors[report.category] || "bg-gray-100 text-gray-600"}`}
          >
            {report.category}
          </span>
        )}
        {report.tag === "Hot" && (
          <span className={`${tagStyles.Hot} px-2 py-0.5 rounded-full font-medium flex items-center gap-1`}>
            <Flame className="w-3 h-3" />
            Hot
          </span>
        )}
      </div>
    </div>
  );
}
