import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import dretAnalyticsLogo from "../../../assets/dretai-logo.png";

const analyticsNavItems = [
  { label: "Analytics Home", to: "/analytics" },
  { label: "Reports", to: "/analytics" },
];

const AnalyticsLayout = ({ children, sidebarHidden = false }) => {
  const { accounts, instance } = useMsal();
  const account = accounts[0];
  const isSignedIn = !!account;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = () => {
    instance.loginRedirect();
  };

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <div className="flex font-sans">
      {/* SIDEBAR */}
      {!sidebarHidden && (
        <aside className="w-60 bg-trust-green text-white h-screen fixed left-0 top-0 flex flex-col justify-between z-10">
          <div>
            <div className="w-full h-24 flex items-center">
              <img
                src={dretAnalyticsLogo}
                alt="Analytics Logo"
                className="w-full h-full object-contain"
                style={{ display: "block", maxHeight: "90px" }}
              />
            </div>
            <div className="p-6 flex flex-col gap-4 overflow-y-auto mt-4">
              {analyticsNavItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.to}
                  className="flex items-center gap-2 px-4 py-2 rounded hover:bg-trust-green transition"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          {isSignedIn && (
            <div className="relative p-4 border-t border-[#184b34]">
              <div
                onClick={isSignedIn ? () => setMenuOpen(!menuOpen) : handleLogin}
                className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-[#184b34] transition"
              >
                <FaUserCircle className="text-2xl" />
                {isSignedIn ? (
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-sm">{account.name}</span>
                    <FiChevronDown className="text-xs" />
                  </div>
                ) : (
                  <span className="font-medium text-sm">Sign in</span>
                )}
              </div>
              {isSignedIn && menuOpen && (
                <div className="absolute bottom-16 left-4 bg-white text-black rounded shadow-md w-48 z-50">
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => alert("Preferences coming soon!")}
                  >
                    Preferences
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Sign out
                  </div>
                </div>
              )}
            </div>
          )}
        </aside>
      )}
      {/* MAIN */}
      <main
        className={`min-h-screen overflow-y-auto bg-gray-50 transition-all duration-300 ${
          sidebarHidden ? "ml-0 w-full" : "ml-60 w-full"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default AnalyticsLayout;
