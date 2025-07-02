import React from "react";
import { useNavigate } from "react-router-dom";
import AnalyticsLayout from "../components/layout";
import { reportConfig } from "../components/reportConfig";
import ToolkitReportCard from "../components/ToolkitReportCard";

export default function ToolkitReports() {
  const navigate = useNavigate();

  // Only show Toolkit reports, and not comingSoon
  const toolkitReports = reportConfig.filter(
    (r) =>
      !r.comingSoon &&
      r.category &&
      r.category.toLowerCase() === "toolkit"
  );

  return (
    <AnalyticsLayout>
      <div
        className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir"
        style={{
          fontFamily:
            "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* Heading */}
        <div className="shrink-0 z-20 bg-gray-100/80 backdrop-blur-md shadow-sm px-8 h-24 flex items-center border-b border-gray-200">
          <h1 className="text-2xl font-bold" style={{ color: "#205c40" }}>
            Education Toolkit
          </h1>
        </div>
        {/* Report Grid */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {toolkitReports.length === 0 ? (
              <div className="col-span-full text-gray-500 italic text-center">
                No toolkit reports available yet.
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
