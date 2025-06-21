import React from "react";
import { Star, Flame, Sparkles } from "lucide-react";

export default function ToolCard({
  tool,
  isFavourite,
  onFavourite,
  onClick,
  clickedStar,
  disabled,
}) {
  return (
    <div
      onClick={!disabled ? () => onClick(tool) : undefined}
      className={`relative rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4 pt-3 h-[150px] flex flex-col justify-start ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <button
        onClick={e => {
          e.stopPropagation();
          onFavourite(tool.name);
        }}
        className="absolute top-3 right-3 p-2 rounded-full group transition z-20"
        aria-label={isFavourite ? "Unfavourite" : "Favourite"}
        tabIndex={0}
        type="button"
      >
        <Star
          className={`w-5 h-5 transition-transform duration-300 ${
            isFavourite ? "text-yellow-400" : "text-gray-300"
          } opacity-80 ${clickedStar === tool.name ? "scale-125 animate-ping-once" : ""}`}
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
      <div className="flex flex-col gap-0 mb-10 mt-1">
        <h3 className="text-base font-bold pr-8 leading-tight">{tool.name}</h3>
        <p className="text-[13px] text-gray-500 font-normal leading-snug mt-2">{tool.description}</p>
      </div>
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 text-xs items-center">
        {tool.category && (
          <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
            {tool.category}
          </span>
        )}
        {tool.tag === "Hot" && (
          <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <Flame className="w-3 h-3" />
            Hot
          </span>
        )}
        {tool.tag === "New" && (
          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            New
          </span>
        )}
      </div>
    </div>
  );
}