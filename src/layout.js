import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import dretaiLogo from "./assets/dretai-logo.png";

const navItems = [
  { label: "Home", icon: "fas fa-home", to: "/ai/home" },
  { label: "Tools", icon: "fas fa-toolbox", to: "/ai/tools" },
  { label: "My Hub", icon: "fas fa-th-large", to: "/ai/myhub" },
  { label: "Student Hub", icon: "fas fa-user-graduate", to: "/ai/student-hub" },
];

const Layout = ({ children }) => {
  const { accounts, instance } = useMsal();
  const account = accounts[0];
  const isSignedIn = !!account;
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogin = () => {
    instance.loginRedirect();
  };

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <div
      className="flex font-avenir"
      style={{ fontFamily: "AvenirLTStdLight, Avenir, sans-serif" }}
    >
      <aside className="w-60 bg-[var(--trust-green)] text-white h-screen fixed left-0 top-0 flex flex-col justify-between font-avenir">
        <Link to="/" className="w-full h-24 flex items-center">
          <img
            src={dretaiLogo}
            alt="DRET.AI Logo"
            className="w-full h-full object-contain"
            style={{ display: "block", maxHeight: "90px" }}
          />
        </Link>
        {isSignedIn && (
          <div className="p-6 flex flex-col gap-4 overflow-y-auto mt-4 font-avenir">
            {navItems.map((item, index) => {
              const isSelected = location.pathname === item.to;
              return (
                <Link
                  key={index}
                  to={item.to}
                  className={`flex items-center px-4 py-2 rounded font-avenir transition-transform duration-150 relative group ${
                    isSelected ? "" : "hover:scale-110"
                  }`}
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
                        width="14"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="white"
                        style={{
                          display: "inline-block",
                          position: "absolute",
                          left: "-18px", // Closer to icon/text
                          top: "50%",
                          transform: "translateY(-50%)"
                        }}
                      >
                        <polygon points="0,7 8,3 8,11" />
                      </svg>
                    )}
                    <i className={item.icon}></i>
                  </span>
                  <span className="ml-2">{item.label}</span>
                </Link>
              );
            })}
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
      <main className="ml-60 w-full min-h-screen overflow-y-auto bg-gray-50 font-avenir">
        {children}
      </main>
    </div>
  );
};

export default Layout;
