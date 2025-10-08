import { NavLink, useNavigate } from "react-router";
import { IoMdMusicalNotes } from "react-icons/io";
import { MdOutlineHome, MdSportsEsports } from "react-icons/md";
import { BiCategory, BiChevronDown } from "react-icons/bi";
import { IoGameControllerOutline, IoVideocamOutline } from "react-icons/io5";
import { PiPaintBrushLight, PiVideo } from "react-icons/pi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { useState } from "react";
import { LuMic } from "react-icons/lu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  return (
    <div className="h-full mt-16 pt-2 text-white z-5 fixed overflow-y-scroll no-scrollbar bg-theme w-44 flex flex-col gap-1.5">
      <div className="flex flex-col md:gap-3 gap-2">
        <NavLink
          to="/"
          className="flex px-4 py-1 gap-4 items-end hover:border-r-4 border-r-indigo-500 hover:text-indigo-500 hover:bg-gray-300"
        >
          <span>
            <MdOutlineHome size={22} />
          </span>
          <span className="text-sm">Home</span>
        </NavLink>
        <div className="flex flex-col">
          {/* Dropdown toggle */}
          <div
            className="flex px-4 py-1 gap-4 items-center cursor-pointer hover:border-r-4 border-r-indigo-500 hover:text-indigo-500 hover:bg-gray-300"
            onClick={() => setOpen(!open)}
          >
            <span>
              <BiCategory size={22} />
            </span>
            <span className="text-sm flex-1">Category</span>
            <BiChevronDown size={22}
              className={`transition-transform ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {/* Expanding Dropdown Content */}
          {open && (
            <div className="flex flex-col bg-[#0e0e10] p-3">
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full px-3 py-1.5 text-sm rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/directory/category/${category.toLowerCase()}`);
                  }
                }}
              />

              <div className="flex flex-col gap-1">
                {/* {[
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
                    className="px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white text-gray-300 text-sm flex items-center gap-2"
                  >
                    {cat}
                  </NavLink>
                ))} */}
                <NavLink
                  to={`/directory/gaming`}
                  className="px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white text-gray-300 text-sm flex items-center gap-2"
                >
                  <IoGameControllerOutline size={20} />
                  Gaming
                </NavLink>
                <NavLink
                  to={`/directory/irl`}
                  className="px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white text-gray-300 text-sm flex items-center gap-2"
                >
                  <LuMic size={20} />
                  IRL
                </NavLink>
                <NavLink
                  to={`/directory/music`}
                  className="px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white text-gray-300 text-sm flex items-center gap-2"
                >
                  <IoMdMusicalNotes size={20} />
                  Music & DJs
                </NavLink>
                <NavLink
                  to={`/directory/creative`}
                  className="px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white text-gray-300 text-sm flex items-center gap-2"
                >
                  <PiPaintBrushLight size={20} />
                  Creative
                </NavLink>
                <NavLink
                  to={`/directory/esports`}
                  className="px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white text-gray-300 text-sm flex items-center gap-2"
                >
                  <MdSportsEsports size={22} />
                  ESports
                </NavLink>
              </div>
            </div>
          )}
        </div>
        <NavLink
          to="/directory/gaming"
          className="flex px-4 py-1 gap-4 items-center hover:border-r-4 border-r-indigo-500 hover:text-indigo-500 hover:bg-gray-300"
        >
          <span>
            <IoVideocamOutline size={22} />
          </span>
          <span className="text-sm">Streams</span>
        </NavLink>
        <NavLink
          to="/directory/gaming"
          className="flex px-4 py-1 gap-4 items-center hover:border-r-4 border-r-indigo-500 hover:text-indigo-500 hover:bg-gray-300"
        >
          <span>
            <PiVideo size={22} />
          </span>
          <span className="text-sm">Following</span>
        </NavLink>
        <NavLink
          to="/directory/gaming"
          className="flex px-4 py-1 gap-4 items-center hover:border-r-4 border-r-indigo-500 hover:text-indigo-500 hover:bg-gray-300"
        >
          <span>
            <LiaUserFriendsSolid size={22} />
          </span>
          <span className="text-sm">Friends</span>
        </NavLink>
        <NavLink
          to="/directory/gaming"
          className="flex px-4 py-1 gap-4 items-center hover:border-r-4 border-r-indigo-500 hover:text-indigo-500 hover:bg-gray-300"
        >
          <span>
            <IoGameControllerOutline size={22} />
          </span>
          <span className="text-sm">Gaming</span>
        </NavLink>
        <div className="w-full text-nowrap">
          <span className="text-[12px] opacity-60 flex items-center gap-2">
            <hr className="w-full" />
            <span className="flex items-center gap-1 text-grade">
              Community
            </span>
            <hr className="w-full" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
