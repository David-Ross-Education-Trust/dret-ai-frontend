import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import dretAnalyticsLogo from "../../../assets/dretai-logo.png";

const sidebarSections = [
  {
    heading: "Education",
    links: [{ label: "Analytics Home", to: "/analytics" }]
  },
  {
    heading: "Operations",
    links: []
  },
  {
    heading: "Finance",
    links: []
  },
  {
    heading: "HR",
    links: []
  },
  {
    heading: "IT & Data",
    links: []
  }
];

const AnalyticsLayout = ({ children, sidebarHidden = false }) => {
  const { accounts, instance } = useMsal();
  const account = accounts[0];
  const isSignedIn = !!account;
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogin = () => instance.loginRedirect();
  const handleLogout = () => instance.logoutRedirect();

  return (
    <div
      className="flex font-avenir"
      style={{ fontFamily: "AvenirLTStdLight, Avenir, sans-serif" }}
    >
      {!sidebarHidden && (
        <aside className="w-60 bg-[var(--trust-green)] text-white h-screen fixed left-0 top-0 flex flex-col justify-between font-avenir shadow-xl z-10">
          <Link to="/analytics" className="w-full h-24 flex items-center">
            <img
              src={dretAnalyticsLogo}
              alt="DRET Analytics Logo"
              className="w-full h-full object-contain"
              style={{ display: "block", maxHeight: "90px" }}
            />
          </Link>
          {isSignedIn && (
            <div className="p-6 flex flex-col gap-6 overflow-y-auto mt-4 font-avenir">
              {sidebarSections.map((section, idx) => (
                <div key={section.heading}>
                  <div className="font-semibold text-md tracking-wide uppercase text-trust-green-light mb-2">
                    {section.heading}
                  </div>
                  <div className="flex flex-col gap-2">
                    {section.links.length === 0 && (
                      <span className="text-gray-200 text-xs italic">No links yet</span>
                    )}
                    {section.links.map((item, index) => {
                      const isSelected = location.pathname === item.to;
                      return (
                        <Link
                          key={item.label}
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
                </div>
              ))}
            </div>
          )}
          {isSignedIn && (
            <div className="relative p-4 border-t border-[#184b34] font-avenir">
              <div
                onClick={isSignedIn ? () => setMenuOpen(!menuOpen) : handleLogin}
                className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-[#184b34] transition font-avenir"
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
      )}
      <main
        className={`min-h-screen overflow-y-auto bg-gray-50 font-avenir transition-all duration-300 ${
          sidebarHidden ? "ml-0 w-full" : "ml-60 w-full"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default AnalyticsLayout;
