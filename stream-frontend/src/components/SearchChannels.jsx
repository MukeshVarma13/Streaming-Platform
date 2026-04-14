import { NavLink } from "react-router";
import { MdArrowOutward } from "react-icons/md";
import IsUserFollowing from "./IsUserFollowing";
import { baseURL } from "../api/axios";
import { User } from "lucide-react";

const SearchChannels = ({ channel }) => {
  // console.log(channel);
  return (
    <div className="p-2 flex gap-3 items-center">
      <div className="h-36 w-36 rounded-full">
        {channel.profilePic ? (
          <img
            src={baseURL + channel.profilePic}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <User className="w-full h-full bg-theme rounded-full p-2" />
        )}
      </div>
      <div className="capitalize">
        <h2 className="px-3 text-xl text-grade">{channel.name}</h2>
        <h2 className="text-xs pb-1 px-3">
          {channel?.followers?.length} followers
        </h2>
        <span className="flex gap-3 items-center">
          <IsUserFollowing streamerDetail={channel} />
          <NavLink
            to={`/channel/${channel.id}`}
            className="px-4 py-1 rounded-2xl bg-theme flex items-center gap-1"
          >
            View Channel
            <MdArrowOutward size={20} />
          </NavLink>
        </span>
      </div>
    </div>
  );
};

export default SearchChannels;
