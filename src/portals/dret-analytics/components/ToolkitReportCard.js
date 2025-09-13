import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MoreVertical } from "lucide-react";

const CUSTOM_SCHEME_RE =
  /^(ms-(excel|word|powerpoint|project|access|onenote|visio|office):|mailto:|tel:)/i;

export default function ToolkitReportCard({
  report,
  isFavourite,
  onFavourite,
  onClick,
  clickedStar,
  disabled,
  showSourcePrefix = false,
  showMoreMenu = false,
  size = "medium", // "compact" | "small" | "medium" | "large" (compact alias provided)
  subtle = false,   // reduce shadow/border for a calmer grid
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const displayName =
    showSourcePrefix && report?.sourceToolkit
      ? `${report?.name} - ${report?.sourceToolkit}`
      : report?.name;

  useEffect(() => {
    if (!showMoreMenu) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMoreMenu]);

  const handleCardClick = (e) => {
    if (disabled) return;
    const href = report?.href;
    if (href) {
      if (CUSTOM_SCHEME_RE.test(href)) {
        e.preventDefault();
        window.location.assign(href); // same-tab; avoids blank tab
        return;
      }
      if (/^https?:\/\//i.test(href)) {
        if (typeof onClick === "function") onClick(report);
        else window.open(href, "_blank", "noopener,noreferrer");
        return;
      }
      if (typeof onClick === "function") onClick(report);
      else navigate(href);
      return;
    }
    if (typeof onClick === "function") onClick(report);
  };

  const browserHref = report?.openInBrowserHref || report?.openInBrowserUrl;

  // Size presets
  const resolvedSize = size === "compact" ? "small" : size;
  const sizeClasses =
    resolvedSize === "small"
      ? "min-w-[110px] min-h-[110px] max-w-[160px] max-h-[160px]"
      : resolvedSize === "large"
      ? "min-w-[160px] min-h-[160px] max-w-[240px] max-h-[240px]"
      : "min-w-[120px] min-h-[120px] max-w-[180px] max-h-[180px]"; // medium

  const chromeClasses = subtle
    ? "border border-gray-200 shadow-sm hover:shadow-md"
    : "border border-gray-100 shadow-md hover:shadow-lg";

  return (
    <div
      onClick={handleCardClick}
      className={`
        bg-white rounded-xl ${chromeClasses}
        transition-all cursor-pointer flex flex-col items-center justify-center
        aspect-square w-full ${sizeClasses}
        relative ${disabled ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      {/* Three dots menu - TOP LEFT */}
      {showMoreMenu && (
        <div className="absolute top-3 left-3 z-20" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition"
            type="button"
            aria-label="More"
          >
            <MoreVertical size={16} />
          </button>

          <div
            className={`absolute left-0 top-8 w-44 bg-white border border-gray-200 shadow-md rounded-md z-30 transform transition duration-150 ease-out ${
              menuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 disabled:text-gray-300"
              onClick={() => {
                setMenuOpen(false);
                if (browserHref) window.open(browserHref, "_blank", "noopener,noreferrer");
              }}
              type="button"
              disabled={!browserHref}
            >
              Open in browser
            </button>
          </div>
        </div>
      )}

      {/* Star/favourite icon - TOP RIGHT */}
      {typeof onFavourite === "function" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavourite(report?.id || report?.name);
          }}
          className="absolute top-3 right-3 p-2 rounded-full group transition z-20"
          aria-label={isFavourite ? "Unfavourite" : "Favourite"}
          tabIndex={0}
          type="button"
        >
          <Star
            className={`w-5 h-5 transition-transform duration-300 ${
              isFavourite ? "text-yellow-400" : "text-gray-300"
            } opacity-80`}
            strokeWidth={1.5}
            fill={isFavourite ? "#fde047" : "none"}
          />
        </button>
      )}

      {/* Main card content */}
      <div className="flex flex-col items-center justify-center flex-1 w-full h-full relative">
        {report?.logoUrl && (
          <img
            src={report.logoUrl}
            alt={`${report?.name} logo`}
            className="w-16 h-16 object-contain mb-3"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        )}
        <div
          className="text-sm text-center px-2 font-normal text-gray-900 font-avenir"
          style={{
            fontFamily: "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif",
            fontWeight: 400,
            lineHeight: 1.2,
            wordBreak: "break-word",
            marginTop: 2,
          }}
        >
          {displayName}
        </div>
      </div>
    </div>
  );
}
