export default function ToolkitReportCard({
  report,
  isFavourite,
  onFavourite,
  onClick,
  clickedStar,
  disabled,
  showSourcePrefix = false, // new prop with default
}) {
  const displayName = showSourcePrefix && report.sourceToolkit
    ? `${report.sourceToolkit} – ${report.name}`
    : report.name;

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
      {typeof onFavourite === "function" && (
        <button
          onClick={e => {
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

      <div className="flex flex-col items-center justify-center flex-1 w-full h-full">
        {report.logoUrl && (
          <img
            src={report.logoUrl}
            alt={`${report.name} logo`}
            className="w-20 h-20 object-contain mb-3"
            style={{ maxWidth: "90%", maxHeight: "90%" }}
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
          {displayName}
        </div>
      </div>
    </div>
  );
}
