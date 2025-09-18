import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { FiLogOut } from "react-icons/fi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useLocation, Link } from "react-router-dom";
import dretAnalyticsLogo from "../../../assets/dret-analytics-logo.png";

const navItems = [
  { label: "Favourites", to: "/analytics" },
  { label: "Education Dashboards", to: "/analytics/education" },
  { label: "Education Toolkits", to: "/analytics/toolkits" },
  { label: "Governance", to: "/analytics/governance" },
  { label: "Operations", to: "/analytics/operations", disabled: true },
  { label: "Finance", to: "/analytics/finance", disabled: true },
  { label: "HR", to: "/analytics/hr", disabled: true },
  { label: "IT & Data", to: "/analytics/it-data", disabled: true },
];

const AnalyticsLayout = ({
  children,
  allowSidebarMinimise = false,
  hideHeaderWithSidebar = false,
  headerContent = null,
  reportIssueHref = "/analytics/report-issue",
}) => {
  const { accounts, instance } = useMsal();
  const account = accounts[0];
  const isSignedIn = !!account;

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const location = useLocation();
  const sidebarWidth = 240;
  const sidebarMiniWidth = 56;

  const showHeader = !(hideHeaderWithSidebar && !sidebarOpen);

  const handleLogout = () => instance.logoutRedirect();
  const handleReportIssue = () => {
    try {
      window.open(reportIssueHref, "_blank", "noopener,noreferrer");
    } catch {
      /* no-op */
    }
  };

  return (
    <div className="flex font-avenir h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-[var(--trust-green)] text-white h-screen transition-all duration-300 flex flex-col fixed top-0 left-0 z-40 shadow-lg ${
          sidebarOpen ? "w-60" : "w-14"
        }`}
        style={{ minWidth: sidebarOpen ? sidebarWidth : sidebarMiniWidth }}
      >
        {/* Logo area and chevron toggle */}
        {sidebarOpen ? (
          <div className="w-full h-24 flex items-center relative">
            <img
              src={dretAnalyticsLogo}
              alt="Analytics Logo"
              className="w-full h-full object-contain"
              style={{ display: "block", maxHeight: "80px" }}
            />
            {allowSidebarMinimise && (
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                aria-label="Collapse sidebar"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-[var(--trust-green)] border border-gray-200 rounded-full shadow hover:bg-gray-200 transition-all w-9 h-9 flex items-center justify-center"
                style={{ boxShadow: "0 2px 8px 0 rgba(32,92,64,0.09)" }}
              >
                <HiChevronLeft size={22} />
              </button>
            )}
          </div>
        ) : (
          allowSidebarMinimise && (
            <div className="w-full h-24 flex items-center justify-center relative">
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                aria-label="Expand sidebar"
                className="bg-white text-[var(--trust-green)] border border-gray-200 rounded-full shadow hover:bg-gray-200 transition-all w-9 h-9 flex items-center justify-center"
                style={{ boxShadow: "0 2px 8px 0 rgba(32,92,64,0.09)" }}
              >
                <HiChevronRight size={22} />
              </button>
            </div>
          )
        )}

        {/* Nav under logo */}
        <nav className="mt-6 flex flex-col gap-1">
          {navItems.map((item, idx) => {
            const isSelected =
              location.pathname === item.to ||
              (item.label === "Favourites" &&
                location.pathname.startsWith("/analytics/favourites"));
            const isDisabled = !!item.disabled;

            if (isDisabled) {
              return (
                <div
                  key={idx}
                  aria-disabled="true"
                  title={`${item.label} (coming soon)`}
                  className={`
                    flex items-center px-4 py-3 rounded transition-transform duration-150 relative
                    ${sidebarOpen ? "" : "justify-center"}
                    opacity-60 cursor-not-allowed text-white/70 font-normal
                  `}
                >
                  <span>{sidebarOpen ? item.label : ""}</span>
                </div>
              );
            }

            return (
              <Link
                key={idx}
                to={item.to}
                className={`
                  flex items-center px-4 py-3 rounded transition-transform duration-150 relative group
                  hover:scale-[1.04]
                  ${sidebarOpen ? "" : "justify-center"}
                  text-white font-normal
                `}
              >
                {isSelected && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    style={{ display: "inline-block", marginRight: "6px" }}
                  >
                    <circle cx="5" cy="5" r="4" fill="white" />
                  </svg>
                )}
                <span>{sidebarOpen ? item.label : ""}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom stack (only when expanded): Report link + user row */}
        {sidebarOpen && (
          <div className="mt-auto">
            {/* Report an issue */}
            <div className="px-4 pt-2 pb-2 -mt-1">
              <button
                onClick={handleReportIssue}
                className="text-sm font-medium text-white/85 hover:text-white transition-colors"
                aria-label="Report an issue"
                title="Report an issue"
                type="button"
              >
                Report an issue
              </button>
            </div>

            {/* User row */}
            {isSignedIn && (
              <div className="px-4 py-3 border-t border-[#184b34]">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-sm text-white">
                    {account.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    aria-label="Sign out"
                    title="Sign out"
                    className="p-1"
                    type="button"
                  >
                    <FiLogOut
                      size={18}
                      className="text-white opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </button>
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
        style={{ maxWidth: "100vw", paddingTop: 0 }}
      >
        {showHeader && headerContent}
        {typeof children === "function" ? children({ sidebarOpen }) : children}
      </main>
    </div>
  );
};

export default AnalyticsLayout;
