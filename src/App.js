import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./splash/SplashScreen";

import AiHomePage from "./portals/dret-ai/pages/HomePage";
import FavouritesPage from "./portals/dret-ai/pages/favourites";
import MyHub from "./portals/dret-ai/pages/myhub";

import AnalyticsHomePage from "./portals/dret-analytics/pages/HomePage";
// You no longer need ReportViewer for dynamic reports, unless you use it for legacy routes

import { toolsConfig } from "./portals/dret-ai/components/toolConfig";
import { reportConfig } from "./portals/dret-analytics/components/reportConfig";

function App() {
  return (
    <Router>
      <Routes>
        {/* SPLASH / ENTRY */}
        <Route path="/" element={<SplashScreen />} />

        {/* DRET AI ROUTES */}
        <Route path="/ai" element={<AiHomePage />} />
        <Route path="/ai/favourites" element={<FavouritesPage />} />
        <Route path="/ai/myhub" element={<MyHub />} />

        {/* DRET AI TOOLS - AUTOMATIC ROUTES */}
        {toolsConfig.map(
          (tool) =>
            !tool.comingSoon && (
              <Route
                key={tool.id}
                path={tool.href}
                element={<tool.component />}
              />
            )
        )}

        {/* DRET ANALYTICS ROUTES */}
        <Route path="/analytics" element={<AnalyticsHomePage />} />

        {/* DRET ANALYTICS REPORTS - AUTOMATIC ROUTES */}
        {reportConfig.map(
          (report) =>
            !report.comingSoon && (
              <Route
                key={report.id}
                path={report.href}
                element={<report.component />}
              />
            )
        )}

        {/* OPTIONAL: Legacy/fallback for analytics reports by ID (if needed) */}
        {/* <Route path="/analytics/report/:reportId" element={<ReportViewer />} /> */}
      </Routes>
    </Router>
  );
}

export default App;