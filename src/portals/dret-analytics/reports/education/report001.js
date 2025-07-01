import React, { useRef, useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import AnalyticsLayout from "../../components/layout";
import { Maximize2, Minimize2, Menu, X } from "lucide-react";

const pbiScopes = ["openid", "profile"];

export default function Report001() {
  const { instance, accounts } = useMsal();
  const [embedInfo, setEmbedInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false); // <--- NEW
  const embedContainerRef = useRef(null);

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

  // Fullscreen logic
  const handleFullscreen = () => {
    const elem = embedContainerRef.current;
    if (!document.fullscreenElement) {
      elem.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  return (
    <AnalyticsLayout sidebarHidden={!sidebarVisible}>
      <div className="p-6" ref={embedContainerRef}>
        {/* SIDEBAR TOGGLE BUTTON (always visible, top-left corner) */}
        {!sidebarVisible && (
          <button
            onClick={() => setSidebarVisible(true)}
            className="fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
            aria-label="Show sidebar"
            title="Show sidebar"
          >
            <Menu size={22} />
          </button>
        )}

        {/* FULLSCREEN TOGGLE BUTTON (top-right corner of report panel) */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Attendance Overview</h1>
          <button
            onClick={handleFullscreen}
            className="ml-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Toggle fullscreen"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>

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
      {/* CLOSE SIDEBAR BUTTON: (shows when sidebar is open, fixed at top left of sidebar) */}
      {sidebarVisible && (
        <button
          onClick={() => setSidebarVisible(false)}
          className="fixed top-4 left-64 z-50 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
          aria-label="Hide sidebar"
          title="Hide sidebar"
        >
          <X size={22} />
        </button>
      )}
    </AnalyticsLayout>
  );
}
