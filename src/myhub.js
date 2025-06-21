import React, { useState, useEffect } from "react";
import { Star, Megaphone } from "lucide-react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { toolsConfig } from "./toolConfig";
import ToolCard from "./toolCard";

function CalendarWidget() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  let days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="bg-white rounded-xl p-2 shadow w-64 h-48 mb-4">
      <div className="text-base font-bold mb-1 text-center">
        {now.toLocaleString("default", { month: "long" })} {year}
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center text-[11px] font-medium mb-1">
        {weekDays.map((d) => (
          <div key={d} className="text-gray-500">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
        {days.map((d, idx) =>
          d ? (
            <div
              key={idx}
              className={`py-0.5 rounded-full ${
                d === today
                  ? "bg-trust-green text-white font-bold"
                  : "hover:bg-gray-100"
              }`}
            >
              {d}
            </div>
          ) : (
            <div key={idx}></div>
          )
        )}
      </div>
    </div>
  );
}

export default function MyHub() {
  const navigate = useNavigate();
  const { accounts } = useMsal();
  const account = accounts[0];
  const isSignedIn = !!account;
  const userName = account ? account.name.split(" ")[0] : "there";
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("myhub-notes");
    return saved ? JSON.parse(saved) : [{ id: Date.now(), text: "" }];
  });
  const [activeNote, setActiveNote] = useState(0);

  useEffect(() => {
    localStorage.setItem("myhub-notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNotes = [...notes, { id: Date.now(), text: "" }];
    setNotes(newNotes);
    setActiveNote(newNotes.length - 1);
  };

  const updateNote = (id, value) => {
    setNotes(notes.map(n => n.id === id ? { ...n, text: value } : n));
  };

  const removeNote = (id) => {
    let idx = notes.findIndex(n => n.id === id);
    const newNotes = notes.filter(n => n.id !== id);
    setNotes(newNotes.length ? newNotes : [{ id: Date.now(), text: "" }]);
    if (activeNote >= newNotes.length) setActiveNote(newNotes.length - 1);
    else if (activeNote > idx) setActiveNote(activeNote - 1);
  };

  const [favourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  const handleCardClick = (tool) => {
    if (isSignedIn && tool.href) {
      navigate(tool.href);
    }
  };

  const filteredTools = toolsConfig
    .filter((tool) => favourites.includes(tool.name))
    .sort((a, b) => parseInt(b.id || "0") - parseInt(a.id || "0"));

  return (
    <Layout>
      <div className="font-sans bg-gray-100 min-h-screen h-screen flex flex-col">
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
              <CalendarWidget />
            </div>
            <div className="relative w-full md:w-72 flex-shrink-0 flex items-start justify-center" style={{ minHeight: "10rem" }}>
              <div
                className="relative rounded-xl shadow-lg h-48 w-full flex flex-row items-start overflow-visible bg-note-yellow"
                style={{
                  boxShadow: "2px 2px 0px 0px #eedc85, 4px 4px 8px 0px rgba(0,0,0,0.04)",
                  minWidth: "180px",
                  minHeight: "9rem",
                }}
              >
                <div className="flex-1 h-full relative pl-2 pr-0">
                  {notes.length > 1 && (
                    <button
                      className="absolute top-1 right-2 text-yellow-600 text-base font-bold hover:text-red-500 z-30"
                      onClick={() => removeNote(notes[activeNote].id)}
                      title="Delete this note"
                    >
                      ×
                    </button>
                  )}
                  <textarea
                    className="w-full h-full bg-transparent border-none resize-none focus:ring-0 text-yellow-900 p-2 text-sm"
                    style={{ fontFamily: "inherit", minHeight: "90%" }}
                    value={notes[activeNote]?.text || ""}
                    onChange={e => updateNote(notes[activeNote].id, e.target.value)}
                    placeholder="Jot down something for later…"
                  />
                </div>
                <div className="flex flex-col gap-1 h-full pt-2 pl-2 pr-0 items-end">
                  {notes.map((note, idx) => (
                    <button
                      key={note.id}
                      onClick={() => setActiveNote(idx)}
                      className={`flex items-center h-8 w-8
                        -mr-5 z-10 shadow font-bold
                        rounded-r-xl border transition
                        ${activeNote === idx
                          ? "bg-yellow-300 border-yellow-600 scale-105"
                          : "bg-yellow-100 border-yellow-300 hover:bg-yellow-200"
                        }
                      `}
                      style={{
                        borderLeft: "none",
                        marginBottom: "0.15rem",
                        borderTopLeftRadius: "12px",
                        borderBottomLeftRadius: "12px",
                        borderRight: "4px solid #ffe066",
                        fontSize: "0.9rem",
                      }}
                      title={`Note ${idx + 1}`}
                    >
                      <span className="mx-auto text-yellow-900">{idx + 1}</span>
                    </button>
                  ))}
                  <button
                    onClick={addNote}
                    className="flex items-center h-8 w-8 -mr-5 mt-2 rounded-r-xl bg-yellow-200 hover:bg-yellow-300 text-yellow-700 shadow border border-yellow-400 transition"
                    style={{
                      borderLeft: "none",
                      borderTopLeftRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      borderRight: "4px solid #ffe066",
                      fontSize: "1rem",
                    }}
                    title="Add new note"
                  >
                    <span className="mx-auto text-xl font-bold">+</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-area flex-1 overflow-y-auto bg-gray-100">
          {filteredTools.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              You haven't pinned any tools yet.<br />
              Go to the Home page and click the <Star className="inline w-3 h-3 text-yellow-400" /> to add tools to your hub.
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 pb-16">
              {filteredTools.map((tool, idx) => (
                <ToolCard
                  key={tool.id || idx}
                  tool={tool}
                  isFavourite={true}
                  onFavourite={() => {}}
                  clickedStar={null}
                  onClick={handleCardClick}
                  disabled={!isSignedIn}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}