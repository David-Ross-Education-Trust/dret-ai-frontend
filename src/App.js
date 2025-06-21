import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import FavouritesPage from "./favourites";
import MyHub from "./myhub";
import { toolsConfig } from "./toolConfig";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/hub" element={<MyHub />} />
        {toolsConfig.map((tool) =>
          !tool.comingSoon && tool.component && tool.href ? (
            <Route
              key={tool.id}
              path={tool.href}
              element={<tool.component />}
            />
          ) : null
        )}
      </Routes>
    </Router>
  );
}

export default App;