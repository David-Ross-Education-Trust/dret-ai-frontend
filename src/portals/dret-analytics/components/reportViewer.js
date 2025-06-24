import React from "react";
import { useParams } from "react-router-dom";
import { reportConfigs } from "../reports/reportConfigs";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import AnalyticsLayout from "../components/layout";

export default function ReportViewer() {
  const { category, reportId } = useParams();

  const key = `${category}-${reportId}`;
  const reportConfig = reportConfigs[key];

  if (!reportConfig) {
    return (
      <AnalyticsLayout>
        <div className="p-8 text-red-600">Report not found.</div>
      </AnalyticsLayout>
    );
  }

  return (
    <AnalyticsLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-8">{reportConfig.reportName}</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <PowerBIEmbed
            embedConfig={{
              type: "report",
              id: reportConfig.reportId,
              embedUrl: reportConfig.embedUrl,
              accessToken: reportConfig.accessToken,
              tokenType: models.TokenType.Embed,
              settings: {
                panes: { filters: { visible: false }, pageNavigation: { visible: true } },
                background: models.BackgroundType.Transparent,
              },
            }}
            cssClassName="w-full h-[80vh]"
            getEmbeddedComponent={(embeddedReport) => {
              // Optionally, do something with embeddedReport here
            }}
          />
        </div>
      </div>
    </AnalyticsLayout>
  );
}