import React, { useState, useEffect } from "react";
import Layout from "../../../layout";
import { useMsal } from "@azure/msal-react";
import { Megaphone } from "lucide-react";

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

function TasksWidget({ tasks }) {
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("studenthub-completed-tasks");
    return saved ? JSON.parse(saved) : {};
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
    <div className="bg-white rounded-xl p-6 shadow w-full max-w-5xl mx-auto">
      <div className="text-lg font-bold mb-4 text-center">Your Tasks</div>
      <div className="flex flex-col gap-4">
        {tasks.length === 0 ? (
          <div className="text-gray-400 text-sm text-center py-8">
            No tasks assigned.
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="flex flex-col md:flex-row items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex-1 text-base font-medium">{task.task}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Complete by:</span>
                <span className="text-sm font-semibold text-trust-green">{task.due}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id={`complete-${task.id}`}
                  type="checkbox"
                  checked={!!completed[task.id]}
                  onChange={() => toggleComplete(task.id)}
                  className="h-5 w-5 text-trust-green border-gray-300 rounded"
                />
                <label
                  htmlFor={`complete-${task.id}`}
                  className="text-sm select-none"
                >
                  {completed[task.id] ? "Completed" : "Mark complete"}
                </label>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function StudentHub() {
  const { accounts } = useMsal();
  const account = accounts[0];
  const isSignedIn = !!account;
  const userName = account ? account.name.split(" ")[0] : "there";

  return (
    <Layout>
      <div className="font-sans bg-gray-100 min-h-screen h-screen flex flex-col">
        <div className="w-full flex items-center bg-yellow-100 border-b border-yellow-300 px-3 py-1 mb-3 rounded-t-xl shadow-sm">
          <Megaphone className="text-yellow-600 mr-2 h-4 w-4" />
          <span className="text-xs text-yellow-800 font-medium truncate">
            Welcome to DRET.AI! Staff meeting Friday at 4pm in the Hall. 🎉
          </span>
        </div>
        <div className="px-3 pt-3 bg-gray-50/80 backdrop-blur-md shadow-sm mb-10">
          <h2 className="text-lg font-bold mb-6">Welcome back, {userName}!</h2>
        </div>
        <div className="flex-1 flex items-start justify-center bg-gray-100">
          <TasksWidget tasks={demoTasks} />
        </div>
      </div>
    </Layout>
  );
}
