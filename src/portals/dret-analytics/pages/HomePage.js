import React, { useState } from "react";
import AnalyticsLayout from "../components/layout";
import { Search, X } from "lucide-react";
// import { categories } from "../components/reports"; // Not needed if you're using your own below
import { useNavigate } from "react-router-dom";

// Add your own categories for analytics
const analyticsCategories = [
  "Education",
  "Operations",
  "HR",
  "Finance",
  "IT & Data",
];

export default function AnalyticsHomePage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Education");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // Dummy reports for demonstration
  const reports = [
    { id: "1", name: "Attendance Overview", category: "Education" },
    { id: "2", name: "Finance Summary 2024", category: "Finance" },
    { id: "3", name: "IT Ticket Trends", category: "IT & Data" },
    { id: "4", name: "Staff Satisfaction", category: "HR" },
    { id: "5", name: "Catering Spend", category: "Operations" },
  ];

  // Filter by selected category and search
  const filteredReports = reports.filter(
    (r) =>
      (selectedCategory ? r.category === selectedCategory : true) &&
      (searchTerm
        ? r.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true)
  );

  return (
    <AnalyticsLayout>
      {/* Top Bar */}
      <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-4 h-24 flex items-center">
        <div className="flex items-center gap-x-6 w-full max-w-5xl mx-auto">
          {/* Categories */}
          <div className="flex gap-2">
            {analyticsCategories.map((tag, idx) => (
              <span
                key={tag}
                onClick={() => setSelectedCategory(tag)}
                className={`px-4 py-1.5 border rounded-full text-xs cursor-pointer transition-all text-center
                  ${selectedCategory === tag
                    ? "bg-gray-400 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                  }`}
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Search bar on far right */}
          <div className="relative w-72 ml-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reports"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-full border ${
                searchFocused ? "" : "border-gray-300"
              } rounded-md px-4 py-2 pr-10 text-sm outline-none transition`}
              style={{
                borderColor: searchFocused ? "#205c40" : undefined,
                boxShadow: searchFocused
                  ? `0 0 0 2px #205c4040`
                  : undefined,
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-9 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-8">Analytics Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.length === 0 && (
            <div className="text-gray-500 col-span-full">
              No reports found in this category.
            </div>
          )}
          {filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => navigate(`/report/${report.id}`)}
              className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer hover:bg-green-100 border"
            >
              <span className="font-semibold">{report.name}</span>
            </div>
          ))}
        </div>
      </div>
    </AnalyticsLayout>
  );
}