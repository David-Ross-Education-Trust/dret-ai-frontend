// src/portals/dret-analytics/reports/education/report001.js

import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import AnalyticsLayout from "../../components/layout";

const pbiScopes = ["https://analysis.windows.net/powerbi/api/.default"];

export default function Report001() {
  const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState(null);
  const [tokenError, setTokenError] = useState(null);

  // Your actual IDs
  const reportId = "971ab95e-fd10-4d76-b172-8a30c91ab3bc";
  const groupId = "829bdcb0-220e-46d0-9a2f-821c725a8490";

  useEffect(() => {
    async function getPowerBIToken() {
      if (accounts.length > 0) {
        try {
          const response = await instance.acquireTokenSilent({
            account: accounts[0],
            scopes: pbiScopes,
          });
          setAccessToken(response.accessToken);
        } catch (err) {
          try {
            const response = await instance.acquireTokenPopup({
              account: accounts[0],
              scopes: pbiScopes,
            });
            setAccessToken(response.accessToken);
          } catch (popupErr) {
            setTokenError("Could not acquire Power BI access token.");
            setAccessToken(null);
          }
        }
      }
    }
    getPowerBIToken();
  }, [accounts, instance]);

  return (
    <AnalyticsLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Attendance Overview</h1>
        {tokenError && (
          <div className="text-red-600 mb-4">{tokenError}</div>
        )}
        {!accessToken && !tokenError && (
          <div className="text-gray-500">Loading Power BI report...</div>
        )}
        {accessToken && (
          <PowerBIEmbed
            embedConfig={{
              type: "report",
              id: reportId,
              embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${groupId}`,
              accessToken: accessToken,
              tokenType: models.TokenType.Aad,
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