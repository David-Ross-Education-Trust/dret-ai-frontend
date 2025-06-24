import React from "react";
import Layout from "../../../layout";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

export default function AttendanceOverviewReport() {
  // These values are for demo. You should load from config or env for security!
  const embedUrl = "https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID&groupId=YOUR_WORKSPACE_ID";
  const accessToken = "YOUR_SECURE_ACCESS_TOKEN"; // Use a backend API to generate a real one!
  const reportId = "YOUR_REPORT_ID";

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-6 h-24 flex items-center sticky top-0">
          <div className="flex items-center">
            <span
              className="inline-block"
              style={{
                width: 6,
                height: 34,
                borderRadius: 6,
                background: "#205c40",
                marginRight: "1.1rem",
              }}
            />
            <h1 className="text-xl font-bold" style={{ color: "#205c40" }}>
              Attendance Overview
            </h1>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-5xl bg-white shadow rounded-xl p-6">
            <PowerBIEmbed
              embedConfig={{
                type: "report",
                id: reportId,
                embedUrl: embedUrl,
                accessToken: accessToken,
                tokenType: models.TokenType.Embed,
                settings: {
                  panes: { filters: { visible: false }, pageNavigation: { visible: false } },
                  background: models.BackgroundType.Transparent
                }
              }}
              cssClassName="w-full h-[700px] rounded-xl overflow-hidden"
              getEmbeddedComponent={(embeddedReport) => {
                // You can expose events or refresh logic here
                // console.log("Report embedded:", embeddedReport);
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}