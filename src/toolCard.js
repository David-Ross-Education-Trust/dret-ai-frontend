import React from "react";
import { Star, Flame, Sparkles } from "lucide-react";

export default function ToolCard({
  tool,
  isFavourite,
  onFavourite,
  onClick,
  clickedStar,
}) {
  return (
    <div
      onClick={onClick}
      className="relative rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4 h-[150px] flex flex-col justify-between"
    >
      <button
        onClick={e => {
          e.stopPropagation();
          onFavourite();
        }}
        className="absolute top-4 right-4 p-1 group"
        aria-label={isFavourite ? "Unfavourite" : "Favourite"}
      >
        <Star
          className={`w-6 h-6 stroke-2 transition-all duration-200
            ${isFavourite ? "text-yellow-400 fill-yellow-200" : "text-gray-300 group-hover:fill-yellow-100"}
            ${clickedStar ? "scale-125 animate-ping-once" : ""}`}
          fill={isFavourite ? "#fef9c3" : "none"}
        />
      </button>
      <div className="mt-2">
        <h3 className="text-lg font-extrabold text-gray-900 mb-2 antialiased pr-8 leading-tight">
          {tool.name}
        </h3>
        <p className="text-gray-500 text-[15px] font-medium leading-snug mb-7">
          {tool.description}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <span className="bg-green-100 text-green-700 font-semibold px-4 py-1 rounded-full text-xs">
          {tool.category}
        </span>
        {tool.tag === "New" && (
          <span className="bg-blue-100 text-blue-600 font-semibold px-4 py-1 rounded-full flex items-center gap-1 text-xs">
            <Sparkles className="w-4 h-4" /> New
          </span>
        )}
        {tool.tag === "Hot" && (
          <span className="bg-red-100 text-red-600 font-semibold px-4 py-1 rounded-full flex items-center gap-1 text-xs">
            <Flame className="w-4 h-4" /> Hot
          </span>
        )}
      </div>
    </div>
  );
}
