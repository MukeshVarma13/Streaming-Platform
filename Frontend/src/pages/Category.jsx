import { NavLink, Outlet, useParams } from "react-router";

const Category = () => {
  const { category } = useParams();
  return (
    <div className="pr-4 pb-5">
      {/* <h1 className="text-7xl capitalize text-grade my-3">{category}..</h1> */}
      <div className="w-full mb-3">
        <ul className="flex gap-8 text-2xl mb-7">
          <NavLink to="" end>
            <li>Live Channels</li>
          </NavLink>
          <NavLink to="all">
            <li>Videos</li>
          </NavLink>
        </ul>
        {/* <hr className="w-full pb-3 opacity-60"/> */}
      </div>
      <Outlet context={{ category }} />
    </div>
  );
};

export default Category;
