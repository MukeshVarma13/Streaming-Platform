import { useState, useRef, useEffect, use, useContext } from "react";
import { Link, NavLink } from "react-router";
import { baseURL } from "../config/AxiosHelper";
import { UserContext } from "../context/UserDetailsContext";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const { userDetail } = useContext(UserContext);
  const dropdownRef = useRef();
  const toggleDropdown = () => setOpen(!open);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    // console.log("Logout clicked");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!userDetail) {
    return (
      <div>
        <button
          onClick={() => setAuthMenuOpen(!authMenuOpen)}
          className="px-4 py-2 bg-theme text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Account
        </button>
        {authMenuOpen && !userDetail && (
          <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white border border-gray-200 z-10 bg-theme p-4 transform animate-slideDown">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Welcome 👋
            </h3>

            <Link
              to="/auth"
              className="block w-full text-center py-2 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-black"
            >
              Login
            </Link>

            <Link
              to="/auth/sign-up"
              className="block w-full text-center py-2 rounded-lg body-theme text-white hover:bg-indigo-700 transition"
            >
              Sign Up
            </Link>

            <p className="mt-3 text-xs text-center text-gray-500">
              Secure login • OTP supported
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    userDetail && (
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="py-1 flex items-center gap-2 px-3 hover-theme rounded-lg"
        >
          <img
            src={baseURL + userDetail.profilePic}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex flex-col items-start pr-2">
            <span className="font-bold text-sm">{userDetail.name}</span>
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
                    src={baseURL + userDetail.profilePic}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-grade">
                      {userDetail.name}
                    </p>
                    <p className="text-xs">{userDetail.email}</p>
                  </div>
                </div>
                <NavLink to="/profile">
                  <MenuItem label="Profile" />
                </NavLink>
                <NavLink to="/setting">
                  <MenuItem label="Settings" />
                </NavLink>
              </div>

              {/* Section 2: Preferences */}
              {/* <div className="mb-3 border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center px-2 py-1 text-sm text-gray-600 cursor-default">
                  Theme
                  <select className="text-sm border border-gray-300 rounded px-1 py-0.5">
                    <option>System</option>
                    <option>Dark</option>
                    <option>Light</option>
                  </select>
                </div>
              </div> */}

              {/* Section 3: Help & Feedback */}
              <div className="border-t border-gray-200 pt-3">
                {/* <MenuItem label="Help & Feedback" /> */}
                <div onClick={handleLogout}>
                  <MenuItem label="Log Out" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
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
