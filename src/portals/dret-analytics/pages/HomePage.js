import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnalyticsLayout from "../components/layout";
import { reportConfig } from "../components/reportConfig";
import ReportCard from "../components/reportCard";

const categories = [
  "Education",
  "Operations",
  "HR",
  "Finance",
  "IT & Data",
];

export default function AnalyticsHomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Education");
  const navigate = useNavigate();

  // Filter by category (like you do with AI tools)
  const filteredReports = reportConfig.filter(
    (r) =>
      !r.comingSoon &&
      r.category &&
      r.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <AnalyticsLayout>
      <div className="font-sans bg-gray-50 min-h-screen h-screen flex flex-col">
        {/* Top Category Bar */}
        <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-4 h-24 flex items-center">
          <div className="w-full flex gap-4">
            {categories.map((cat) => (
              <span
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 border rounded-full text-xs cursor-pointer transition-all text-center
                  ${selectedCategory === cat
                    ? "bg-trustgreen text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }`}
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
        {/* Report Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <h1 className="text-2xl font-bold mb-8">{selectedCategory} Reports</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.length === 0 ? (
              <div className="col-span-full text-gray-500 italic text-center">
                No reports available in this category yet.
              </div>
            ) : (
              filteredReports.map((report, idx) => (
                <ReportCard
                  key={report.id || idx}
                  report={report}
                  onClick={() => navigate(report.href)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </AnalyticsLayout>
  );
}