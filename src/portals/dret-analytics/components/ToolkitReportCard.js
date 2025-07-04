import React, { useState, useEffect, useRef } from "react";
import { Star, MoreVertical } from "lucide-react";

export default function ToolkitReportCard({
  report,
  isFavourite,
  onFavourite,
  onClick,
  clickedStar,
  disabled,
  showSourcePrefix = false,
  showMoreMenu = false,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const displayName =
    showSourcePrefix && report.sourceToolkit
      ? `${report.name} ${report.sourceToolkit}`
      : report.name;

  useEffect(() => {
    if (!showMoreMenu) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMoreMenu]);

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
      {/* Three dots menu - TOP LEFT */}
      {showMoreMenu && (
        <div className="absolute top-3 left-3 z-20" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition"
          >
            <MoreVertical size={16} />
          </button>

          <div
            className={`absolute left-0 top-8 w-40 bg-gray-50 border border-gray-200 shadow-md rounded-md z-30 transform transition duration-150 ease-out ${
              menuOpen
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => {
                setMenuOpen(false);
                if (report.openInBrowserHref) {
                  window.open(report.openInBrowserHref, "_blank");
                }
              }}
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
            } opacity-80 ${
              clickedStar === (report.id || report.name)
                ? "scale-125 animate-ping-once"
                : ""
            }`}
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

      {/* Main card content */}
      <div className="flex flex-col items-center justify-center flex-1 w-full h-full relative">
        {report.logoUrl && (
          <img
            src={report.logoUrl}
            alt={`${report.name} logo`}
            className={`object-contain mb-3 ${
              report.logoUrl.includes("excel-icon") ? "w-12 h-12" : "w-20 h-20"
            }`}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
            }}
          />
        )}
        <div
          className="text-sm text-center px-2 font-normal text-gray-900 font-avenir"
          style={{
            fontFamily:
              "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif",
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
