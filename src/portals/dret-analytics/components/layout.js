import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import dretAnalyticsLogo from "../../../assets/dretai-logo.png";

const navItems = [
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
    <div className="flex font-avenir h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-[var(--trust-green)] text-white h-full transition-all duration-300 flex flex-col justify-between fixed top-0 left-0 z-40 shadow-lg ${
          sidebarOpen ? "w-60" : "w-14"
        }`}
        style={{ minWidth: sidebarOpen ? 240 : 56 }}
      >
        <div>
          <div className="flex items-center justify-center h-20">
            <img
              src={dretAnalyticsLogo}
              alt="Analytics Logo"
              className="object-contain"
              style={{
                maxHeight: 64,
                width: sidebarOpen ? "100%" : 40,
                transition: "width 0.2s",
              }}
            />
          </div>
          <nav className="mt-6 flex flex-col gap-2">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.to}
                className={`block px-6 py-3 text-base rounded transition-all duration-100 ${
                  sidebarOpen ? "text-white" : "text-white text-center"
                } hover:bg-[#205c40]/80`}
                style={{ whiteSpace: "nowrap" }}
              >
                {sidebarOpen ? item.label : item.label[0]}
              </a>
            ))}
          </nav>
        </div>
        {isSignedIn && (
          <div className="relative p-4 border-t border-[#184b34]">
            <div
              onClick={isSignedIn ? () => setMenuOpen(!menuOpen) : handleLogin}
              className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-[#184b34] transition"
            >
              <FaUserCircle className="text-2xl" />
              {sidebarOpen && (
                isSignedIn ? (
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-sm">{account.name}</span>
                    <FiChevronDown className="text-xs" />
                  </div>
                ) : (
                  <span className="font-medium text-sm">Sign in</span>
                )
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
      {/* Minimise/maximise button */}
      <button
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        className="fixed left-0 top-4 z-50 bg-white text-[var(--trust-green)] border border-gray-200 rounded-full shadow hover:bg-gray-200 transition-all w-8 h-8 flex items-center justify-center"
        style={{
          left: sidebarOpen ? 240 : 8,
          transition: "left 0.2s",
        }}
      >
        {sidebarOpen ? <HiChevronDoubleLeft size={20} /> : <HiChevronDoubleRight size={20} />}
      </button>
      {/* Main content */}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-60" : "ml-14"
        } flex-1 min-h-screen bg-gray-50`}
        style={{
          maxWidth: "100vw",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default AnalyticsLayout;
