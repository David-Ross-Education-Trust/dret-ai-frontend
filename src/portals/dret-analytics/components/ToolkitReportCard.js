import React from "react";

export default function ToolkitReportCard({ report, onClick }) {
  return (
    <div
      onClick={() => onClick && onClick(report)}
      className={`
        bg-[var(--trust-green-light,#e5f6ee)] rounded-xl shadow-md hover:shadow-lg
        transition-all cursor-pointer flex flex-col items-center justify-center
        aspect-square w-full min-w-[140px] min-h-[140px] max-w-[220px] max-h-[220px] 
        border border-gray-100 relative
      `}
    >
      {/* Logo if available */}
      {report.logoUrl && (
        <img
          src={report.logoUrl}
          alt={`${report.name} logo`}
          className="w-20 h-20 object-contain mb-3"
        />
      )}
      {/* School/report name */}
      <div
        className="text-sm text-center px-2 font-normal"
        style={{
          fontFamily: "system-ui, sans-serif",
          fontWeight: 400, // Ensure not bold
        }}
      >
        {report.name}
      </div>
    </div>
  );
}
