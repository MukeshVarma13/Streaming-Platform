import { baseURL } from "../config/AxiosHelper";
import { NavLink } from "react-router";
import { follow } from "../services/StreamService";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserDetailsContext";
import { RiDislikeLine } from "react-icons/ri";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { FaRegHeart } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

const SearchChannels = ({ channel }) => {
  const { userDetail } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [following, setFollowing] = useState(
    channel.followers.includes(userDetail.id)
  );

//   console.log(channel);

  const handleFollow = async () => {
    const result = await follow(channel.id, !following);
    setFollowing(!following);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleCommunity = () => {
    setIsOpen(false);
  };

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
          {following ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex gap-2 items-center bg-theme px-4 py-1.5 rounded-full font-semibold focus:outline-none"
              >
                <span>Following</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    isOpen ? "rotate-180 duration-500" : "duration-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isOpen && (
                <ul className="absolute w-full mt-1 z-10 bg-theme rounded-xl overflow-hidden">
                  <li
                    onClick={() => handleFollow()}
                    className="px-2 py-2 cursor-pointer transition-colors hover:bg-gray-700 flex gap-2 items-center w-full"
                  >
                    <RiDislikeLine size={20} />
                    Unfollow
                  </li>
                  <li
                    onClick={() => handleCommunity()}
                    className="px-2 py-2 cursor-pointer transition-colors hover:bg-gray-700 flex gap-2 items-center"
                  >
                    <LiaUserFriendsSolid size={22} className="shrink-0" />
                    Community
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <span
              className="flex gap-2 items-center bg-theme px-4 py-1.5 rounded-full font-semibold"
              onClick={handleFollow}
            >
              <FaRegHeart size={18} />
              Follow
            </span>
          )}
          <NavLink
            to={`/channel/${channel.id}`}
            className="px-4 py-1 rounded-2xl body-theme flex items-center gap-1"
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
