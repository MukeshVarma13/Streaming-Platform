import { baseURL } from "../config/AxiosHelper";
import { NavLink } from "react-router";
import { follow } from "../services/StreamService";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserDetailsContext";
import { RiDislikeLine } from "react-icons/ri";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { FaRegHeart } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import IsUserFollowing from "./IsUserFollowing";

const SearchChannels = ({ channel }) => {
  //   console.log(channel);
  return (
    <div className="p-2 flex gap-3 items-center">
      <div className="h-36 w-36 rounded-full">
        <img
          src={baseURL + channel.profilePic}
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="capitalize">
        <h2 className="px-3 text-xl text-grade">{channel.name}</h2>
        <h2 className="text-xs pb-1 px-3">
          {channel.followers.length} followers
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
