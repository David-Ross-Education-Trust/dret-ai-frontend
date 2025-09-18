import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MoreVertical } from "lucide-react";

const CUSTOM_SCHEME_RE = /^(ms-(excel|word|powerpoint|project|access|onenote|visio|office):|mailto:|tel:)/i;

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
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showMoreMenu]);

  const handleCardActivate = () => {
    if (disabled) return;
    const href = report?.href;
    if (!href) {
      if (typeof onClick === "function") onClick(report);
      return;
    }
    if (CUSTOM_SCHEME_RE.test(href)) {
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
  };

  const handleCardKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardActivate();
    }
  };

  const browserHref = report?.openInBrowserHref || report?.openInBrowserUrl;

  const chromeClasses = subtle
    ? "border border-gray-200 shadow-md hover:shadow-lg"
    : "border border-gray-100 shadow-md hover:shadow-xl";

  const logoSize = Math.round(layoutSizePx * 0.38);

  const nameFont = (() => {
    const s = Number(layoutSizePx) || 160;
    if (s <= 150) return Math.max(11, Math.round(s * 0.085));
    if (s <= 190) return Math.max(12, Math.round(s * 0.075));
    return Math.max(12, Math.round(s * 0.072));
  })();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardActivate}
      onKeyDown={handleCardKeyDown}
      className={[
        "bg-white rounded-xl",
        chromeClasses,
        "transition-shadow duration-200",
        "relative cursor-pointer",
        "flex flex-col items-center justify-center",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300",
        disabled ? "opacity-50 pointer-events-none" : "",
        "group",
      ].join(" ")}
      style={{ width: layoutSizePx, height: layoutSizePx }}
    >
      {showMoreMenu && (
        <div className="absolute top-3 left-3 z-20" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors"
            type="button"
            aria-label="More"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-controls={`menu-${report?.id || report?.name || "item"}`}
            title="More"
          >
            <MoreVertical size={16} />
          </button>

          <div
            id={`menu-${report?.id || report?.name || "item"}`}
            className={`absolute left-0 top-8 w-44 bg-white border border-gray-200 shadow-md rounded-md z-30 transform transition duration-150 ease-out ${
              menuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
            }`}
            onClick={(e) => e.stopPropagation()}
            role="menu"
          >
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 disabled:text-gray-300"
              onClick={() => {
                setMenuOpen(false);
                if (browserHref) window.open(browserHref, "_blank", "noopener,noreferrer");
              }}
              type="button"
              disabled={!browserHref}
              role="menuitem"
            >
              Open in browser
            </button>
          </div>
        </div>
      )}

      {typeof onFavourite === "function" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavourite(report?.id || report?.name);
          }}
          className={`absolute ${layoutSizePx <= 140 ? "top-1.5 right-1.5" : "top-3 right-3"} p-2 rounded-full group transition z-20`}
          aria-label={isFavourite ? "Unfavourite" : "Favourite"}
          aria-pressed={isFavourite}
          title={isFavourite ? "Unfavourite" : "Favourite"}
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

      <div className="flex-1 flex flex-col items-center justify-center w-full h-full px-2">
        {report?.logoUrl && (
          <img
            loading="lazy"
            decoding="async"
            draggable={false}
            src={report.logoUrl}
            alt={`${report?.name} logo`}
            className="object-contain mb-3 opacity-90 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              width: logoSize,
              height: logoSize,
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        )}
        <div
          className="text-center font-avenir text-gray-900"
          style={{
            fontSize: nameFont,
            lineHeight: 1.15,
            wordBreak: "break-word",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
          title={displayName}
        >
          {displayName}
        </div>
      </div>
    </div>
  );
}
