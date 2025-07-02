import React from "react";
import AnalyticsLayout from "../../components/layout";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

export default function Report001() {
  // ...your embedInfo fetching code...

  // Demo only:
  const embedInfo = {
    reportId: "demo-report-id",
    embedUrl: "https://app.powerbi.com/reportEmbed?reportId=demo-report-id&groupId=demo-group-id",
    embedToken: "demo-token",
  };

  return (
    <AnalyticsLayout>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <div className="shrink-0 z-20 bg-white/90 backdrop-blur-md shadow px-8 h-20 flex items-center" style={{ minHeight: 72 }}>
          <div className="flex items-center gap-3">
            <span className="inline-block w-1.5 h-9 rounded bg-[var(--trust-green)]" />
            <h1 className="text-2xl font-bold text-[var(--trust-green)]">
              Attendance Overview
            </h1>
          </div>
        </div>
        {/* Report container */}
        <div className="flex-1 flex justify-center items-center px-6 py-6 bg-gray-50">
          <div className="bg-white rounded-xl shadow-lg flex flex-col w-full max-w-5xl h-[calc(100vh-8rem)] min-h-[600px] transition-all duration-300">
            {/* The PowerBIEmbed component here should fill this card */}
            <div className="flex-1 flex min-h-0">
              <PowerBIEmbed
                embedConfig={{
                  type: "report",
                  id: embedInfo.reportId,
                  embedUrl: embedInfo.embedUrl,
                  accessToken: embedInfo.embedToken,
                  tokenType: models.TokenType.Embed,
                  settings: {
                    panes: {
                      filters: { visible: false },
                      pageNavigation: { visible: true },
                    },
                  },
                }}
                cssClassName="w-full h-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </AnalyticsLayout>
  );
}
