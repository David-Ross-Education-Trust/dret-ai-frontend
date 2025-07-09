import React, { useEffect, useState } from "react";
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
  const { instance, accounts } = useMsal();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    try {
      const allAccounts = instance.getAllAccounts();
      setIsSignedIn(allAccounts.length > 0);
    } catch (err) {
      console.error("❌ MSAL account check failed:", err);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }, [instance]);

  if (loading) {
    return null; // or a splash/loading spinner
  }

  if (hasError) {
    return (
      <div className="text-red-600 p-10 text-center">
        <h1>Something went wrong during login check.</h1>
        <p>Try refreshing the page or using a different browser.</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return <LoginSplash onLogin={() => instance.loginRedirect()} />;
  }

  return children;
}
