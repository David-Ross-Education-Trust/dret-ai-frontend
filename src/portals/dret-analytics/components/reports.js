import React from "react";
import { useParams } from "react-router-dom";
import ReportViewer from "../components/ReportViewer";
import { reportConfigs } from "./reportConfigs";
import AnalyticsLayout from "../components/layout"; // or whatever your layout is called

export default function ReportPage() {
  const { category, reportId } = useParams();
  const configKey = `${category}-${reportId}`;
  const config = reportConfigs[configKey];

  if (!config) return (
    <AnalyticsLayout>
      <div className="p-8 text-red-700 font-semibold">
        Report not found.
      </div>
    </AnalyticsLayout>
  );

  return (
    <AnalyticsLayout>
      <ReportViewer {...config} />
    </AnalyticsLayout>
  );
}