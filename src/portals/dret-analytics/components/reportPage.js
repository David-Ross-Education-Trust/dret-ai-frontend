import React, { useEffect, useState, useCallback, useRef } from "react";
import { useMsal } from "@azure/msal-react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import AnalyticsLayout from "./layout";
import { API_SCOPES } from "../../../auth/msalConfig";

export default function PowerBIReportPage({
  reportKey,
  title = "Power BI Report",
  showFilters = false,
  expandFilters = false,
}) {
  const { instance, accounts } = useMsal();
  const [embedInfo, setEmbedInfo] = useState(null);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    const setVhVar = () => {
      const vh = (window.visualViewport?.height || window.innerHeight) * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVhVar();
    window.addEventListener("resize", setVhVar);
    window.visualViewport?.addEventListener?.("resize", setVhVar);
    return () => {
      window.removeEventListener("resize", setVhVar);
      window.visualViewport?.removeEventListener?.("resize", setVhVar);
    };
  }, []);

  const fetchEmbedToken = useCallback(async () => {
    if (!accounts[0]) return;
    setError(null);
    setEmbedInfo(null);
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const getApiToken = async (forceRefresh = false) => {
      try {
        return await instance.acquireTokenSilent({
          account: accounts[0],
          scopes: API_SCOPES,
          forceRefresh,
        });
      } catch (e) {
        if (e?.errorCode === "interaction_required") {
          await instance.acquireTokenRedirect({ scopes: API_SCOPES });
          return null;
        }
        throw e;
      }
    };

    try {
      let tokenResp = await getApiToken(false);
      if (!tokenResp) return;

      const post = async (accessToken) =>
        fetch(
          "https://dretai-backend-fkf6bhgug2f3eney.uksouth-01.azurewebsites.net/api/powerbi/embed-token",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reportKey }),
            signal: ac.signal,
          }
        );

      let res = await post(tokenResp.accessToken);
      if (res.status === 401) {
        tokenResp = await getApiToken(true);
        if (!tokenResp) return;
        res = await post(tokenResp.accessToken);
      }

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok || data.error) {
        throw new Error(data.error || `Embed token fetch failed (${res.status})`);
      }
      if (!ac.signal.aborted) setEmbedInfo(data);
    } catch (err) {
      if (err?.name === "AbortError") return;
      setError(err?.message || "Failed to load report");
    }
  }, [accounts, instance, reportKey]);

  useEffect(() => {
    fetchEmbedToken();
    return () => abortRef.current?.abort();
  }, [fetchEmbedToken]);

  return (
    <AnalyticsLayout allowSidebarMinimise hideHeaderWithSidebar>
      {({ sidebarOpen }) => {
        const fullSVH = "100svh";
        const fullFallback = "calc(var(--vh, 1vh) * 100)";
        const cardHeight = sidebarOpen ? `calc(${fullSVH} - 7.25rem)` : fullSVH;
        const cardHeightFallback = sidebarOpen ? `calc(${fullFallback} - 7.25rem)` : fullFallback;
        const outerPadding = sidebarOpen ? "px-2 sm:px-4 md:px-6" : "p-0";
        const innerPadding = sidebarOpen ? "p-4 sm:p-5 md:p-6" : "p-0";

        return (
          <div className="flex flex-col min-h-[100svh] bg-gray-50 font-avenir" style={{ minHeight: fullFallback }}>
            {sidebarOpen && (
              <div className="shrink-0 z-20 shadow-sm px-8 h-24 flex items-center justify-between bg-white">
                <h1 className="text-2xl font-black font-avenir" style={{ color: "#205c40" }}>
                  {title}
                </h1>
                <div className="relative flex-shrink-0 w-[240px] ml-4" />
              </div>
            )}

            <div className={`flex-1 flex flex-col w-full min-h-0 ${outerPadding}`}>
              <div
                className="flex-grow flex-shrink bg-white rounded-xl shadow-md w-full flex flex-col border border-gray-200 min-h-0"
                style={{
                  marginTop: sidebarOpen ? "1.25rem" : "0",
                  height: `min(${cardHeight}, ${cardHeightFallback})`,
                  overflow: "hidden",
                }}
                aria-busy={!embedInfo && !error}
                aria-live="polite"
              >
                {error && (
                  <div className="text-red-600 p-4 flex items-center justify-between">
                    <span className="text-sm">{error}</span>
                    <button
                      onClick={fetchEmbedToken}
                      className="text-sm px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50"
                      type="button"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {!embedInfo && !error && (
                  <div className="text-gray-500 p-4 text-sm">Loading Power BI report...</div>
                )}

                {embedInfo && (
                  <div className={`${innerPadding} h-full w-full`}>
                    <div className="w-full h-full rounded-lg overflow-hidden">
                      <PowerBIEmbed
                        embedConfig={{
                          type: "report",
                          id: embedInfo.reportId,
                          embedUrl: embedInfo.embedUrl,
                          accessToken: embedInfo.embedToken,
                          tokenType: models.TokenType.Embed,
                          settings: {
                            panes: {
                              filters: { visible: showFilters, expanded: expandFilters },
                              pageNavigation: { visible: true },
                            },
                            filterPaneEnabled: showFilters,
                            navContentPaneEnabled: true,
                            background: models.BackgroundType.Transparent,
                          },
                          viewMode: models.ViewMode.View,
                        }}
                        cssClassName="w-full h-full"
                        style={{ width: "100%", height: "100%", minHeight: "100%" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }}
    </AnalyticsLayout>
  );
}
