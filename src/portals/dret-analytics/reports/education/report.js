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
          "https://dretai-backend-fkf6bhgug2f3eney.uksouth-01.azurewebsites.net/api/powerbi/embed-token",
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
      {({ sidebarOpen }) => {
        const cardHeight = sidebarOpen ? "calc(100vh - 7.25rem)" : "100vh"; // 6rem header + 1.25rem top gap

        return (
          <div className="flex flex-col min-h-screen bg-gray-50">
            {sidebarOpen && (
              <div
                className="shrink-0 z-20 shadow-sm px-8 h-24 flex items-center justify-between"
                style={{ backgroundColor: "#ffffff" }}
              >
                <h1 className="text-2xl font-bold" style={{ color: "#205c40" }}>
                  {title}
                </h1>
                <div className="relative flex-shrink-0 w-[240px] ml-4" />
              </div>
            )}

            <div className={`flex-1 flex flex-col w-full min-h-0 ${sidebarOpen ? "px-2 sm:px-4 md:px-6" : "p-0"}`}>
              <div
                className="flex-grow flex-shrink bg-white rounded-xl shadow-md w-full flex flex-col border border-gray-200"
                style={{
                  marginTop: sidebarOpen ? "1.25rem" : "0",
                  height: cardHeight,
                  overflow: "hidden",
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
                      minHeight: "100%",
                      borderRadius: "inherit",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        );
      }}
    </AnalyticsLayout>
  );
}
