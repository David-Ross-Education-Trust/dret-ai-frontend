import React from "react";
import { Star } from "lucide-react";

export default function ToolkitReportCard({
  report,
  isFavourite,
  onFavourite,
  onClick,
  clickedStar,
  disabled,
}) {
  return (
    <div
      onClick={!disabled ? () => onClick && onClick(report) : undefined}
      className={`
        bg-white rounded-xl shadow-md hover:shadow-lg
        transition-all cursor-pointer flex flex-col items-center justify-center
        aspect-square w-full min-w-[140px] min-h-[140px] max-w-[220px] max-h-[220px]
        border border-gray-100 relative
        pt-8  // More space at top for the star
        overflow-visible  // Make sure star can't be clipped
        ${disabled ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      {/* Favourite/star button */}
      {typeof onFavourite === "function" && (
        <button
          onClick={e => {
            e.stopPropagation();
            onFavourite(report.id || report.name);
          }}
          className="absolute top-3 right-3 p-2 rounded-full group transition z-30 bg-white bg-opacity-80 hover:bg-opacity-100"
          aria-label={isFavourite ? "Unfavourite" : "Favourite"}
          tabIndex={0}
          type="button"
          style={{
            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.07)",
            backdropFilter: "blur(2px)",
          }}
        >
          <Star
            className={`w-5 h-5 transition-transform duration-300 ${
              isFavourite ? "text-yellow-400" : "text-gray-300"
            } opacity-80 ${clickedStar === (report.id || report.name) ? "scale-125 animate-ping-once" : ""}`}
            strokeWidth={1.5}
            fill={isFavourite ? "#fde047" : "none"}
            style={{
              fill: !isFavourite ? "none" : "#fde047",
              transition: "fill 0.2s",
            }}
            onMouseEnter={e => {
              if (!isFavourite) {
                e.currentTarget.style.fill = "#fde047";
                e.currentTarget.style.opacity = "1";
              }
            }}
            onMouseLeave={e => {
              if (!isFavourite) {
                e.currentTarget.style.fill = "none";
                e.currentTarget.style.opacity = "0.8";
              }
            }}
          />
        </button>
      )}
      {/* Main card content, always centered */}
      <div className="flex flex-col items-center justify-center flex-1 w-full h-full">
        {report.logoUrl && (
          <img
            src={report.logoUrl}
            alt={`${report.name} logo`}
            className="w-16 h-16 object-contain mb-2" // slightly smaller logo
            style={{ maxWidth: "80%", maxHeight: "80%" }}
          />
        )}
        <div
          className="text-sm text-center px-2 font-normal text-gray-900 font-avenir"
          style={{
            fontFamily: "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif",
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
