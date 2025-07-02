import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnalyticsLayout from "../components/layout";
import { toolkitConfig } from "../components/ToolkitConfig";
import ToolkitReportCard from "../components/ToolkitReportCard";

export default function ToolkitReports() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // Show all toolkit reports (optionally filter out comingSoon)
  const toolkitReports = toolkitConfig.filter(
    (r) =>
      !r.comingSoon &&
      (
        searchTerm.trim() === "" ||
        (r.name && r.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
  );

  const TRUST_GREEN = "#205c40";

  return (
    <AnalyticsLayout>
      <div
        className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir"
        style={{
          fontFamily:
            "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* --- Top Bar (Heading + Search) --- */}
        <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-8 h-24 flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: TRUST_GREEN }}>
            Education Toolkit
          </h1>
          <div className="relative flex-shrink-0 w-[240px] ml-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search toolkit reports"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-full border ${
                searchFocused ? "" : "border-gray-300"
              } rounded-md px-4 py-2 pr-10 text-sm outline-none transition`}
              style={{
                borderColor: searchFocused ? TRUST_GREEN : undefined,
                boxShadow: searchFocused
                  ? `0 0 0 2px ${TRUST_GREEN}40`
                  : undefined,
                fontFamily: "AvenirLTStdLight, Avenir, sans-serif"
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-9 top-2.5 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                <X size={16} />
              </button>
            )}
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        {/* --- End Top Bar --- */}

        {/* --- Report Grid --- */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {toolkitReports.length === 0 ? (
              <div className="col-span-full text-gray-500 italic text-center">
                No toolkit reports available{searchTerm ? " for this search." : " yet."}
              </div>
            ) : (
              toolkitReports.map((report, idx) => {
                const CardComponent = report.cardComponent || ToolkitReportCard;
                return (
                  <CardComponent
                    key={report.id || idx}
                    report={report}
                    onClick={() => navigate(report.href)}
                  />
                );
              })
            )}
          </div>
        </div>
        <style>
          {`
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #cbd5e1 transparent;
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #cbd5e1;
              border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: #94a3b8;
            }
          `}
        </style>
      </div>
    </AnalyticsLayout>
  );
}
