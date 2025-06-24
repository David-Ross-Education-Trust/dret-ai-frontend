import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

const pbiScopes = ["https://analysis.windows.net/powerbi/api/.default"];

export default function PowerBIReportEmbed({ reportId, groupId }) {
  const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState(null);

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
          // fallback to popup if needed
          try {
            const response = await instance.acquireTokenPopup({
              account: accounts[0],
              scopes: pbiScopes,
            });
            setAccessToken(response.accessToken);
          } catch (popupErr) {
            setAccessToken(null);
          }
        }
      }
    }
    getPowerBIToken();
  }, [accounts, instance]);

  if (!accessToken) return <div>Loading Power BI...</div>;

  return (
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
            pageNavigation: { visible: true }
          }
        }
      }}
      cssClassName="w-full h-[80vh] rounded-xl shadow"
    />
  );
}