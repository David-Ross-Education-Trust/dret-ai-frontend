import React, { useState, useEffect, useRef, useMemo } from "react";
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
  subtle = true,
  layoutSizePx = 160,
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
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
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
        window.location.assign(href);
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

  const chromeClasses = subtle
    ? "border border-gray-200 shadow-sm hover:shadow-md"
    : "border border-gray-100 shadow-md hover:shadow-lg";

  // --- responsive sizing tuned for small squares ---
  const sizing = useMemo(() => {
    const s = Number(layoutSizePx) || 160;
    if (s <= 140) {
      return {
        titlePx: 13,
        clamp: 1,
        logo: Math.round(s * 0.33),
        padX: 8,
        starPad: "p-1.5",
        starPos: "top-1.5 right-1.5",
      };
    }
    if (s <= 160) {
      return {
        titlePx: 14,
        clamp: 1,
        logo: Math.round(s * 0.34),
        padX: 10,
        starPad: "p-2",
        starPos: "top-2 right-2",
      };
    }
    if (s <= 189) {
      return {
        titlePx: 15,
        clamp: 1,
        logo: Math.round(s * 0.35),
        padX: 12,
        starPad: "p-2",
        starPos: "top-3 right-3",
      };
    }
    // cosy and up
    return {
      titlePx: 16,
      clamp: 2,
      logo: Math.round(s * 0.38),
      padX: 12,
      starPad: "p-2",
      starPos: "top-3 right-3",
    };
  }, [layoutSizePx]);

  const clampStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: String(sizing.clamp),
    overflow: "hidden",
    hyphens: "auto",
    wordBreak: "break-word",
  };

  return (
    <div
      onClick={handleCardClick}
      className={`bg-white rounded-xl ${chromeClasses}
        transition-all cursor-pointer flex flex-col items-center justify-center
        relative ${disabled ? "opacity-50 pointer-events-none" : ""}`}
      style={{ width: layoutSizePx, height: layoutSizePx }}
    >
      {/* More menu */}
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

      {/* Favourite */}
      {typeof onFavourite === "function" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavourite(report?.id || report?.name);
          }}
          className={`absolute ${sizing.starPos} ${sizing.starPad} rounded-full group transition z-20`}
          aria-label={isFavourite ? "Unfavourite" : "Favourite"}
          tabIndex={0}
          type="button"
        >
          <Star
            className={`w-5 h-5 transition-transform duration-300 ${
              isFavourite ? "text-yellow-400" : "text-gray-300"
            } opacity-80 ${
              clickedStar === (report?.id || report?.name) ? "scale-125 animate-ping-once" : ""
            }`}
            strokeWidth={1.5}
            fill={isFavourite ? "#fde047" : "none"}
          />
        </button>
      )}

      {/* Content */}
      <div
        className="flex flex-col items-center justify-center w-full h-full"
        style={{ paddingLeft: sizing.padX, paddingRight: sizing.padX }}
      >
        {report?.logoUrl && (
          <img
            src={report.logoUrl}
            alt={`${report?.name} logo`}
            className="object-contain mb-3"
            style={{
              width: sizing.logo,
              height: sizing.logo,
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        )}
        <div
          className="text-center font-semibold text-gray-900"
          style={{
            ...clampStyle,
            lineHeight: 1.15,
            fontFamily: "system-ui, sans-serif",
            fontSize: sizing.titlePx,
          }}
          title={displayName}
        >
          {displayName}
        </div>
      </div>
    </div>
  );
}
