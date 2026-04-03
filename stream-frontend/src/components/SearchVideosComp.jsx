
import { NavLink } from "react-router";
import { baseURL } from "../api/axios";

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
        <h3 className="text-grade opacity-75 text-xl">{video.streamerName}</h3>
        <h3>{video.title}</h3>
        <p className="text-xs mt-1 opacity-50">{video.likesCount} likes</p>
        <div className="flex items-end">
          <p className="text-grade text-sm">{video.categories}</p>
          <div className="flex gap-2 items-center text-sm mt-2">
            <h2 className="text-grade capitalize">{video.category}</h2>
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
        <div className={`mt-2 border w-fit px-2 ${video.status == "LIVE" ? "bg-red-500" : "bg-[#29292E]"} rounded-sm font-semibold`}>
          {video.status}
        </div>
      </div>
    </NavLink>
  );
};

export default SearchVideosComp;
