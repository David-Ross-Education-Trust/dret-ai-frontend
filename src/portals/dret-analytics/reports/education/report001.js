import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import AnalyticsLayout from "../../components/layout";

// Use OpenID Connect scopes to get the ID token!
const pbiScopes = ["openid", "profile"];

export default function Report001() {
  const { instance, accounts } = useMsal();
  const [embedInfo, setEmbedInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmbedToken() {
      if (!accounts[0]) return;
      try {
        // 1. Acquire MSAL ID token for this user
        const response = await instance.acquireTokenSilent({
          account: accounts[0],
          scopes: pbiScopes,
        });

        // 2. Use the ID token in Authorization header
        const res = await fetch("https://dret-ai-backend-f9drcacng0f2gmc4.uksouth-01.azurewebsites.net/api/powerbi/embed-token", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${response.idToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            reportKey: "report001"
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
  }, [accounts, instance]);

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
