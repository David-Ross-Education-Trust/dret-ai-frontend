import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { useMsal } from "@azure/msal-react";
import { Megaphone } from "lucide-react";
import { toolsConfig } from "../components/toolConfig";
import ToolCard from "../components/toolCard";

const demoTasks = [
  {
    id: "t1",
    task: "Complete the Maths assignment",
    due: "2025-07-04",
  },
  {
    id: "t2",
    task: "Read Chapter 5 of Of Mice and Men",
    due: "2025-07-05",
  },
  {
    id: "t3",
    task: "Upload your Science project",
    due: "2025-07-10",
  },
];

export default function StudentHub() {
  const { accounts } = useMsal();
  const account = accounts[0];
  const userName = account ? account.name.split(" ")[0] : "there";
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("studenthub-completed-tasks");
    return saved ? JSON.parse(saved) : {};
  });
  const [favourites] = useState(() => {
    const saved = localStorage.getItem("student-favourites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("studenthub-completed-tasks", JSON.stringify(completed));
  }, [completed]);

  const toggleComplete = (id) => {
    setCompleted(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <Layout>
      <div className="font-avenir bg-gray-100 min-h-screen h-screen flex flex-col">
        <div className="w-full flex items-center bg-yellow-100 border-b border-yellow-300 px-3 py-1 mb-3 rounded-t-xl shadow-sm">
          <Megaphone className="text-yellow-600 mr-2 h-4 w-4" />
          <span className="text-xs text-yellow-800 font-medium truncate">
            Welcome to DRET.AI! Staff meeting Friday at 4pm in the Hall. 🎉
          </span>
        </div>
        <div className="px-3 pt-3 bg-gray-50/80 backdrop-blur-md shadow-sm">
          <h2 className="text-lg font-bold mb-6">Welcome back, {userName}!</h2>
          <div className="flex flex-col md:flex-row gap-x-10 gap-y-4 items-start mb-8 md:pl-4">
            <div className="pl-2 w-full md:w-auto flex-shrink-0">
              <div
                className="h-48 w-full flex flex-col justify-between"
                style={{
                  minWidth: "180px",
                  minHeight: "9rem",
                  maxWidth: "420px",
                }}
              >
                <div className="text-base font-bold mb-3">Tasks</div>
                <div className="flex-1 overflow-y-auto">
                  {demoTasks.length === 0 ? (
                    <div className="text-xs text-gray-400 text-center py-3">No tasks yet.</div>
                  ) : (
                    <ul className="space-y-2">
                      {demoTasks.map(task => (
                        <li key={task.id} className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0">
                          <div>
                            <div className="text-sm font-medium">{task.task}</div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">Complete by:</span>
                              <span className="text-xs font-semibold text-trust-green">{task.due}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <input
                              id={`complete-${task.id}`}
                              type="checkbox"
                              checked={!!completed[task.id]}
                              onChange={() => toggleComplete(task.id)}
                              className="h-5 w-5 text-trust-green border-gray-300 rounded"
                            />
                            <label
                              htmlFor={`complete-${task.id}`}
                              className="text-xs select-none"
                            >
                              {completed[task.id] ? "Completed" : "Mark complete"}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-area flex-1 overflow-y-auto bg-gray-100">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 pb-16">
            {toolsConfig
              .filter(tool => !tool.comingSoon)
              .map((tool, idx) => (
                <ToolCard
                  key={tool.id || idx}
                  tool={tool}
                  isFavourite={favourites.includes(tool.name)}
                  onFavourite={() => {}}
                  clickedStar={null}
                  onClick={() => {}}
                  disabled={false}
                />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
