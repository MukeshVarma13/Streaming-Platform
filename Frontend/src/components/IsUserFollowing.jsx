import { useContext, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { MdArrowOutward } from "react-icons/md";
import { RiDislikeLine } from "react-icons/ri";
import { NavLink } from "react-router";
import { UserContext } from "../context/UserDetailsContext";
import { follow } from "../services/StreamService";

const IsUserFollowing = ({ streamerDetail }) => {
  const { userDetail } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [following, setFollowing] = useState(
    streamerDetail?.followers?.includes(userDetail.id)
  );

  const handleFollow = async () => {
    const result = await follow(streamerDetail.id, !following);
    setFollowing(!following);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleCommunity = () => {
    setIsOpen(false);
  };
  return (
    <span className="">
      {following ? (
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex gap-2 items-center body-theme px-4 py-1.5 rounded-full font-semibold focus:outline-none"
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
          className="flex gap-2 items-center body-theme px-4 py-1.5 rounded-full font-semibold w-fit"
          onClick={handleFollow}
        >
          <FaRegHeart size={18} />
          Follow
        </span>
      )}
    </span>
  );
};

export default IsUserFollowing;
