import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, Link } from "react-router-dom";
import dretAnalyticsLogo from "../../../assets/dretai-logo.png";

// Sidebar items
const navItems = [
  { label: "Favourites", to: "/analytics" },
  { label: "Education", to: "/analytics/education" },
  { label: "Operations", to: "/analytics/operations" },
  { label: "Finance", to: "/analytics/finance" },
  { label: "HR", to: "/analytics/hr" },
  { label: "IT & Data", to: "/analytics/it-data" },
  { label: "Toolbox", to: "/analytics/toolbox" }, // Toolbox always last
];

const AnalyticsLayout = ({
  children,
  allowSidebarMinimise = false,
  hideHeaderWithSidebar = false,
  headerContent = null,
}) => {
  const { accounts, instance } = useMsal();
  const account = accounts[0];
  const isSignedIn = !!account;
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const location = useLocation();
  const sidebarWidth = 240;
  const sidebarMiniWidth = 56;

  const showHeader = !(hideHeaderWithSidebar && !sidebarOpen);

  const handleLogin = () => instance.loginRedirect();
  const handleLogout = () => instance.logoutRedirect();

  return (
    <div className="flex font-avenir h-screen bg-gray-50">
      {/* Sidebar Toggle Button - always top left */}
      {allowSidebarMinimise && (
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="fixed top-3 left-3 z-50 bg-white/90 text-[var(--trust-green)] border border-gray-200 rounded-full shadow hover:bg-gray-200 transition-all w-9 h-9 flex items-center justify-center"
          style={{
            boxShadow: "0 2px 8px 0 rgba(32,92,64,0.09)",
          }}
        >
          {sidebarOpen ? <HiChevronDoubleLeft size={22} /> : <HiChevronDoubleRight size={22} />}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`bg-[var(--trust-green)] text-white h-full transition-all duration-300 flex flex-col justify-between fixed top-0 left-0 z-40 shadow-lg ${
          sidebarOpen ? "w-60" : "w-14"
        }`}
        style={{ minWidth: sidebarOpen ? sidebarWidth : sidebarMiniWidth }}
      >
        <div>
          <div className="flex items-center justify-center h-20 transition-all duration-200">
            {/* Hide logo when minimised */}
            {sidebarOpen && (
              <img
                src={dretAnalyticsLogo}
                alt="Analytics Logo"
                className="object-contain"
                style={{
                  maxHeight: 64,
                  width: "100%",
                  transition: "width 0.2s",
                }}
              />
            )}
          </div>
          <nav className="mt-6 flex flex-col gap-1">
            {navItems.map((item, idx) => {
              const isSelected =
                location.pathname === item.to ||
                (item.label === "Favourites" && location.pathname.startsWith("/analytics/favourites"));
              return (
                <Link
                  key={idx}
                  to={item.to}
                  className={`
                    flex items-center px-6 py-3 rounded font-avenir transition-transform duration-150 relative group
                    hover:scale-110
                    ${isSelected ? "scale-110 font-semibold" : ""}
                  `}
                  style={{
                    color: "#fff",
                    fontWeight: isSelected ? 600 : 400,
                    transition: "transform 0.18s cubic-bezier(.4,0,.2,1)",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      position: "relative",
                      minWidth: 10,
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
                          left: "-18px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <circle cx="5" cy="5" r="4" fill="white" />
                      </svg>
                    )}
                  </span>
                  <span className="ml-2">
                    {sidebarOpen ? item.label : item.label[0]}
                  </span>
                </Link>
              );
            })}
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

      {/* Main content */}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-60" : "ml-14"
        } flex-1 min-h-screen bg-gray-50`}
        style={{
          maxWidth: "100vw",
          paddingTop: 0,
        }}
      >
        {/* Header: only render if actually passed in */}
        {showHeader && headerContent}
        {/* Children: if function, pass sidebarOpen for layout-aware rendering */}
        {typeof children === "function"
          ? children({ sidebarOpen })
          : children}
      </main>
    </div>
  );
};

export default AnalyticsLayout;
