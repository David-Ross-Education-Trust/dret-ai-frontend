import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import AnalyticsLayout from "../../components/layout";

const pbiScopes = ["openid", "profile"];

export default function Report001() {
  const { instance, accounts } = useMsal();
  const [embedInfo, setEmbedInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmbedToken() {
      if (!accounts[0]) return;
      try {
        const response = await instance.acquireTokenSilent({
          account: accounts[0],
          scopes: pbiScopes,
        });
        const res = await fetch(
          "https://dret-ai-backend-f9drcacng0f2gmc4.uksouth-01.azurewebsites.net/api/powerbi/embed-token",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${response.idToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reportKey: "report001",
            }),
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
  }, [accounts, instance]);

  return (
    <AnalyticsLayout>
      {/* Header */}
      <div className="shrink-0 z-20 bg-gray-50/80 backdrop-blur-md shadow-sm px-8 h-20 flex items-center sticky top-0 border-b border-gray-200">
        <div style={{ display: "flex", alignItems: "center", transform: "translateY(4px)" }}>
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

      {/* Report container */}
      <div
        className="
          flex-1 flex flex-col items-center justify-center
          w-full min-h-0 pt-4 pb-8 px-4 md:px-12
        "
        style={{
          background: "#f3f4f6",
        }}
      >
        <div
          className="
            bg-white rounded-xl shadow-md flex-1 w-full
            max-w-[1600px] min-h-[70vh] flex flex-col
            border border-gray-200
          "
          style={{
            transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
            padding: "2.5rem 2rem",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            minHeight: "72vh",
          }}
        >
          {error && (
            <div className="text-red-600 mb-4">{error}</div>
          )}
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
              cssClassName="w-full h-[72vh] rounded-xl"
              style={{
                flex: 1,
                width: "100%",
                minHeight: "70vh",
              }}
            />
          )}
        </div>
      </div>
    </AnalyticsLayout>
  );
}