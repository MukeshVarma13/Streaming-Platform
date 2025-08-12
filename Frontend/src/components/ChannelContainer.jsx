import { useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { GoPerson } from "react-icons/go";
import { MdIosShare } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { RiDislikeLine } from "react-icons/ri";

const ChannelContainer = ({ streamData }) => {
  const [like, setLike] = useState(false);
  const [follow, setFollow] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

  const handleFollow = () => {
    setFollow(!follow);
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2.5 items-end">
        <div className="h-20 w-20 rounded-full relative">
          <img
            src="/profile.jpeg"
            alt=""
            className="object-cover h-full w-full rounded-full"
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
            Like
          </span>
          <span
            className="flex gap-2 items-center body-theme px-4 py-1.5 rounded-full font-semibold"
            onClick={handleFollow}
          >
            {follow ? <RiDislikeLine size={20} /> : <FaRegHeart size={18} />}
            {follow ? "Unfollow" : "Follow"}
          </span>
        </div>
        <div className="flex items-center">
          <span className="flex items-center gap-1 text-pink-400 mr-3">
            <GoPerson size={23} />
            2,496
          </span>
          <p className="rounded-full hover:bg-gray-600 p-1.5">
            <MdIosShare size={23} />
          </p>
          <p className="rounded-full hover:bg-gray-600 p-1.5">
            <PiDotsThreeOutlineVerticalFill size={23} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChannelContainer;
