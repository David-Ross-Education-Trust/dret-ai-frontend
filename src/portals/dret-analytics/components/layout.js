import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useLocation, Link } from "react-router-dom";
import dretAnalyticsLogo from "../../../assets/dretai-logo.png";

// You can keep navItems with 'icon' properties or remove the 'icon' fields, but they're unused now:
const navItems = [
  { label: "Favourites", to: "/analytics" },
  { label: "Education Dashboards", to: "/analytics/education" },
  { label: "Education Toolkit", to: "/analytics/toolkit" },
  { label: "Operations", to: "/analytics/operations" },
  { label: "Finance", to: "/analytics/finance" },
  { label: "HR", to: "/analytics/hr" },
  { label: "IT & Data", to: "/analytics/it-data" },
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
      {/* Sidebar */}
      <aside
        className={`bg-[var(--trust-green)] text-white h-full transition-all duration-300 flex flex-col fixed top-0 left-0 z-40 shadow-lg ${
          sidebarOpen ? "w-60" : "w-14"
        }`}
        style={{ minWidth: sidebarOpen ? sidebarWidth : sidebarMiniWidth }}
      >
        <div className="flex flex-col flex-1">
          {allowSidebarMinimise && (
            <div className="relative flex items-center justify-center h-24">
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                className="absolute right-[-18px] top-1/2 -translate-y-1/2 bg-white text-[var(--trust-green)] border border-gray-200 rounded-full shadow hover:bg-gray-200 transition-all w-9 h-9 flex items-center justify-center"
                style={{
                  boxShadow: "0 2px 8px 0 rgba(32,92,64,0.09)",
                }}
              >
                {sidebarOpen ? (
                  <HiChevronLeft size={22} />
                ) : (
                  <HiChevronRight size={22} />
                )}
              </button>
            </div>
          )}
          {/* Nav */}
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
                    flex items-center px-4 py-3 rounded font-avenir transition-transform duration-150 relative group
                    hover:scale-[1.04]
                  `}
                  style={{
                    color: "#fff",
                    fontWeight: 400,
                    fontFamily: "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif",
                    transition: "transform 0.18s cubic-bezier(.4,0,.2,1)",
                  }}
                >
                  {/* Bullet point: right next to the label, only if selected */}
                  {isSelected && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      style={{
                        display: "inline-block",
                        marginRight: "6px",
                      }}
                    >
                      <circle cx="5" cy="5" r="4" fill="white" />
                    </svg>
                  )}
                  <span>{sidebarOpen ? item.label : ""}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        {/* User/Profile section, always pinned to bottom */}
        {isSignedIn && (
          <div className="relative p-4 border-t border-[#184b34] font-avenir">
            <div
              onClick={isSignedIn ? () => setMenuOpen(!menuOpen) : handleLogin}
              className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-[#184b34] transition font-avenir"
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
              <div className="absolute bottom-16 left-4 bg-white text-black rounded shadow-md w-48 z-50 font-avenir">
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
        {showHeader && headerContent}
        {typeof children === "function"
          ? children({ sidebarOpen })
          : children}
      </main>
    </div>
  );
};

export default AnalyticsLayout;
