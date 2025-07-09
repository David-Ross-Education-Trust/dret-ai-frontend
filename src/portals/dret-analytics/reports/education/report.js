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
            <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-8 h-20 flex items-center sticky top-0 border-b border-gray-200">
              <div className="flex items-center translate-y-1">
                <span className="w-1.5 h-8 rounded bg-[#205c40] mr-4" />
                <h1 className="text-xl font-bold text-[#205c40]">{title}</h1>
              </div>
            </div>
          )}

          <div
            className={
              `flex-1 flex flex-col items-center justify-center w-full min-h-0 ` +
              (sidebarOpen ? "pb-8 px-4 md:px-12" : "p-0")
            }
          >
            <div
              className="bg-white rounded-xl shadow-md flex-1 w-full max-w-[1600px] min-h-[70vh] flex flex-col border border-gray-200"
              style={{
                padding: sidebarOpen ? "2.5rem 2rem" : "0",
                margin: sidebarOpen ? "0.5rem 0" : "0",
              }}
            >
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
                  cssClassName="w-full h-full rounded-xl"
                  style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    minHeight: "60vh",
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
