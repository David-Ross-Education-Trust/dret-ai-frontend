import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./splash/SplashScreen";

import AiHomePage from "./portals/dret-ai/pages/HomePage";
import FavouritesPage from "./portals/dret-ai/pages/favourites";
import MyHub from "./portals/dret-ai/pages/myhub";

import AnalyticsHomePage from "./portals/dret-analytics/pages/HomePage";
import ReportViewer from "./portals/dret-analytics/pages/ReportViewer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />

        <Route path="/ai" element={<AiHomePage />} />
        <Route path="/ai/favourites" element={<FavouritesPage />} />
        <Route path="/ai/myhub" element={<MyHub />} />

        <Route path="/analytics" element={<AnalyticsHomePage />} />
        <Route path="/analytics/report/:reportId" element={<ReportViewer />} />
      </Routes>
    </Router>
  );
}

export default App;