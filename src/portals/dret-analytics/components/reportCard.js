import React, { useMemo } from "react";
import { Star, Flame, Sparkles } from "lucide-react";
import dretStar from "../../../assets/icon.png";
import bromcomLogo from "../../../assets/bromcom.png";

const SHOW_DECORATIVE_STAR = true;

const categoryColors = {
  Education: "bg-blue-50 text-blue-800",
  DRET: "bg-green-50 text-green-800",
  Bromcom: "bg-blue-50 text-blue-800",
  Governance: "bg-indigo-50 text-indigo-800",
  Operations: "bg-green-50 text-green-800",
  HR: "bg-yellow-50 text-yellow-800",
  Finance: "bg-red-50 text-red-800",
  "IT & Data": "bg-purple-50 text-purple-800",
  "Data Protection": "bg-teal-50 text-teal-800",
};

const tagStyles = {
  Hot: "bg-red-50 text-red-600",
  New: "bg-green-50 text-green-800",
  Demo: "bg-gray-50 text-gray-700 border border-gray-200",
};

const SECTION_LABELS = new Set([
  "DRET",
  "Education",
  "Bromcom",
  "Governance",
  "Operations",
  "Finance",
  "HR",
  "IT & Data",
  "Data Protection",
]);

function getPrimarySectionLabel(report) {
  const cats = Array.isArray(report?.category)
    ? report.category.filter(Boolean)
    : [report?.category].filter(Boolean);
  for (const c of cats) {
    if (SECTION_LABELS.has(c)) return c;
  }
  if (typeof report?.tag === "string" && SECTION_LABELS.has(report.tag)) {
    return report.tag;
  }
  return null;
}

function ReportCard({
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
    minH,
    chipText,
    catPad,
    tagPad,
    iconSize,
    contentBottomGapPx,
    cosy,
  } = useMemo(() => {
    const size = Number(layoutSizePx) || 240;
    const cosy = size >= 260;
    const wantP = cosy ? 18 : 14;
    return {
      titleSize: cosy ? "text-[16px]" : "text-[15px]",
      descSize: cosy ? "text-[12.5px]" : "text-[12px]",
      titleClamp: cosy ? 2 : 1,
      descClamp: cosy ? 4 : 2,
      paddingClass: "p-4",
      paddingStyle: { padding: wantP },
      gapY: cosy ? "gap-2.5" : "gap-2",
      minH: cosy ? 180 : 138,
      chipText: cosy ? "text-xs" : "text-[11px]",
      catPad: cosy ? "px-3 py-1" : "px-2 py-0.5",
      tagPad: cosy ? "px-2 py-1" : "px-2 py-0.5",
      iconSize: cosy ? 12 : 11,
      contentBottomGapPx: cosy ? 36 : 34,
      cosy,
    };
  }, [layoutSizePx]);

  const clamp = (lines) => ({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: String(lines),
    overflow: "hidden",
  });

  const tagLower = typeof report?.tag === "string" ? report.tag.toLowerCase() : "";
  const isDemo = report?.demo === true || tagLower === "demo" || tagLower === "demo".toLowerCase();
  const isNewTag = tagLower === "new";
  const isHotTag = tagLower === "hot";

  const cornerStarSize = cosy ? 140 : 110;
  const cornerOffset = cosy ? -56 : -44;

  const sectionLabel = getPrimarySectionLabel(report);
  const decorativeLogo = sectionLabel === "Bromcom" ? bromcomLogo : dretStar;
  const showDecorative = SHOW_DECORATIVE_STAR && !!sectionLabel;

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
        "relative rounded-xl bg-white overflow-hidden font-avenir",
        subtle
          ? "border border-gray-200 shadow-md hover:shadow-lg"
          : "border border-gray-100 shadow-md hover:shadow-xl",
        "transition-shadow duration-200",
        "cursor-pointer flex flex-col",
        "group",
        paddingClass,
        disabled ? "opacity-50 pointer-events-none" : "",
      ].join(" ")}
      style={{ ...paddingStyle, minHeight: minH }}
    >
      {showDecorative && (
        <img
          loading="lazy"
          decoding="async"
          src={decorativeLogo}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-200"
          style={{
            width: cornerStarSize,
            height: cornerStarSize,
            right: cornerOffset,
            bottom: cornerOffset,
            transform: "rotate(0deg)",
            zIndex: 0,
          }}
        />
      )}

      {typeof onFavourite === "function" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavourite(report.id || report.name);
          }}
          className="absolute top-3 right-3 p-0 w-[22px] h-[22px] flex items-center justify-center rounded-full focus:outline-none z-10"
          aria-label={isFavourite ? "Unfavourite" : "Favourite"}
          aria-pressed={isFavourite}
          title={isFavourite ? "Unfavourite" : "Favourite"}
          type="button"
        >
          <Star
            className={`w-[22px] h-[22px] ${
              isFavourite ? "text-yellow-400" : "text-gray-300"
            } ${
              clickedStar === (report.id || report.name)
                ? "scale-125 animate-ping-once"
                : ""
            }`}
            strokeWidth={1.5}
            fill={isFavourite ? "#fde047" : "none"}
          />
        </button>
      )}

      <div
        className={`relative z-10 flex flex-col ${gapY} pr-8 mb-8`}
        style={{ marginBottom: contentBottomGapPx }}
      >
        <h3
          className={`${titleSize} font-semibold leading-snug text-gray-900 font-avenir`}
          style={{ ...clamp(titleClamp) }}
          title={report.name}
        >
          {report.name}
        </h3>
        {report.description && (
          <p
            className={`${descSize} text-gray-600 leading-snug font-avenir`}
            style={{ ...clamp(descClamp) }}
            title={report.description}
          >
            {report.description}
          </p>
        )}
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-10">
        <div className={`flex flex-wrap gap-2 ${chipText}`}>
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

          {isDemo && (
            <span className={`${tagStyles.Demo} ${tagPad} rounded-full font-semibold uppercase tracking-wide`}>
              Demo
            </span>
          )}
          {isNewTag && (
            <span className={`${tagStyles.New} ${tagPad} rounded-full font-medium flex items-center gap-1`}>
              <Sparkles style={{ width: iconSize, height: iconSize }} />
              New
            </span>
          )}
          {isHotTag && (
            <span className={`${tagStyles.Hot} ${tagPad} rounded-full font-medium flex items-center gap-1`}>
              <Flame style={{ width: iconSize, height: iconSize }} />
              Hot
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ReportCard);
