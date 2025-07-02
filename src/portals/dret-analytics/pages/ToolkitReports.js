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
      <div className="font-sans bg-gray-50 min-h-screen h-screen flex flex-col">
        {/* Heading */}
        <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-8 h-24 flex items-center border-b border-gray-200">
          <h1 className="text-2xl font-bold" style={{ color: "#205c40" }}>
            Toolkit
          </h1>
        </div>
        {/* Report Grid */}
        <div className="flex-1 overflow-y-auto p-8">
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
      </div>
    </AnalyticsLayout>
  );
}
