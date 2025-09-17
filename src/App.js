import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";

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
import ToolkitRouter from "./portals/dret-analytics/components/toolkitRouter";
import RequireAuth from "./auth/RequireAuth";

// Group-based guards
import GroupGuard from "./auth/GroupGuard";
import { GROUPS } from "./auth/groups";

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

                {/* Education: Education + Working Group */}
                <Route
                  path="/analytics/education"
                  element={
                    <GroupGuard
                      allowedGroups={[GROUPS.EDUCATION, GROUPS.WORKING_GROUP]}
                    >
                      <EducationReports />
                    </GroupGuard>
                  }
                />

                {/* Toolkits: no restrictions */}
                <Route path="/analytics/toolkits" element={<ToolkitReports />} />

                {/* Governance: only Governance */}
                <Route
                  path="/analytics/governance"
                  element={
                    <GroupGuard allowedGroups={[GROUPS.GOVERNANCE, GROUPS.WORKING_GROUP]}>
                      <GovernanceReports />
                    </GroupGuard>
                  }
                />

                {/* Finance: only Finance */}
                <Route
                  path="/analytics/finance"
                  element={
                    <GroupGuard allowedGroups={[GROUPS.FINANCE]}>
                      <FinanceReports />
                    </GroupGuard>
                  }
                />

                {/* HR: only HR */}
                <Route
                  path="/analytics/hr"
                  element={
                    <GroupGuard allowedGroups={[GROUPS.HR]}>
                      <HRReports />
                    </GroupGuard>
                  }
                />

                {/* IT & Data: only IT & Data */}
                <Route
                  path="/analytics/it-data"
                  element={
                    <GroupGuard allowedGroups={[GROUPS.IT_DATA]}>
                      <ITDataReports />
                    </GroupGuard>
                  }
                />

                {/* Operations: only Operations */}
                <Route
                  path="/analytics/operations"
                  element={
                    <GroupGuard allowedGroups={[GROUPS.OPERATIONS]}>
                      <OperationsReports />
                    </GroupGuard>
                  }
                />

                {/* Dynamic school toolkit pages (leave open) */}
                <Route
                  path="/analytics/toolkits/:schoolKey"
                  element={<SchoolToolkitRouter />}
                />

                {/* Individual analytics report pages (unchanged) */}
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
