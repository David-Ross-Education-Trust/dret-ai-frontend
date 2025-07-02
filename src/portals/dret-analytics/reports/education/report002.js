import React from "react";
import AnalyticsLayout from "../../components/layout";

export default function Report002() {
  // Your SharePoint Excel embed URL
  const excelEmbedUrl =
    "https://davidrosseducationtrust.sharepoint.com/sites/DRET-ITInnovation/_layouts/15/Doc.aspx?sourcedoc={ea1ff394-197a-408f-8d22-92dda7b78f8a}&action=embedview&wdHideHeaders=True&wdInConfigurator=True";

  return (
    <AnalyticsLayout allowSidebarMinimise hideHeaderWithSidebar>
      {({ sidebarOpen }) => {
        const fullscreen = !sidebarOpen;

        return (
          <div
            className="flex flex-col min-h-screen bg-gray-50"
            style={{ minHeight: "100vh", height: "100vh" }}
          >
            {/* Header: Only shown if sidebarOpen */}
            {sidebarOpen && (
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
                    Embedded Excel Report
                  </h1>
                </div>
              </div>
            )}

            {/* Main Embed Container */}
            <div
              className={
                `flex-1 flex flex-col items-center justify-center w-full min-h-0 ` +
                (fullscreen
                  ? "pt-0 pb-0 px-0 md:px-0 bg-gray-50"
                  : "pb-8 px-4 md:px-12 bg-gray-50")
              }
              style={{
                transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
              }}
            >
              <div
                className={
                  `bg-white rounded-xl shadow-md flex-1 w-full max-w-[1600px] min-h-[70vh] flex flex-col border border-gray-200`
                }
                style={{
                  transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
                  padding: fullscreen ? "0" : "2.5rem 2rem",
                  marginTop: fullscreen ? "0" : "0.5rem",
                  marginBottom: fullscreen ? "0" : "0.5rem",
                  minHeight: "72vh",
                  height: fullscreen ? "calc(100vh - 0px)" : undefined,
                }}
              >
                <iframe
                  src={excelEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{
                    flex: 1,
                    minHeight: "70vh",
                    border: "none",
                    borderRadius: "0.75rem",
                  }}
                  title="Embedded Excel"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        );
      }}
    </AnalyticsLayout>
  );
}
