import { NavLink } from "react-router";
import { baseURL } from "../config/AxiosHelper";

const CategoryVideos = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
          (item, index) => {
            return (
              <NavLink
                key={index}
                to={`/stream`}
                className="flex flex-col gap-2"
              >
                <div className="aspect-video rounded">
                  <img
                    src={baseURL}
                    alt=""
                    className="aspect-video w-full h-full bg-theme rounded"
                  />
                </div>
                <div className="flex gap-2 capitalize items-start">
                  <div className="w-14 h-14 rounded-full shrink-0">
                    <img
                      src={baseURL}
                      alt=""
                      className="w-full h-full rounded-full object-cover bg-theme"
                    />
                  </div>
                  <div className="w-full">
                    <h2 className="w-full h-8 bg-theme rounded-md">
                      {/* Channel name */}
                    </h2>
                    <p className="text-sm h-5 w-full my-1 bg-theme rounded-md">
                      {/* text */}
                    </p>
                    <div className="flex gap-2 items-center flex-wrap text-sm">
                      {[1, 2, 3].map((tag, index) => {
                        return (
                          <span
                            className="bg-[#29292E] rounded-2xl px-2 capitalize text-center w-14 h-6"
                            key={index}
                          >
                            {/* tags */}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          }
        )}
      </div>
    </div>
  );
};

export default CategoryVideos;
