import React from "react";
import { useMsal } from "@azure/msal-react";

function LoginSplash({ onLogin }) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh)] w-full bg-gray-100 font-avenir">
      <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col items-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[var(--trust-green)] font-avenir">Welcome to DRET.AI</h1>
        <button
          onClick={onLogin}
          className="bg-[var(--trust-green)] text-white px-8 py-2 rounded-full font-semibold text-lg hover:bg-green-900 transition font-avenir"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default function RequireAuth({ children }) {
  const { accounts, instance } = useMsal();
  const isSignedIn = accounts.length > 0;

  if (!isSignedIn) {
    return (
      <div className="h-screen flex items-center justify-center font-avenir">
        <LoginSplash onLogin={() => instance.loginRedirect()} />
      </div>
    );
  }

  return children;
}
