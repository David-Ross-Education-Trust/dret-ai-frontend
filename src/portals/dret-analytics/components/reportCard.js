import React, { useMemo } from "react";
import { Star, Flame, Sparkles } from "lucide-react";

const categoryColors = {
  Education: "bg-blue-50 text-blue-800",
  DRET: "bg-green-50 text-green-800",
  Bromcom: "bg-red-50 text-red-800",
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
  layoutSizePx,   // optional: dictates compact/cosy scaling
  subtle = false, // optional: lighter default shadow
}) {
  const {
    titleSize,
    descClamp,
    padding,
    gapY,
    footerPadTop,
  } = useMemo(() => {
    // Heuristics from container size
    const size = Number(layoutSizePx) || 280; // sensible default
    const cosy = size >= 280;
    return {
      titleSize: cosy ? "text-lg" : "text-base",
      descClamp: cosy ? 2 : 1,
      padding: cosy ? "p-5" : "p-4",
      gapY: cosy ? "gap-3" : "gap-2",
      footerPadTop: cosy ? "pt-3" : "pt-2",
    };
  }, [layoutSizePx]);

  // Description clamping style (no Tailwind plugin needed)
  const clampStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: String(descClamp),
    overflow: "hidden",
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={!disabled ? () => onClick?.(report) : undefined}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(report);
        }
      }}
      className={[
        "relative rounded-xl bg-white",
        subtle ? "shadow-sm hover:shadow-md" : "shadow-md hover:shadow-lg",
        "transition-shadow cursor-pointer",
        "flex flex-col",
        padding,
        disabled ? "opacity-50 pointer-events-none" : "",
      ].join(" ")}
      style={{ minHeight: 140 }}
    >
      {/* Favourite star */}
      {typeof onFavourite === "function" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavourite(report.id || report.name);
          }}
          className="absolute top-3 right-3 p-2 rounded-full transition transform hover:scale-110 focus:scale-105 focus:outline-none"
          aria-label={isFavourite ? "Unfavourite" : "Favourite"}
          type="button"
        >
          <Star
            className={`w-5 h-5 ${isFavourite ? "text-yellow-400" : "text-gray-300"} ${
              clickedStar === (report.id || report.name) ? "scale-125 animate-ping-once" : ""
            }`}
            strokeWidth={1.5}
            fill={isFavourite ? "#fde047" : "none"}
          />
        </button>
      )}

      {/* Content */}
      <div className={`flex flex-col ${gapY} pr-8`}>
        <h3
          className={`${titleSize} font-semibold leading-snug text-gray-900`}
          style={{ fontFamily: "system-ui, sans-serif" }}
          title={report.name}
        >
          {report.name}
        </h3>

        {report.description && (
          <p
            className="text-sm text-gray-600 leading-snug"
            style={{ ...clampStyle, fontFamily: "system-ui, sans-serif" }}
            title={report.description}
          >
            {report.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className={`mt-auto ${footerPadTop} border-t border-gray-100`}>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs">
            {report.tag === "New" && (
              <span className={`${tagStyles.New} px-2 py-0.5 rounded-full font-medium flex items-center gap-1`}>
                <Sparkles className="w-3 h-3" />
                New
              </span>
            )}
            {report.tag === "Hot" && (
              <span className={`${tagStyles.Hot} px-2 py-0.5 rounded-full font-medium flex items-center gap-1`}>
                <Flame className="w-3 h-3" />
                Hot
              </span>
            )}
          </div>

          {/* Category chips aligned right */}
          <div className="flex items-center gap-2 text-xs">
            {Array.isArray(report.category)
              ? report.category
                  .filter((c) => categoryColors[c])
                  .map((cat) => (
                    <span
                      key={cat}
                      className={`px-2.5 py-1 rounded-full font-medium ${
                        categoryColors[cat] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {cat}
                    </span>
                  ))
              : categoryColors[report.category] && (
                  <span
                    className={`px-2.5 py-1 rounded-full font-medium ${
                      categoryColors[report.category] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {report.category}
                  </span>
                )}
          </div>
        </div>
      </div>
    </div>
  );
}
