import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import ProfileMenu from "./ProfileMenu";
import { NavLink } from "react-router";
import Logo from "./Logo";
import { RiMenu2Fill } from "react-icons/ri";

const Header = () => {
  return (
    <div className="flex gap-20 py-2 px-6 w-full justify-around items-center fixed right-0 shadow-xl body-theme z-10">
      <div></div>
      <div></div>
      <div className="flex items-center hover-theme rounded-full h-11 gap-2 ">
        <CiSearch size={28} className="ml-3 opacity-60" />
        <input
          type="text"
          placeholder="Search"
          className="text-lg outline-0 opacity-65"
        />
        <NavLink
          to="/search"
          className="mr-3 bg-gray-700 px-3 py-1 rounded-full"
        >
          Search
        </NavLink>
      </div>
      <div>
        <span className="flex items-center gap-2">
          <IoMdNotificationsOutline size={33} />
          <ProfileMenu />
        </span>
      </div>
    </div>
  );
};

export default Header;
