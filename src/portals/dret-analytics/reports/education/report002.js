// portals/dret-analytics/reports/education/report002.js
import React from "react";
import AnalyticsLayout from "../../components/layout";

export default function Report002() {
  // Your SharePoint Excel embed URL
  const excelEmbedUrl =
    "https://davidrosseducationtrust.sharepoint.com/sites/DRET-ITInnovation/_layouts/15/Doc.aspx?sourcedoc={ea1ff394-197a-408f-8d22-92dda7b78f8a}&action=embedview&wdHideHeaders=True&wdInConfigurator=True";

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
            Embedded Excel Report
          </h1>
        </div>
      </div>

      {/* Excel Embed */}
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
    </AnalyticsLayout>
  );
}