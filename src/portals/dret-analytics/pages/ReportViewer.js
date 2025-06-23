import React from "react";
import { useParams } from "react-router-dom";
import { categories } from "./data/reports";
import Layout from "./layout";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

function findReportById(reportId) {
  for (const cat of categories) {
    for (const report of cat.reports) {
      if (report.id === reportId) return report;
    }
  }
  return null;
}

export default function ReportViewer() {
  const { reportId } = useParams();
  const report = findReportById(reportId);

  if (!report) {
    return (
      <Layout>
        <div className="p-8">
          <h2 className="text-2xl font-bold">Report not found</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">{report.name}</h1>
        <PowerBIEmbed
          embedConfig={{
            type: "report",
            id: report.id,
            embedUrl: report.embedUrl,
            accessToken: report.embedToken,
            tokenType: models.TokenType.Embed,
            settings: {
              panes: { filters: { visible: false }, pageNavigation: { visible: false } },
              background: models.BackgroundType.Transparent,
            },
          }}
          style={{ height: "80vh" }}
        />
      </div>
    </Layout>
  );
}