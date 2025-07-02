import React from "react";

export default function ToolkitReportCard({ report, onClick }) {
  return (
    <div
      onClick={() => onClick && onClick(report)}
      className={`
        bg-white rounded-xl shadow-md hover:shadow-lg
        transition-all cursor-pointer flex flex-col items-center justify-center
        aspect-square w-full min-w-[140px] min-h-[140px] max-w-[220px] max-h-[220px] 
        border border-gray-100 relative
      `}
    >
      {/* 
        The 'flex-1' and 'justify-center' here ensure that the logo/text group
        stays vertically centered in the square card, regardless of text wrapping.
      */}
      <div className="flex flex-col items-center justify-center flex-1 w-full h-full">
        {report.logoUrl && (
          <img
            src={report.logoUrl}
            alt={`${report.name} logo`}
            className="w-28 h-28 object-contain mb-3" // Large logo!
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        )}
        <div
          className="text-sm text-center px-2 font-normal text-gray-900"
          style={{
            fontFamily: "system-ui, sans-serif",
            fontWeight: 400,
            lineHeight: 1.2,
            marginTop: 2,
            wordBreak: "break-word"
          }}
        >
          {report.name}
        </div>
      </div>
    </div>
  );
}
