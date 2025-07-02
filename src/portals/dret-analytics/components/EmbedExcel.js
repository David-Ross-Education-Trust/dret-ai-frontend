// src/components/EmbeddedExcel.js

import React from "react";

export default function EmbeddedExcel() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(32,92,64,0.10)",
        padding: 16,
      }}
    >
      <iframe
        title="Embedded Excel"
        width="100%"
        height="600"
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          minHeight: 346,
          minWidth: 402,
        }}
        frameBorder="0"
        scrolling="no"
        src="https://davidrosseducationtrust.sharepoint.com/sites/DRET-ITInnovation/_layouts/15/Doc.aspx?sourcedoc={ea1ff394-197a-408f-8d22-92dda7b78f8a}&action=embedview&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True"
        allowFullScreen
      ></iframe>
    </div>
  );
}
