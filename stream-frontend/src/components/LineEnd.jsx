import React from "react";
import { NavLink } from "react-router";

const LineEnd = ({ text, link, icon }) => {
  return (
    <NavLink className="w-full text-nowrap">
      <span className="text-[12px] opacity-60 flex items-center gap-2">
        <hr className="w-full" />
        <span className="flex items-center gap-1 text-grade">
          {text}
          {icon}
        </span>
        <hr className="w-full" />
      </span>
    </NavLink>
  );
};

export default LineEnd;
