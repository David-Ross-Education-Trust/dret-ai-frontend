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
  layoutSizePx,         // optional: page can hint size, but defaults are lean
  subtle = true,        // default to lighter shadow everywhere
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
    catPad,
    tagPad,
    iconSize,
  } = useMemo(() => {
    // Smaller default than before for consistent lean cards
    const size = Number(layoutSizePx) || 240;    // ← default compact-ish
    const cosy = size >= 260;                    // gentle upscale threshold

    // Tailwind has no p-4.5; use inline style when needed
    const wantP = cosy ? 18 : 14;                // 18px vs 14px padding

    return {
      titleSize: cosy ? "text-[16px]" : "text-[15px]",
      descSize: cosy ? "text-[12.5px]" : "text-[12px]",
      titleClamp: cosy ? 2 : 1,
      descClamp: cosy ? 2 : 1,
      paddingClass: "p-4",                       // base; we’ll override with inline when cosy
      paddingStyle: { padding: wantP },
      gapY: cosy ? "gap-2.5" : "gap-2",
      footerPadTop: cosy ? "pt-2.5" : "pt-2",
      minH: cosy ? 128 : 118,

      // 🔽 scalable chip sizes (category + New/Hot)
      chipText: cosy ? "text-xs" : "text-[11px]",
      catPad: cosy ? "px-3 py-1" : "px-2 py-0.5",
      tagPad: cosy ? "px-2 py-1" : "px-2 py-0.5",
      iconSize: cosy ? 12 : 11, // Sparkles/Flame icon
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
      {/* Favourite */}
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

      {/* Footer (spacing exactly as your snippet) */}
      <div className={`mt-auto ${footerPadTop} border-t border-gray-100`}>
        <div className="flex items-center justify-between pt-2">
          {/* Left: tags (scaled) */}
          <div className={`flex items-center gap-1.5 ${chipText}`}>
            {report.tag === "New" && (
              <span
                className={`${tagStyles.New} ${tagPad} rounded-full font-medium flex items-center gap-1`}
              >
                <Sparkles style={{ width: iconSize, height: iconSize }} />
                New
              </span>
            )}
            {report.tag === "Hot" && (
              <span
                className={`${tagStyles.Hot} ${tagPad} rounded-full font-medium flex items-center gap-1`}
              >
                <Flame style={{ width: iconSize, height: iconSize }} />
                Hot
              </span>
            )}
          </div>

          {/* Right: category chip(s) (scaled) */}
          <div className={`flex items-center gap-1.5 ${chipText}`}>
            {Array.isArray(report.category)
              ? report.category
                  .filter((c) => categoryColors[c])
                  .map((cat) => (
                    <span
                      key={cat}
                      className={`${catPad} rounded-full font-medium ${
                        categoryColors[cat] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {cat}
                    </span>
                  ))
              : categoryColors[report.category] && (
                  <span
                    className={`${catPad} rounded-full font-medium ${
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
