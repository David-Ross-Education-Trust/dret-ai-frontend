// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./splash/SplashScreen";

// AI portal
import AiHomePage from "./portals/dret-ai/pages/HomePage";
import FavouritesPage from "./portals/dret-ai/pages/favourites";
import MyHub from "./portals/dret-ai/pages/myhub";
import StudentHub from "./portals/dret-ai/pages/studenthub";
import ToolsPage from "./portals/dret-ai/pages/tools";
import { toolsConfig } from "./portals/dret-ai/components/toolConfig";

// Analytics portal
import AnalyticsHomePage from "./portals/dret-analytics/pages/HomePage";
import EducationReports from "./portals/dret-analytics/pages/EducationReports";
import ToolkitReports from "./portals/dret-analytics/pages/ToolkitReports";
import FinanceReports from "./portals/dret-analytics/pages/FinanceReports";
import HRReports from "./portals/dret-analytics/pages/HRReports";
import ITDataReports from "./portals/dret-analytics/pages/ITDataReports";
import OperationsReports from "./portals/dret-analytics/pages/OperationsReports";
import GovernanceReports from "./portals/dret-analytics/pages/GovernanceReports";

import { reportConfig } from "./portals/dret-analytics/components/reportConfig";
import SchoolToolkitRouter from "./portals/dret-analytics/reports/toolkit/schoolToolkitRouter";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <Routes>
                {/* AI routes */}
                <Route path="/ai/home" element={<AiHomePage />} />
                <Route path="/ai/favourites" element={<FavouritesPage />} />
                <Route path="/ai/myhub" element={<MyHub />} />
                <Route path="/ai/student-hub" element={<StudentHub />} />
                <Route path="/ai/tools" element={<ToolsPage />} />
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

                {/* Analytics section root pages */}
                <Route path="/analytics" element={<AnalyticsHomePage />} />
                <Route
                  path="/analytics/education"
                  element={<EducationReports />}
                />
                <Route path="/analytics/toolkits" element={<ToolkitReports />} />
                <Route
                  path="/analytics/governance"
                  element={<GovernanceReports />}
                />
                <Route path="/analytics/finance" element={<FinanceReports />} />
                <Route path="/analytics/hr" element={<HRReports />} />
                <Route path="/analytics/it-data" element={<ITDataReports />} />
                <Route
                  path="/analytics/operations"
                  element={<OperationsReports />}
                />

                {/* Dynamic school toolkit pages */}
                <Route
                  path="/analytics/toolkits/:schoolKey"
                  element={<SchoolToolkitRouter />}
                />

                {/* Individual analytics report pages */}
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
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
