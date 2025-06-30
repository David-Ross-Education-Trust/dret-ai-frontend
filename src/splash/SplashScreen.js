import React from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "var(--trust-green, #205c40)" }}
    >
      {/* Removed logo for minimalism */}
      <div className="flex flex-col gap-5 w-full max-w-xs">
        <button
          className="bg-white text-[var(--trust-green)] font-avenir font-semibold rounded-full py-3 px-6 shadow-md text-lg transition hover:bg-gray-100"
          onClick={() => navigate("/analytics")}
        >
          Continue to DRET Analytics
        </button>
        <button
          className="bg-white text-[var(--trust-green)] font-avenir font-semibold rounded-full py-3 px-6 shadow-md text-lg transition hover:bg-gray-100"
          onClick={() => navigate("/ai/home")}
        >
          Continue to DRET AI
        </button>
      </div>
    </div>
  );
}