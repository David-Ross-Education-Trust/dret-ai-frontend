// src/splash/SplashScreen.js

import React from "react";
import dretaiLogo from "../assets/dretai-logo.png"; // Adjust if your logo is elsewhere

export default function SplashScreen({ onSignIn }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-avenir">
      <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col items-center max-w-md w-full mx-auto">
        <img
          src={dretaiLogo}
          alt="DRET.AI Logo"
          className="w-36 h-36 object-contain mb-4"
          style={{ filter: "drop-shadow(0 2px 12px #205c4020)" }}
        />
        <h1 className="text-4xl font-bold mb-3 text-[var(--trust-green)] font-avenir tracking-tight">
          Welcome to DRET.AI
        </h1>
        <p className="text-gray-600 font-avenir text-center mb-8">
          Your personal AI assistant for teaching, learning, and leadership.
        </p>
        <button
          onClick={onSignIn}
          className="bg-[var(--trust-green)] text-white px-8 py-2 rounded-full font-semibold text-lg hover:bg-trust-green-dark transition font-avenir shadow-md"
        >
          Sign in with DRET
        </button>
        <div className="mt-8 text-xs text-gray-400 font-avenir">
          © {new Date().getFullYear()} DRET.AI. All rights reserved.
        </div>
      </div>
    </div>
  );
}