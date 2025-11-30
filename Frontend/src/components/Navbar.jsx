// import { NavLink, useNavigate } from "react-router";
// import { IoMdMusicalNotes } from "react-icons/io";
// import { MdOutlineHome } from "react-icons/md";
// import { BiCategory, BiChevronDown } from "react-icons/bi";
// import { IoGameControllerOutline, IoVideocamOutline } from "react-icons/io5";
// import { PiVideo } from "react-icons/pi";
// import { LiaUserFriendsSolid } from "react-icons/lia";
// import { useState } from "react";
// import { LuMic } from "react-icons/lu";
// import { FaLaptopCode, FaPodcast } from "react-icons/fa";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [category, setCategory] = useState("");
//   const navigate = useNavigate();
//   return (
//     <div className="h-full mt-16 pt-2 text-white z-5 fixed overflow-y-scroll no-scrollbar bg-theme w-44 flex flex-col gap-1.5">
//       <div className="flex flex-col md:gap-3 gap-2">
//         <NavLink
//           to="/"
//           className="flex px-4 py-1 gap-4 items-end hover:border-r-4 border-r-indigo-500 hover:text-indigo-500 hover:bg-gray-300"
//         >
//           <span>
//             <MdOutlineHome size={22} />
//           </span>
//           <span className="text-sm">Home</span>
//         </NavLink>
//         <div className="flex flex-col">
//           {/* Dropdown toggle */}
//           <div
//             className="flex px-4 py-1 gap-4 items-center cursor-pointer hover:border-r-4 border-r-indigo-500 hover:text-indigo-500 hover:bg-gray-300"
//             onClick={() => setOpen(!open)}
//           >
//             <span>
//               <BiCategory size={22} />
//             </span>
//             <span className="text-sm flex-1">Category</span>
//             <BiChevronDown
//               size={22}
//               className={`transition-transform ${
//                 open ? "rotate-180" : "rotate-0"
//               }`}
//             />
//           </div>

//           {/* Expanding Dropdown Content */}
//           {open && (
//             <div className="flex flex-col bg-[#0e0e10] p-3">
//               {/* Search Bar */}
//               <input
//                 type="text"
//                 placeholder="Search categories..."
//                 className="w-full px-3 py-1.5 text-sm rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
//                 value={category}
//                 onChange={(e) => {
//                   setCategory(e.target.value);
//                 }}
//                 onKeyPress={(e) => {
//                   if (e.key === "Enter") {
//                     navigate(`/directory/tag/${category.toLowerCase()}`);
//                   }
//                 }}
//               />

//               <div className="flex flex-col gap-1">
//                 {/* {[
//                   "Action",
//                   "Adventure",
//                   "RPG",
//                   "Strategy",
//                   "Horror",
//                   "Sports",
//                   "IRL",
//                   "Music",
//                 ].map((cat, i) => (
//                   <NavLink
//                     key={i}
//                     to={`/directory/${cat.toLowerCase()}`}
//                     className="px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white text-gray-300 text-sm flex items-center gap-2"
//                   >
//                     {cat}
//                   </NavLink>
//                 ))} */}
//                 <NavLink
//                   to={`/directory/gaming`}
//                   className="px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white text-gray-300 text-sm flex items-center gap-2"
//                 >
//                   <IoGameControllerOutline size={20} />
//                   Gaming
//                 </NavLink>
//                 <NavLink
//                   to={`/directory/irl`}
//                   className="px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white text-gray-300 text-sm flex items-center gap-2"
//                 >
//                   <LuMic size={20} />
//                   IRL
//                 </NavLink>
//                 <NavLink
//                   to={`/directory/music`}
//                   className="px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white text-gray-300 text-sm flex items-center gap-2"
//                 >
//                   <IoMdMusicalNotes size={20} />
//                   Music
//                 </NavLink>
//                 <NavLink
//                   to={`/directory/coding`}
//                   className="px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white text-gray-300 text-sm flex items-center gap-2"
//                 >
//                   <FaLaptopCode size={20} />
//                   Coding
//                 </NavLink>
//                 <NavLink
//                   to={`/directory/podcast`}
//                   className="px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white text-gray-300 text-sm flex items-center gap-2"
//                 >
//                   <FaPodcast size={22} />
//                   Podcasts
//                 </NavLink>
//               </div>
//             </div>
//           )}
//         </div>
//         <NavLink
//           to="/start-stream"
//           className="flex px-4 py-1 gap-4 items-center hover:border-r-4 border-r-indigo-500 hover:text-indigo-500 hover:bg-gray-300"
//         >
//           <span>
//             <IoVideocamOutline size={22} />
//           </span>
//           <span className="text-sm">Stream</span>
//         </NavLink>
//         <NavLink
//           to="/directory/gaming"
//           className="flex px-4 py-1 gap-4 items-center hover:border-r-4 border-r-indigo-500 hover:text-indigo-500 hover:bg-gray-300"
//         >
//           <span>
//             <PiVideo size={22} />
//           </span>
//           <span className="text-sm">Following</span>
//         </NavLink>
//         <NavLink
//           to="/directory/gaming"
//           className="flex px-4 py-1 gap-4 items-center hover:border-r-4 border-r-indigo-500 hover:text-indigo-500 hover:bg-gray-300"
//         >
//           <span>
//             <LiaUserFriendsSolid size={22} />
//           </span>
//           <span className="text-sm">Friends</span>
//         </NavLink>
//         <NavLink
//           to="/directory/gaming"
//           className="flex px-4 py-1 gap-4 items-center hover:border-r-4 border-r-indigo-500 hover:text-indigo-500 hover:bg-gray-300"
//         >
//           <span>
//             <IoGameControllerOutline size={22} />
//           </span>
//           <span className="text-sm">Gaming</span>
//         </NavLink>
//         <div className="w-full text-nowrap">
//           <span className="text-[12px] opacity-60 flex items-center gap-2">
//             <hr className="w-full" />
//             <span className="flex items-center gap-1 text-grade">
//               Community
//             </span>
//             <hr className="w-full" />
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

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
