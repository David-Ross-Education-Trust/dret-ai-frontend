import React from "react";
import { Star, Flame, Sparkles } from "lucide-react";

const categoryColors = {
  Education: "bg-blue-50 text-blue-800",
  Operations: "bg-green-50 text-green-800",
  HR: "bg-yellow-50 text-yellow-800",
  Finance: "bg-red-50 text-red-800",
  "IT & Data": "bg-purple-50 text-purple-800",
};

const tagStyles = {
  Hot: "bg-red-50 text-red-600",
  New: "bg-green-50 text-green-800",
};

export default function ReportCard({
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
        ${disabled ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      {/* Favourite/star button */}
      {typeof onFavourite === "function" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavourite(report.id || report.name);
          }}
          className="absolute top-3 right-3 p-2 rounded-full group transition z-20"
          aria-label={isFavourite ? "Unfavourite" : "Favourite"}
          tabIndex={0}
          type="button"
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
            onMouseEnter={(e) => {
              if (!isFavourite) {
                e.currentTarget.style.fill = "#fde047";
                e.currentTarget.style.opacity = "1";
              }
            }}
            onMouseLeave={(e) => {
              if (!isFavourite) {
                e.currentTarget.style.fill = "none";
                e.currentTarget.style.opacity = "0.8";
              }
            }}
          />
        </button>
      )}

      {/* Main card content, centered */}
      <div className="flex flex-col items-center justify-center flex-1 w-full h-full px-4 pt-4">
        <h3
          className="text-base font-bold text-center leading-tight mb-1"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          {report.name}
        </h3>
        <p
          className="text-[13px] text-gray-500 text-center font-normal leading-snug"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          {report.description}
        </p>
      </div>

      {/* Tags */}
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 text-xs items-center">
        {report.tag === "New" && (
          <span className={`${tagStyles.New} px-2 py-0.5 rounded-full font-medium flex items-center gap-1`}>
            <Sparkles className="w-3 h-3" />
            New
          </span>
        )}
        {Array.isArray(report.category)
          ? report.category.map(
              (cat) =>
                categoryColors[cat] && (
                  <span
                    key={cat}
                    className={`px-3 py-1 rounded-full font-medium ${categoryColors[cat]}`}
                  >
                    {cat}
                  </span>
                )
            )
          : categoryColors[report.category] && (
              <span
                className={`px-3 py-1 rounded-full font-medium ${categoryColors[report.category]}`}
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
