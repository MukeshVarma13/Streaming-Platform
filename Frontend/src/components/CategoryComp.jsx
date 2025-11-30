import { categories } from "../services/Categories";
import { NavLink } from "react-router";

const CategoryComp = () => {
  return (
    <div className="w-full grid lg:grid-cols-5 grid-cols-2 justify-between items-center md:gap-2 gap-3 text-2xl lg:text-3xl">
      {categories.map((category, index) => {
        return (
          <NavLink
            key={index}
            to={`/directory${category.link}`}
            className="bg-[#5C16C5] w-full py-2 px-3 rounded-md flex justify-between items-center h-12"
          >
            <span>{category.name}</span>
            {category.name == "Podcasts" ? (
              <img src={category.image} alt="" width={43} />
            ) : category.name == "Coding" ? (
              <img src={category.image} alt="" width={74} />
            ) : (
              <img src={category.image} alt="" />
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default CategoryComp;
