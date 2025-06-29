import React, { useEffect, useState } from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import AnalyticsLayout from "../../components/layout";

export default function Report001() {
  const [embedInfo, setEmbedInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmbedToken() {
      try {
        const res = await fetch("/api/powerbi/embed-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "john.doe@yourorg.com",
            roles: ["SeniorLeaders"]
          })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setEmbedInfo(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchEmbedToken();
  }, []);

  return (
    <AnalyticsLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Attendance Overview</h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {!embedInfo && !error && (
          <div className="text-gray-500">Loading Power BI report...</div>
        )}
        {embedInfo && (
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
            cssClassName="w-full h-[80vh] rounded-xl shadow"
          />
        )}
      </div>
    </AnalyticsLayout>
  );
}
