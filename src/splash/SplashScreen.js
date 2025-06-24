import React from "react";
import { useNavigate } from "react-router-dom";
import dretaiLogo from "../assets/dretai-logo.png"; // adjust path if needed

export default function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "var(--trust-green, #205c40)" }}
    >
      <img
        src={dretaiLogo}
        alt="DRET.AI Logo"
        className="mb-8"
        style={{
          width: "200px",
          height: "auto",
          filter: "drop-shadow(0 2px 10px #13351d35)",
        }}
      />
      <div className="flex flex-col gap-5 w-full max-w-xs">
        <button
          className="bg-white text-[var(--trust-green)] font-avenir font-semibold rounded-full py-3 px-6 shadow-md text-lg transition hover:bg-gray-100"
          onClick={() => navigate("/analytics")}
        >
          Continue to DRET Analytics
        </button>
        <button
          className="bg-white text-[var(--trust-green)] font-avenir font-semibold rounded-full py-3 px-6 shadow-md text-lg transition hover:bg-gray-100"
          onClick={() => navigate("/ai")}
        >
          Continue to DRET AI
        </button>
      </div>
    </div>
  );
}
