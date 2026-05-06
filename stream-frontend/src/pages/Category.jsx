import { NavLink, Outlet, useParams } from "react-router";

const Category = () => {
  const { category } = useParams();
  return (
    <div className="pr-4 pb-5">
      <div className="w-full mb-3">
        <ul className="flex gap-8 text-2xl mb-5">
          <NavLink to="" end>
            <li>Live Streams</li>
          </NavLink>
          <NavLink to="all">
            <li>Ended Streams</li>
          </NavLink>
        </ul>
        {/* <hr className="w-full pb-3 opacity-60" /> */}
      </div>
      <h1 className="text-3xl capitalize mb-3 rounded-2xl w-fit px-3 py-1 text-center bg-white/40">
        {category}
      </h1>
      <Outlet context={{ category }} />
    </div>
  );
};

export default Category;
