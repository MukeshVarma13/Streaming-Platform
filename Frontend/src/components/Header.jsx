import { IoNotifications } from "react-icons/io5";
import ProfileMenu from "./ProfileMenu";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { HiMenu } from "react-icons/hi";

const Header = ({ onMenuToggle }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 body-theme shadow-[#6641A8] text-white shadow-md px-3 py-2 flex items-center justify-between">
      {/* Left: Logo + Hamburger */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button onClick={onMenuToggle} className="md:hidden block">
          <HiMenu size={28} />
        </button>

        {/* Logo */}
        <div className="hidden md:block">
          <Logo />
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden md:block w-full max-w-lg mx-2">
        <SearchBar />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        <IoNotifications
          size={26}
          className="cursor-pointer hover:text-indigo-400"
        />
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;
