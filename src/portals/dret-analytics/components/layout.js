import React from "react";
// You can use your own logo or colors here
import dretAnalyticsLogo from "../../../assets/dretai-logo.png"; // If you have a different logo

const analyticsNavItems = [
  { label: "Analytics Home", to: "/analytics" },
  { label: "Reports", to: "/analytics" }, // Or more detailed routes
  // Add more as needed
];

const AnalyticsLayout = ({ children }) => (
  <div className="flex font-sans">
    <aside className="w-60 bg-trust-green text-white h-screen fixed left-0 top-0 flex flex-col justify-between">
      <div className="w-full h-24 flex items-center">
        <img
          src={dretAnalyticsLogo}
          alt="Analytics Logo"
          className="w-full h-full object-contain"
          style={{ display: "block", maxHeight: "90px" }}
        />
      </div>
      <div className="p-6 flex flex-col gap-4 overflow-y-auto mt-4">
        {analyticsNavItems.map((item, idx) => (
          <a
            key={idx}
            href={item.to}
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-trust-green transition"
          >
            {item.label}
          </a>
        ))}
      </div>
    </aside>
    <main className="ml-60 w-full min-h-screen overflow-y-auto bg-gray-50">
      {children}
    </main>
  </div>
);

export default AnalyticsLayout;