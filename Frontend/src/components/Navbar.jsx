import { useState } from "react";
import Logo from "./Logo";
import { RiHome3Line } from "react-icons/ri";
import { MdOutlineHome } from "react-icons/md";
import { IoIosRadio } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { IoGameControllerOutline, IoVideocamOutline } from "react-icons/io5";
import { PiVideo } from "react-icons/pi";
import { NavLink } from "react-router";
import { LiaUserFriendsSolid } from "react-icons/lia";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-full pt-10 text-white z-20 fixed overflow-y-scroll no-scrollbar shadow-xl bg-theme flex flex-col items-center gap-8 w-fit font-semibold">
      <div className="">
        <Logo />
      </div>
      <div className="py-2 px-5 mix-grade rounded flex gap-1 items-center">
        <IoIosRadio size={22} />
        <span>Streaming</span>
      </div>
      <div className="w-full flex flex-col gap-3">
        <NavLink className="flex gap-6 w-full opacity-60 py-2 pl-5 pr-14 hover:bg-gray-500 hover:border-r-4 rounded border-r-pink-500">
          <MdOutlineHome size={22} />
          <span className="text-sm">Home Page</span>
        </NavLink>
        <NavLink className="flex gap-6 w-full opacity-60 py-2 pl-5 pr-14 hover:bg-gray-500 hover:border-r-4 rounded border-r-pink-500">
          <BiCategory size={22} />
          <span className="text-sm">Categories</span>
        </NavLink>
        <NavLink className="flex gap-6 w-full opacity-60 py-2 pl-5 pr-14 hover:bg-gray-500 hover:border-r-4 rounded border-r-pink-500">
          <IoVideocamOutline size={22} />
          <span className="text-sm">Streams</span>
        </NavLink>
        <NavLink className="flex gap-6 w-full opacity-60 py-2 pl-5 pr-14 hover:bg-gray-500 hover:border-r-4 rounded border-r-pink-500">
          <PiVideo size={22} />
          <span className="text-sm">Subscription</span>
        </NavLink>
        <NavLink className="flex gap-6 w-full opacity-60 py-2 pl-5 pr-14 hover:bg-gray-500 hover:border-r-4 rounded border-r-pink-500">
          <LiaUserFriendsSolid size={22} />
          <span className="text-sm">Friends</span>
        </NavLink>
        <NavLink className="flex gap-6 w-full opacity-60 py-2 pl-5 pr-14 hover:bg-gray-500 hover:border-r-4 rounded border-r-pink-500">
          <IoGameControllerOutline size={22} />
          <span className="text-sm">Gaming</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
