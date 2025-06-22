import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import dretaiLogo from "./assets/dretai-logo.png";

const navItems = [
  { label: "Home", icon: "fas fa-home", to: "/" },
  { label: "My Hub", icon: "fas fa-th-large", to: "/hub" },
  { label: "Chat", icon: "fas fa-comments", to: "/chat" },
];

const Layout = ({ children }) => {
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
      <aside className="w-60 bg-[var(--trust-green)] text-white h-screen fixed left-0 top-0 flex flex-col justify-between">
        <img
          src={dretaiLogo}
          alt="DRET.AI Logo"
          className="w-full h-full object-contain"
          style={{ display: "block", maxHeight: "96px" }}
        />
        {isSignedIn && (
          <div className="p-6 flex flex-col gap-4 overflow-y-auto mt-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-[#184b34] transition"
              >
                <i className={item.icon}></i> {item.label}
              </Link>
            ))}
          </div>
        )}
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
      <main className="ml-60 w-full min-h-screen overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default Layout;