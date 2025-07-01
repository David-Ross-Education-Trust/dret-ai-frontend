import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import AnalyticsLayout from "../../components/layout";
import { Menu, ChevronLeft } from "lucide-react";

const pbiScopes = ["openid", "profile"];

export default function Report001() {
  const { instance, accounts } = useMsal();
  const [embedInfo, setEmbedInfo] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true); // Visible by default

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
              "Authorization": `Bearer ${response.idToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reportKey: "report001" }),
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
    <AnalyticsLayout sidebarHidden={!sidebarVisible}>
      {/* Toggle button, always visible in report view */}
      <div className="flex items-center mb-2">
        <button
          onClick={() => setSidebarVisible((v) => !v)}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          aria-label={sidebarVisible ? "Minimise sidebar" : "Show sidebar"}
          title={sidebarVisible ? "Minimise sidebar" : "Show sidebar"}
        >
          {sidebarVisible ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
        <h1 className="text-2xl font-bold flex-1 text-center -ml-8">Attendance Overview</h1>
        <span className="w-10" />
      </div>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!embedInfo && !error && <div className="text-gray-500">Loading Power BI report...</div>}
      {embedInfo && (
        <div className="flex flex-col w-full h-[calc(100vh-70px)] transition-all duration-300">
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
            cssClassName="w-full h-full rounded-xl shadow"
          />
        </div>
      )}
    </AnalyticsLayout>
  );
}
