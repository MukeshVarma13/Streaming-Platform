import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 px-4 py-1 rounded-3xl"
      >
        <img
          src="/profile.jpeg"
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex flex-col items-start pr-2">
          <span className="font-bold text-sm">Mukesh Varma</span>
          <span className="text-xs text-red-400">Online</span>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white border border-gray-200 z-10 bg-theme">
          <div className="p-3">
            {/* Section 1: Profile & Actions */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2 cursor-not-allowed">
                <img
                  src="/icon.png"
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-grade">Mukesh Varma</p>
                  <p className="text-xs">mukeshvarma7676@gmail.com</p>
                </div>
              </div>
              <NavLink to="/profile">
                <MenuItem label="Profile" />
              </NavLink>
              <NavLink to="/edit-profile">
                <MenuItem label="Edit Profile" />
              </NavLink>
              <NavLink to="/dashboard">
                <MenuItem label="Dashboard" />
              </NavLink>
              <NavLink to="/setting">
                <MenuItem label="Settings" />
              </NavLink>
            </div>

            {/* Section 2: Preferences */}
            <div className="mb-3 border-t border-gray-200 pt-3">
              <MenuItem label="Quick search" shortcut="⌘K" />
              <div className="flex justify-between items-center px-2 py-1 text-sm text-gray-600 cursor-default">
                Theme
                <select className="text-sm border border-gray-300 rounded px-1 py-0.5">
                  <option>System</option>
                  <option>Dark</option>
                  <option>Light</option>
                </select>
              </div>
            </div>

            {/* Section 3: Help & Feedback */}
            <div className="border-t border-gray-200 pt-3">
              <MenuItem label="Help & Feedback" />
              <MenuItem label="Log Out" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ label, shortcut }) {
  return (
    <div className="flex justify-between items-center px-2 py-1 text-sm hover:text-gray-900 hover:bg-gray-100 rounded-md cursor-pointer">
      {label}
      {shortcut && <span className="text-xs text-gray-400">{shortcut}</span>}
    </div>
  );
}
