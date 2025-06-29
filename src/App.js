import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./splash/SplashScreen";
import AiHomePage from "./portals/dret-ai/pages/HomePage";
import FavouritesPage from "./portals/dret-ai/pages/favourites";
import MyHub from "./portals/dret-ai/pages/myhub";
import StudentHub from "./portals/dret-ai/pages/studenthub";
import AnalyticsHomePage from "./portals/dret-analytics/pages/HomePage";
import { toolsConfig } from "./portals/dret-ai/components/toolConfig";
import { reportConfig } from "./portals/dret-analytics/components/reportConfig";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/ai" element={<AiHomePage />} />
        <Route path="/ai/favourites" element={<FavouritesPage />} />
        <Route path="/ai/myhub" element={<MyHub />} />
        <Route path="/ai/student-hub" element={<StudentHub />} />
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
        <Route path="/analytics" element={<AnalyticsHomePage />} />
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
      </Routes>
    </Router>
  );
}

export default App;
