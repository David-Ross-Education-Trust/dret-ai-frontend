import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import dretAnalyticsLogo from "../../../assets/dretai-logo.png";

// Add/adjust links as needed!
const navItems = [
  { label: "Favourites", to: "/analytics/favourites" },
  { label: "Education", to: "/analytics/education" },
  { label: "Operations", to: "/analytics/operations" },
  { label: "Finance", to: "/analytics/finance" },
  { label: "HR", to: "/analytics/hr" },
  { label: "IT & Data", to: "/analytics/it-data" },
];

const isReportPage = (pathname) => pathname.startsWith("/analytics/report");

const AnalyticsLayout = ({ children }) => {
  const { accounts, instance } = useMsal();
  const account = accounts[0];
  const isSignedIn = !!account;
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Only allow sidebar to be collapsed on report pages
  const allowSidebarHide = isReportPage(location.pathname);

  const handleLogin = () => instance.loginRedirect();
  const handleLogout = () => instance.logoutRedirect();

  // When sidebar is hidden, also hide header on report pages
  const hideAll = allowSidebarHide && !sidebarOpen;

  return (
    <div className="flex font-avenir h-screen bg-gray-50" style={{ fontFamily: "AvenirLTStdLight, Avenir, sans-serif" }}>
      {/* Sidebar */}
      <aside
        className={`bg-[var(--trust-green)] text-white h-full transition-all duration-300 flex flex-col justify-between fixed top-0 left-0 z-40 shadow-lg ${
          sidebarOpen ? "w-60" : "w-0"
        }`}
        style={{
          minWidth: sidebarOpen ? 240 : 0,
          width: sidebarOpen ? 240 : 0,
          overflow: "hidden",
          pointerEvents: sidebarOpen ? "auto" : "none",
        }}
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
          {isSignedIn && (
            <div className="p-6 flex flex-col gap-4 overflow-y-auto mt-4 font-avenir">
              {navItems.map((item, idx) => {
                const isSelected = location.pathname === item.to;
                return (
                  <Link
                    key={idx}
                    to={item.to}
                    className={`
                      flex items-center px-4 py-2 rounded font-avenir transition-transform duration-150 relative group
                      hover:scale-110
                    `}
                    style={{
                      color: "#fff",
                      fontWeight: 400,
                      transition: "transform 0.18s cubic-bezier(.4,0,.2,1)"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        position: "relative"
                      }}
                    >
                      {isSelected && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          style={{
                            display: "inline-block",
                            position: "absolute",
                            left: "-16px",
                            top: "50%",
                            transform: "translateY(-50%)"
                          }}
                        >
                          <circle cx="5" cy="5" r="4" fill="white" />
                        </svg>
                      )}
                    </span>
                    <span className="ml-2">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        {isSignedIn && (
          <div className="relative p-4 border-t border-[#184b34]">
            <div
              onClick={isSignedIn ? () => setMenuOpen(!menuOpen) : handleLogin}
              className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-[#184b34] transition"
            >
              <FaUserCircle className="text-2xl" />
              {sidebarOpen && (
                <div className="flex items-center gap-1">
                  <span className="font-medium text-sm">{account.name}</span>
                  <FiChevronDown className="text-xs" />
                </div>
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
      {/* Sidebar Minimise/Maximise Button */}
      {allowSidebarHide && (
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
      )}
      {/* Main content */}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-60" : "ml-0"
        } flex-1 min-h-screen bg-gray-50`}
        style={{
          maxWidth: "100vw",
        }}
      >
        {/* Hide header/title bar if on report page and sidebar is hidden */}
        {!(hideAll) && children}
        {/* If hideAll, show only children that are the full report (no header) */}
        {hideAll &&
          React.Children.map(children, child =>
            // Remove headers from report pages
            React.cloneElement(child, { hideHeader: true })
          )
        }
      </main>
    </div>
  );
};

export default AnalyticsLayout;
