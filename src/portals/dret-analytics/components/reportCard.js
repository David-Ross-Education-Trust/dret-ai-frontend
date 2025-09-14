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

export default function ReportCard({
  report,
  isFavourite,
  onFavourite,
  onClick,
  clickedStar,
  disabled,
  layoutSizePx,
  subtle = true,
}) {
  const {
    titleSize,
    descSize,
    titleClamp,
    descClamp,
    paddingClass,
    paddingStyle,
    gapY,
    footerPadTop,
    minH,
    chipText,
    chipPadding,
    tagPadding,
  } = useMemo(() => {
    const size = Number(layoutSizePx) || 240;
    const cosy = size >= 260;

    return {
      titleSize: cosy ? "text-[16px]" : "text-[15px]",
      descSize: cosy ? "text-[13px]" : "text-[12px]",
      titleClamp: cosy ? 2 : 1,
      descClamp: cosy ? 2 : 1,
      paddingClass: "p-4",
      paddingStyle: { padding: cosy ? 18 : 14 },
      gapY: cosy ? "gap-3" : "gap-2",
      footerPadTop: cosy ? "pt-3" : "pt-2",
      minH: cosy ? 132 : 120,
      chipText: cosy ? "text-xs" : "text-[11px]",
      chipPadding: cosy ? "px-3 py-1" : "px-2.5 py-0.5",
      tagPadding: cosy ? "px-2 py-1" : "px-2 py-0.5", // smaller in compact
    };
  }, [layoutSizePx]);

  const clamp = (lines) => ({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: String(lines),
    overflow: "hidden",
  });

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
        paddingClass,
        disabled ? "opacity-50 pointer-events-none" : "",
      ].join(" ")}
      style={{ ...paddingStyle, minHeight: minH }}
    >
      {/* Favourite star */}
      {typeof onFavourite === "function" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavourite(report.id || report.name);
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full transition transform hover:scale-110 focus:scale-105 focus:outline-none"
          aria-label={isFavourite ? "Unfavourite" : "Favourite"}
          type="button"
        >
          <Star
            className={`w-[18px] h-[18px] ${isFavourite ? "text-yellow-400" : "text-gray-300"} ${
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
          style={{ ...clamp(titleClamp), fontFamily: "system-ui, sans-serif" }}
          title={report.name}
        >
          {report.name}
        </h3>

        {report.description && (
          <p
            className={`${descSize} text-gray-600 leading-snug`}
            style={{ ...clamp(descClamp), fontFamily: "system-ui, sans-serif" }}
            title={report.description}
          >
            {report.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className={`mt-auto ${footerPadTop} border-t border-gray-100`}>
        <div className="flex items-center justify-between pt-2">
          {/* Left: tags (moved slightly lower via pt-0.5) */}
          <div className="flex items-center gap-1.5 pt-0.5">
            {report.tag === "New" && (
              <span
                className={`${chipText} bg-green-50 text-green-800 ${tagPadding} rounded-full font-medium flex items-center gap-1`}
              >
                <Sparkles className="w-3 h-3" />
                New
              </span>
            )}
            {report.tag === "Hot" && (
              <span
                className={`${chipText} bg-red-50 text-red-600 ${tagPadding} rounded-full font-medium flex items-center gap-1`}
              >
                <Flame className="w-3 h-3" />
                Hot
              </span>
            )}
          </div>

          {/* Right: categories */}
          <div className={`flex items-center gap-2 ${chipText}`}>
            {Array.isArray(report.category)
              ? report.category
                  .filter((c) => categoryColors[c])
                  .map((cat) => (
                    <span
                      key={cat}
                      className={`${chipPadding} rounded-full font-medium ${
                        categoryColors[cat] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {cat}
                    </span>
                  ))
              : categoryColors[report.category] && (
                  <span
                    className={`${chipPadding} rounded-full font-medium ${
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
