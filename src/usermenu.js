import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { FaUserCircle } from "react-icons/fa";

const UserMenu = () => {
  const { accounts, instance } = useMsal();
  const account = accounts[0];
  const isSignedIn = !!account;

  const [open, setOpen] = useState(false);

  const handleLogin = () => instance.loginRedirect();
  const handleLogout = () => instance.logoutRedirect();

  return (
    <div className="relative">
      <div
        className="flex items-center gap-3 px-4 py-3 rounded hover:bg-green-800 transition cursor-pointer"
        onClick={() => {
          if (isSignedIn) {
            setOpen(!open);
          } else {
            handleLogin();
          }
        }}
      >
        <FaUserCircle className="text-xl" />
        <div className="text-sm">
          {isSignedIn ? (
            <div className="font-medium">{account.name}</div>
          ) : (
            <div className="font-medium">Sign in</div>
          )}
        </div>
      </div>

      {/* Dropdown menu */}
      {isSignedIn && open && (
        <div className="absolute left-4 bottom-14 w-40 bg-white text-gray-800 rounded-md shadow-md z-50">
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-t-md"
            onClick={() => alert("Preferences coming soon!")}
          >
            Preferences
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-b-md"
            onClick={handleLogout}
          >
            Sign out
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
