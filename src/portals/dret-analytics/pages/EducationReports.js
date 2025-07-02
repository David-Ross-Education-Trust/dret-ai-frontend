import React from "react";
import { useNavigate } from "react-router-dom";
import AnalyticsLayout from "../components/layout";
import { reportConfig } from "../components/reportConfig";
import ReportCard from "../components/reportCard"; // Ensure case matches your filename!

export default function EducationReports() {
  const navigate = useNavigate();

  // Only show Education reports, and not comingSoon
  const educationReports = reportConfig.filter(
    (r) =>
      !r.comingSoon &&
      r.category &&
      r.category.toLowerCase() === "education"
  );

  return (
    <AnalyticsLayout>
      <div className="font-sans bg-gray-50 min-h-screen h-screen flex flex-col">
        {/* Heading */}
        <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-8 h-24 flex items-center border-b border-gray-200">
          <h1 className="text-2xl font-bold" style={{ color: "#205c40" }}>
            Education Analytics
          </h1>
        </div>
        {/* Report Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationReports.length === 0 ? (
              <div className="col-span-full text-gray-500 italic text-center">
                No education reports available yet.
              </div>
            ) : (
              educationReports.map((report, idx) => (
                <ReportCard
                  key={report.id || idx}
                  report={report}
                  onClick={() => navigate(report.href)}
                  disabled={!!report.comingSoon}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </AnalyticsLayout>
  );
}
