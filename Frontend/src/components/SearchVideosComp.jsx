import { baseURL } from "../config/AxiosHelper";
import { NavLink } from "react-router";

const SearchVideosComp = ({ video }) => {
  if (!video) {
    return <p>Loading...</p>;
  }
  return (
    <NavLink to={`/stream/${video.id}`} className="flex gap-2 items-center">
      <div className="h-40 bg-gray-800">
        <img
          src={baseURL + video.thumbnail}
          alt=""
          className="aspect-video h-full w-full"
        />
      </div>
      <div className="capitalize">
        <h3>{video.streamUserResponse.name}</h3>
        <h3>{video.title}</h3>
        <p>{video.likes.length} likes</p>
        <p>{video.description}</p>
        <div className="flex gap-2 items-center text-sm mt-2">
          {video.categories.map((category, index) => {
            return (
              <h2 className="text-grade capitalize" key={index}>
                {category}
              </h2>
            );
          })}
          {video.tags.map((tag, index) => {
            return (
              <span
                className="bg-[#29292E] rounded-2xl px-2 capitalize text-center"
                key={index}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </NavLink>
  );
};

export default SearchVideosComp;
