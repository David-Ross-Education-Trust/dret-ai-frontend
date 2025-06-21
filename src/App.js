import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import FavouritesPage from "./favourites";
import MyHub from "./myhub";
import { toolsConfig } from "./toolConfig";
import ToolRenderer from "./toolRenderer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/hub" element={<MyHub />} />
        {toolsConfig.map((tool) => {
          if (tool.comingSoon) return null;
          if (tool.component) {
            // Custom legacy component route
            return (
              <Route
                key={tool.id}
                path={tool.href}
                element={<tool.component />}
              />
            );
          }
          if (tool.agentId && tool.fields && tool.href) {
            // Generic ToolRenderer-based route
            return (
              <Route
                key={tool.id}
                path={tool.href}
                element={
                  <ToolRenderer
                    agentId={tool.agentId}
                    fields={tool.fields}
                    title={tool.name}
                    description={tool.description}
                    promptSuffix={tool.promptSuffix}
                    buttonText={tool.buttonText}
                  />
                }
              />
            );
          }
          return null;
        })}
      </Routes>
    </Router>
  );
}

export default App;
