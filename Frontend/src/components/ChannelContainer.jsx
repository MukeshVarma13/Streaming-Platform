import { useContext, useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { MdIosShare } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import ViewerCount from "./ViewerCount";
import { addLike } from "../services/StreamService";
import { baseURL } from "../config/AxiosHelper";
import { UserContext } from "../context/UserDetailsContext";
import { NavLink, useNavigate } from "react-router";
import IsUserFollowing from "./IsUserFollowing";

const ChannelContainer = ({ streamData, streamId }) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { userDetail } = useContext(UserContext);
  const userId = userDetail.id;
  const navigate = useNavigate();

  const handleLike = async () => {
    setLike(!like);
    const result = await addLike(streamId, !like);
    setLikeCount(result);
    // console.log(result);
  };

  // console.log(streamData);

  useEffect(() => {
    setLike(streamData.likes.includes(userId));
    setLikeCount(streamData.likes.length);
  }, []);

  return (
    <div className="flex justify-between">
      <div className="flex gap-2.5 items-end">
        <NavLink
          className="h-20 w-20 rounded-full relative"
          to={`/channel/${streamData.streamUserResponse.id}`}
        >
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
        </NavLink>
        <div>
          <h1 className="text-2xl mb-2 capitalize">
            {streamData.streamUserResponse.name}
          </h1>
          <div className="flex flex-col justify-center gap-1">
            <p className="first-letter:uppercase">{streamData.title}</p>
            <div className="flex gap-2 items-center">
              {streamData.categories.map((category, index) => {
                return (
                  <h2
                    className="text-grade capitalize cursor-pointer"
                    key={index}
                    onClick={() => {
                      navigate(`/directory/category/${category}`);
                    }}
                  >
                    {category}
                  </h2>
                );
              })}
              {streamData.tags.map((tag, index) => {
                return (
                  <span
                    className="bg-[#29292E] rounded-2xl px-2 capitalize text-center cursor-pointer"
                    key={index}
                    onClick={() => {
                      navigate(`/directory/tags/${tag}`);
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
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
          <IsUserFollowing streamerDetail={streamData.streamUserResponse} />
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
