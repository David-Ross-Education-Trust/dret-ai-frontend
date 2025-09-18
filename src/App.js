import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";

import AiHomePage from "./portals/dret-ai/pages/HomePage";
import FavouritesPage from "./portals/dret-ai/pages/favourites";
import MyHub from "./portals/dret-ai/pages/myhub";
import StudentHub from "./portals/dret-ai/pages/studenthub";
import ToolsPage from "./portals/dret-ai/pages/tools";
import { toolsConfig } from "./portals/dret-ai/components/toolConfig";

import AnalyticsHomePage from "./portals/dret-analytics/pages/HomePage";
import EducationReports from "./portals/dret-analytics/pages/EducationReports";
import ToolkitReports from "./portals/dret-analytics/pages/ToolkitReports";
import FinanceReports from "./portals/dret-analytics/pages/FinanceReports";
import HRReports from "./portals/dret-analytics/pages/HRReports";
import ITDataReports from "./portals/dret-analytics/pages/ITDataReports";
import OperationsReports from "./portals/dret-analytics/pages/OperationsReports";
import GovernanceReports from "./portals/dret-analytics/pages/GovernanceReports";

import { activeReports as educationActiveReports } from "./portals/dret-analytics/components/reportConfig";
import { activeReports as governanceActiveReports } from "./portals/dret-analytics/reports/GovernanceConfig";
import { activeReports as financeActiveReports } from "./portals/dret-analytics/reports/FinanceConfig";
import { activeReports as hrActiveReports } from "./portals/dret-analytics/reports/HRConfig";
import { activeReports as itDataActiveReports } from "./portals/dret-analytics/reports/ITDataConfig";
import { activeReports as operationsActiveReports } from "./portals/dret-analytics/reports/OperationsConfig";

import ToolkitRouter from "./portals/dret-analytics/toolkits/toolkitRouter";
import RequireAuth from "./auth/RequireAuth";

import GroupGuard from "./auth/GroupGuard";
import { GROUPS } from "./auth/groups";

function App() {
  const allActiveReports = [
    ...educationActiveReports,
    ...governanceActiveReports,
    ...financeActiveReports,
    ...hrActiveReports,
    ...itDataActiveReports,
    ...operationsActiveReports,
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <Routes>
                <Route path="/ai/home" element={<AiHomePage />} />
                <Route path="/ai/favourites" element={<FavouritesPage />} />
                <Route path="/ai/myhub" element={<MyHub />} />
                <Route path="/ai/student-hub" element={<StudentHub />} />
                <Route path="/ai/tools" element={<ToolsPage />} />
                {toolsConfig.map(
                  (tool) =>
                    !tool.comingSoon && (
                      <Route key={tool.id} path={tool.href} element={<tool.component />} />
                    )
                )}

                <Route path="/analytics" element={<AnalyticsHomePage />} />

                <Route
                  path="/analytics/education"
                  element={
                    <GroupGuard allowedGroups={[GROUPS.EDUCATION, GROUPS.WORKING_GROUP]}>
                      <EducationReports />
                    </GroupGuard>
                  }
                />

                <Route path="/analytics/toolkits" element={<ToolkitReports />} />

                <Route
                  path="/analytics/governance"
                  element={
                    <GroupGuard allowedGroups={[GROUPS.GOVERNANCE, GROUPS.WORKING_GROUP]}>
                      <GovernanceReports />
                    </GroupGuard>
                  }
                />

                <Route
                  path="/analytics/finance"
                  element={
                    <GroupGuard allowedGroups={[GROUPS.FINANCE]}>
                      <FinanceReports />
                    </GroupGuard>
                  }
                />

                <Route
                  path="/analytics/hr"
                  element={
                    <GroupGuard allowedGroups={[GROUPS.HR]}>
                      <HRReports />
                    </GroupGuard>
                  }
                />

                <Route
                  path="/analytics/it-data"
                  element={
                    <GroupGuard allowedGroups={[GROUPS.IT_DATA]}>
                      <ITDataReports />
                    </GroupGuard>
                  }
                />

                <Route
                  path="/analytics/operations"
                  element={
                    <GroupGuard allowedGroups={[GROUPS.OPERATIONS]}>
                      <OperationsReports />
                    </GroupGuard>
                  }
                />

                <Route path="/analytics/toolkits/:schoolKey" element={<ToolkitRouter />} />

                {allActiveReports.map((report) => (
                  <Route key={report.id} path={report.href} element={<report.component />} />
                ))}
              </Routes>
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
