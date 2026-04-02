import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { NavLink } from "react-router";

const NavbarItems = ({ icon, name, link, dropdown }) => {
  const [open, setOpen] = useState(false);

  if (dropdown) {
    return (
      <div className="flex flex-col">
        {/* Dropdown toggle */}
        <div
          className="flex px-4 py-1 gap-4 items-center cursor-pointer hover:border-r-4 border-r-indigo-500 hover:text-indigo-500 hover:bg-gray-300"
          onClick={() => setOpen(!open)}
        >
          <span>{icon}</span>
          <span className="text-sm flex-1">{name}</span>
          <BiChevronDown
            className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          />
        </div>

        {/* Expanding Dropdown Content */}
        {open && (
          <div className="flex flex-col rounded-xl bg-theme p-3 shadow-lg border border-indigo-400">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full px-3 py-1.5 text-sm rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
            />

            {/* Category list */}
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto no-scrollbar">
              {[
                "Action",
                "Adventure",
                "RPG",
                "Strategy",
                "Horror",
                "Sports",
                "IRL",
                "Music",
              ].map((cat, i) => (
                <NavLink
                  key={i}
                  to={`/directory/${cat.toLowerCase()}`}
                  className="px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white text-gray-300 text-sm"
                >
                  {cat}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Normal nav item
  return (
    <NavLink
      to={link}
      className="flex px-4 py-1 gap-4 items-center hover:border-r-4 border-r-indigo-500 hover:text-indigo-500 hover:bg-gray-300"
    >
      <span>{icon}</span>
      <span className="text-sm">{name}</span>
    </NavLink>
  );
};

export default NavbarItems;
