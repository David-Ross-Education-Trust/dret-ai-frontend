import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import AnalyticsLayout from "../../components/layout";

export default function PowerBIReportPage({ reportKey, title = "Power BI Report" }) {
  const { instance, accounts } = useMsal();
  const [embedInfo, setEmbedInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmbedToken() {
      if (!accounts[0]) return;
      try {
        const response = await instance.acquireTokenSilent({
          account: accounts[0],
          scopes: ["openid", "profile"],
        });

        const res = await fetch(
          "https://dret-ai-backend-f9drcacng0f2gmc4.uksouth-01.azurewebsites.net/api/powerbi/embed-token",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${response.idToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reportKey }),
          }
        );

        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setEmbedInfo(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchEmbedToken();
  }, [accounts, instance, reportKey]);

  return (
    <AnalyticsLayout allowSidebarMinimise hideHeaderWithSidebar>
      {({ sidebarOpen }) => (
        <div className="flex flex-col min-h-screen bg-gray-50">
          {sidebarOpen && (
            <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-4 md:px-8 h-20 flex items-center sticky top-0 border-b border-gray-200">
              <div className="flex items-center gap-3 md:translate-y-1 flex-wrap md:flex-nowrap">
                <span className="w-1.5 h-8 rounded bg-[#205c40]" />
                <h1 className="text-lg md:text-xl font-bold text-[#205c40]">{title}</h1>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0 px-2 sm:px-4 md:px-12 pb-6">
            <div
              className="bg-white rounded-xl shadow-md w-full max-w-[1600px] flex flex-col border border-gray-200 mt-4"
              style={{
                flex: 1,
                height: "calc(100vh - 6.5rem)", // responsive height including header
              }}
            >
              {error && <div className="text-red-600 p-4">{error}</div>}
              {!embedInfo && !error && (
                <div className="text-gray-500 p-4">Loading Power BI report...</div>
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
                  cssClassName="w-full h-full rounded-xl"
                  style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    minHeight: "0",
                    borderRadius: "inherit",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </AnalyticsLayout>
  );
}
