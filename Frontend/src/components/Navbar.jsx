import NavbarItems from "./NavbarItems";
import LineEnd from "./LineEnd";
import { navbarItems } from "../services/NavbarList.jsx";
import { NavLink } from "react-router";
import { IoIosRadio } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="h-full mt-16 pt-2 text-white z-5 fixed overflow-y-scroll no-scrollbar bg-theme w-44 flex flex-col gap-1.5">
      {/* <div className="py-1.5 px-5 mix-grade rounded flex gap-1 items-center mx-3">
        <IoIosRadio size={22} />
        <span>Stream</span>
      </div> */}
      <div className="flex flex-col md:gap-3 gap-2">
        {navbarItems.map((item, index) => {
          return (
            <NavbarItems
              key={index}
              icon={item.icons}
              name={item.name}
              link={item.link}
            />
          );
        })}
        <LineEnd text={"Community"} />
      </div>
    </div>
  );
};

export default Navbar;
