import { useContext, useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { MdIosShare } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { RiDislikeLine } from "react-icons/ri";
import ViewerCount from "./ViewerCount";
import { addLike } from "../services/StreamService";
import { follow } from "../services/StreamService";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { baseURL } from "../config/AxiosHelper";
import { UserContext } from "../context/UserDetailsContext";

const ChannelContainer = ({ streamData, streamId }) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [following, setFollowing] = useState(false);
  const streamerId = streamData.streamUserResponse.id;
  const [isOpen, setIsOpen] = useState(false);
   const { userDetail } = useContext(UserContext);
  const userId = userDetail.id;
  

  const handleLike = async () => {
    setLike(!like);
    const result = await addLike(streamId, !like);
    setLikeCount(result);
    console.log(result);
  };

  const handleFollow = async () => {
    const result = await follow(streamerId, !following);
    setFollowing(!following);
    setIsOpen(false);
    console.log(result);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleCommunity = () => {
    setIsOpen(false);
  };

  console.log(streamData);

  useEffect(() => {
    setLike(streamData.likes.includes(userId));
    setFollowing(streamData.streamUserResponse.followers.includes(userId));
    setLikeCount(streamData.likes.length);
  }, []);

  return (
    <div className="flex justify-between">
      <div className="flex gap-2.5 items-end">
        <div className="h-20 w-20 rounded-full relative">
          <img
            src={baseURL + streamData.streamUserResponse.profilePic}
            alt=""
            className="object-cover h-full w-full rounded-full bg-theme"
          />
          <div
            className={`absolute -bottom-1 w-full flex items-center justify-center ${
              streamData.isLive ? "" : "hidden"
            }`}
          >
            <p className="bg-red-500 px-1 rounded-sm font-semibold">LIVE</p>
          </div>
        </div>
        <div>
          <h1 className="text-2xl mb-2">
            {streamData.streamUserResponse.name}
          </h1>
          <div className="flex flex-col justify-center gap-1">
            <p>{streamData.title}</p>
            <div className="flex gap-2 items-center">
              <h2 className="text-purple-600">Rust</h2>
              <span className="bg-[#29292E] rounded-2xl px-2">Deutsch</span>
              <span className="bg-[#29292E] rounded-2xl px-2 ">English</span>
              <span className="bg-[#29292E] rounded-2xl px-2 ">
                DropEnabled
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex gap-2">
          <span
            className="flex gap-2 items-center border px-4 py-1.5 rounded-full font-semibold bg-theme"
            onClick={handleLike}
          >
            {like ? <BiSolidLike size={18} /> : <BiLike size={18} />}
            {likeCount === 0 ? "Like" : likeCount}
          </span>
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
              className="flex gap-2 items-center body-theme px-4 py-1.5 rounded-full font-semibold"
              onClick={handleFollow}
            >
              <FaRegHeart size={18} />
              Follow
            </span>
          )}
        </div>
        <div className="flex items-center">
          <span className="flex items-center gap-1 text-pink-400 mr-3">
            <GoPerson size={23} />
            <ViewerCount streamId={streamId} />
          </span>
          <p className="rounded-full hover:text-indigo-500 hover:bg-gray-300 p-1.5">
            <MdIosShare size={23} />
          </p>
          <p className="rounded-full hover:text-indigo-500 hover:bg-gray-300 p-1.5">
            <PiDotsThreeOutlineVerticalFill size={23} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChannelContainer;
