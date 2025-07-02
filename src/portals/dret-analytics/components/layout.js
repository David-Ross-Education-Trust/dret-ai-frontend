// portals/dret-analytics/components/layout.js
import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { Menu } from "lucide-react";
import dretAnalyticsLogo from "../../../assets/dretai-logo.png";

// Sidebar nav items
const analyticsNavItems = [
  { label: "Education", to: "/analytics/education" },
  { label: "Operations", to: "/analytics/operations" },
  { label: "Finance", to: "/analytics/finance" },
  { label: "HR", to: "/analytics/hr" },
  { label: "IT & Data", to: "/analytics/it-data" },
];

const AnalyticsLayout = ({ children }) => {
  const { accounts, instance } = useMsal();
  const account = accounts[0];
  const isSignedIn = !!account;
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = () => instance.loginRedirect();
  const handleLogout = () => instance.logoutRedirect();

  return (
    <div className="flex font-sans">
      {/* Sidebar */}
      <aside
        className={`
          ${sidebarOpen ? "w-60" : "w-0"}
          bg-[var(--trust-green)] text-white h-screen fixed left-0 top-0 flex flex-col justify-between
          transition-all duration-200 z-40
          ${sidebarOpen ? "border-r border-[#205c40]/10 shadow-lg" : ""}
        `}
        style={{ overflow: "hidden" }}
      >
        {/* Sidebar Header/Logo */}
        <div className="w-full h-24 flex items-center px-4">
          {sidebarOpen && (
            <img
              src={dretAnalyticsLogo}
              alt="Analytics Logo"
              className="w-full h-full object-contain"
              style={{ display: "block", maxHeight: "90px" }}
            />
          )}
        </div>

        {/* Nav Items */}
        {sidebarOpen && isSignedIn && (
          <div className="p-6 flex flex-col gap-4 overflow-y-auto mt-4">
            {analyticsNavItems.map((item, idx) => (
              <a
                key={idx}
                href={item.to}
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-white/10 transition"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

        {/* User/Profile */}
        {sidebarOpen && isSignedIn && (
          <div className="relative p-4 border-t border-[#184b34]">
            <div
              onClick={isSignedIn ? () => setMenuOpen(!menuOpen) : handleLogin}
              className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-[#184b34] transition"
            >
              <FaUserCircle className="text-2xl" />
              <div className="flex items-center gap-1">
                <span className="font-medium text-sm">{account.name}</span>
                <FiChevronDown className="text-xs" />
              </div>
            </div>
            {menuOpen && (
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

        {/* Toggle button: always visible & easy to click */}
        <button
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => setSidebarOpen((s) => !s)}
          className={`
            absolute top-4 ${sidebarOpen ? "right-[-20px]" : "left-4"}
            bg-[var(--trust-green)] border-2 border-white/30 rounded-full w-10 h-10 flex items-center justify-center shadow-xl z-50
            hover:bg-[var(--trust-green-dark)] transition
          `}
          style={{ cursor: "pointer" }}
        >
          <Menu className="w-6 h-6" />
        </button>
      </aside>

      {/* Main content area */}
      <main
        className={`
          transition-all duration-300 bg-gray-50 min-h-screen flex flex-col
          ${sidebarOpen ? "ml-60" : "ml-0"}
        `}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </main>
    </div>
  );
};

export default AnalyticsLayout;
