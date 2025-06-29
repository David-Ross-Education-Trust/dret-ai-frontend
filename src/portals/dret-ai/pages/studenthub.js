import React, { useState, useEffect } from "react";
import Layout from "../../../layout";
import { useMsal } from "@azure/msal-react";
import { toolsConfig } from "../components/toolConfig";
import ToolCard from "../components/toolCard";

function TasksWidget() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("studenthub-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("studenthub-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), done: false }]);
    setInput("");
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="bg-white rounded-xl p-3 shadow w-64 min-h-48 flex flex-col mb-4">
      <div className="text-base font-bold mb-2 text-center">Tasks</div>
      <div className="flex mb-2">
        <input
          className="flex-1 border border-gray-300 rounded-l px-2 py-1 text-sm"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTask()}
          placeholder="Add a new task"
        />
        <button
          onClick={addTask}
          className="bg-trust-green text-white px-3 rounded-r text-sm"
        >
          +
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="text-xs text-gray-400 text-center py-3">No tasks yet.</div>
        ) : (
          <ul className="space-y-1">
            {tasks.map(task => (
              <li key={task.id} className="flex items-center justify-between group">
                <span
                  className={`text-sm flex-1 cursor-pointer ${task.done ? "line-through text-gray-400" : ""}`}
                  onClick={() => toggleDone(task.id)}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => removeTask(task.id)}
                  className="text-gray-300 hover:text-red-400 text-lg pl-2 opacity-60 group-hover:opacity-100"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
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
  const [favourites] = useState(() => {
    const saved = localStorage.getItem("student-favourites");
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <Layout>
      <div className="font-sans bg-gray-100 min-h-screen h-screen flex flex-col">
        <div className="px-3 pt-3 bg-gray-50/80 backdrop-blur-md shadow-sm">
          <h2 className="text-lg font-bold mb-6">Welcome back, {userName}!</h2>
          <div className="flex flex-col md:flex-row gap-x-10 gap-y-4 items-start mb-8 md:pl-4">
            <div className="pl-2 w-full md:w-auto flex-shrink-0">
              <TasksWidget />
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
                  disabled={!isSignedIn}
                />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}