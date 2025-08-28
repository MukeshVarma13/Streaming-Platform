import { CiSearch } from "react-icons/ci";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router";
import { IoNotifications } from "react-icons/io5";
import Logo from "./Logo";
import { useState } from "react";

const Header = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search?term=${encodeURIComponent(input.trim())}`);
    }
  };
  // console.log(input);
  return (
    <div className="flex py-2 pl-60 pr-15 w-full justify-between items-center fixed right-0 shadow-sm shadow-[#6641A8] body-theme z-10">
      <div className="fixed body-theme left-0 py-1 top-0 px-1.5">
        <Logo />
      </div>
      <form
        className="flex items-center hover-theme rounded-md h-10 gap-2"
        onSubmit={handleSubmit}
      >
        <CiSearch size={25} className="ml-3 opacity-60" />
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-lg outline-0 opacity-65"
          required
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="mr-1 bg-gray-700 px-3 py-1 rounded-sm"
        >
          Search
        </button>
      </form>
      <div>
        <span className="flex items-center gap-2">
          <IoNotifications size={27} />
          <ProfileMenu />
        </span>
      </div>
    </div>
  );
};

export default Header;
