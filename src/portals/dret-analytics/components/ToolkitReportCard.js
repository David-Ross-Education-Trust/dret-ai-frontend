import React from "react";

export default function ToolkitReportCard({ report, onClick }) {
  return (
    <div
      onClick={() => onClick && onClick(report)}
      className={`
        bg-trust-green rounded-xl shadow-md hover:shadow-lg
        transition-all cursor-pointer flex flex-col items-center justify-center
        aspect-square w-full min-w-[140px] min-h-[140px] max-w-[220px] max-h-[220px] 
        border border-gray-100 relative
      `}
    >
      {report.logoUrl && (
        <img
          src={report.logoUrl}
          alt={`${report.name} logo`}
          className="w-24 h-24 object-contain mb-3" // Increased size!
        />
      )}
      <div
        className="text-sm text-center px-2 font-normal text-white"
        style={{
          fontFamily: "system-ui, sans-serif",
          fontWeight: 400,
        }}
      >
        {report.name}
      </div>
    </div>
  );
}
