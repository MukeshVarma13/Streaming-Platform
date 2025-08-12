import React from "react";
import { NavLink } from "react-router";

const NavbarItems = ({ icon, name, link }) => {
  return (
    <NavLink
      to={link}
      className="flex px-4 py-1 gap-4 items-center hover:border-r-4 border-r-indigo-500 hover:text-indigo-500 hover:bg-gray-300"
    >
      <span className="">{icon}</span>
      <span className="text-sm">{name}</span>
    </NavLink>
  );
};

export default NavbarItems;
