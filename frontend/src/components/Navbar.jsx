import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { MdOutlineHome } from "react-icons/md";
import { BiCategory, BiChevronDown } from "react-icons/bi";
import { IoVideocamOutline, IoGameControllerOutline } from "react-icons/io5";
import { PiVideo } from "react-icons/pi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { LuMic } from "react-icons/lu";
import { IoMdMusicalNotes } from "react-icons/io";
import { FaLaptopCode, FaPodcast } from "react-icons/fa";

const Navbar = ({ open, setOpen }) => {
  const [category, setCategory] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col bg-theme text-white w-44 fixed top-16 bottom-0 left-0 overflow-y-scroll no-scrollbar py-2 z-10">
        <NavItems
          category={category}
          setCategory={setCategory}
          catOpen={catOpen}
          setCatOpen={setCatOpen}
          navigate={navigate}
        />
        <EndTag name={"Community"} />
      </aside>

      {/* MOBILE DRAWER */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 w-64 bg-theme text-white z-30 py-3
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:hidden
        `}
      >
        <button className="text-white mb-4 px-2" onClick={() => setOpen(false)}>
          Close ✖
        </button>

        <NavItems
          category={category}
          setCategory={setCategory}
          catOpen={catOpen}
          setCatOpen={setCatOpen}
          navigate={navigate}
        />
      </aside>
    </>
  );
};

export default Navbar;

const NavItems = ({ category, setCategory, catOpen, setCatOpen, navigate }) => {
  return (
    <div className="flex flex-col gap-1">
      <NavLink to="/" className="nav-item">
        <MdOutlineHome size={22} />
        <span>Home</span>
      </NavLink>

      <div>
        {/* Dropdown toggle */}
        <div
          className="nav-item cursor-pointer"
          onClick={() => setCatOpen(!catOpen)}
        >
          <BiCategory size={22} />
          <span className="flex-1">Category</span>
          <BiChevronDown
            size={22}
            className={`${catOpen ? "rotate-180" : ""} transition`}
          />
        </div>

        {catOpen && (
          <div className="flex flex-col bg-[#0e0e10] px-3">
            <input
              type="text"
              placeholder="Search..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  navigate(`/directory/tag/${category.toLowerCase()}`);
              }}
              className="w-full px-3 py-1.5 text-sm rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2 mt-3"
            />

            <CategoryLink
              to="/directory/gaming"
              icon={<IoGameControllerOutline />}
            >
              Gaming
            </CategoryLink>
            <CategoryLink to="/directory/irl" icon={<LuMic />}>
              IRL
            </CategoryLink>
            <CategoryLink to="/directory/music" icon={<IoMdMusicalNotes />}>
              Music
            </CategoryLink>
            <CategoryLink to="/directory/coding" icon={<FaLaptopCode />}>
              Coding
            </CategoryLink>
            <CategoryLink to="/directory/podcast" icon={<FaPodcast />}>
              Podcasts
            </CategoryLink>
          </div>
        )}
      </div>

      <NavLink to="/stream" className="nav-item">
        <IoVideocamOutline size={22} />
        <span>Stream</span>
      </NavLink>

      <NavLink to="/following" className="nav-item">
        <PiVideo size={22} />
        <span>Following</span>
      </NavLink>

      <NavLink to="/friends" className="nav-item">
        <LiaUserFriendsSolid size={22} />
        <span>Friends</span>
      </NavLink>
    </div>
  );
};

const CategoryLink = ({ to, icon, children }) => (
  <NavLink to={to} className="category-item">
    {icon} {children}
  </NavLink>
);

const EndTag = ({ name }) => {
  return (
    <div className="w-full text-nowrap">
      <span className="text-[12px] opacity-60 flex items-center gap-2">
        <hr className="w-full" />
        <span className="flex items-center gap-1 text-grade">{name}</span>
        <hr className="w-full" />
      </span>
    </div>
  );
};
