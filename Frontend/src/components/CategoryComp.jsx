import React from "react";
import { categories } from "../services/Categories";
import { NavLink } from "react-router";

const CategoryComp = () => {
  
  return (
    <div className="w-full flex justify-between items-center gap-2 text-3xl">
      {categories.map((category, index) => {
        return (
          <NavLink
            key={index}
            to={`/directory${category.link}`}
            className="bg-[#5C16C5] w-full py-2 px-3 rounded-md flex justify-between items-center h-12"
          >
            <span>{category.name}</span>
            <img src={category.image} alt="" />
          </NavLink>
        );
      })}
    </div>
  );
};

export default CategoryComp;
