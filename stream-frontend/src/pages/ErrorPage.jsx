import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router";
import Logo from "../components/Logo";

const ErrorPage = () => {
  return (
    <div className="h-full w-full flex items-center flex-col">
      <h1 className="text-6xl">
        <span className="text-red-500 text-7xl">404</span> Page not found.
      </h1>
      <div className="flex items-center mt-8 gap-5">
        <Logo />
        <NavLink to="/" className="p-3 border-[1px] rounded-xl flex items-center gap-2.5">
          Home
          <FaArrowRight size={19}/>
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
