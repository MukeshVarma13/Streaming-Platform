import { useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { MdIosShare } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import ViewerCount from "../ViewerCount";
import { baseURL } from "../../api/axios";
import { NavLink, useNavigate } from "react-router";
import IsUserFollowing from "../IsUserFollowing";
import { useMutation } from "@tanstack/react-query";
import { likeStream } from "../../api/streams.api";
import DiscordInvite from "../community/modals/DiscordInvite";
import { User } from "lucide-react";

const ChannelContainer = ({ streamData, streamId, following }) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();
  const [share, setShare] = useState(false);

  useEffect(() => {
    if (!streamData) return;
    setLike(streamData?.liked);
    setLikeCount(streamData?.streamSearch?.likesCount);
  }, [streamData]);

  const handleLike = () => {
    const newLike = !like;
    setLike(newLike);
    mutate({ streamId, like: newLike });
  };

  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ streamId, like }) => likeStream(streamId, like),
    onSuccess: (data, variables) => {
      setLike(variables.like);
      setLikeCount(data.data);
    },
  });

  return (
    <div className="flex md:justify-between md:flex-row flex-col md:gap-0 gap-4">
      <div className="flex gap-2.5 items-end">
        <NavLink
          className="h-20 w-20 rounded-full relative flex justify-center items-center"
          to={`/channel/${streamData?.streamerId}`}
        >
          {streamData?.streamerProfilePic ? (
            <img
              src={baseURL + streamData?.streamerProfilePic}
              alt=""
              className="object-cover h-full w-full rounded-full bg-theme"
            />
          ) : (
            <User className="p-2 rounded-full h-full w-full hover-theme" />
          )}
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
            {streamData?.streamerName}
          </h1>
          <div className="flex flex-col justify-center gap-1">
            <p className="first-letter:uppercase">{streamData.title}</p>
            <div className="flex gap-2 items-center">
              <h2
                className="text-grade capitalize cursor-pointer"
                onClick={() => {
                  navigate(`/directory/${streamData.categories}`);
                }}
              >
                {streamData.categories}
              </h2>

              {streamData.tags.map((tag, index) => {
                return (
                  <span
                    className="bg-[#29292E] rounded-2xl px-2 capitalize text-center cursor-pointer"
                    key={index}
                    onClick={() => {
                      navigate(`/directory/tag/${tag}`);
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
            className="flex gap-2 items-center border px-4 py-1.5 rounded-full font-semibold bg-theme cursor-pointer"
            onClick={handleLike}
          >
            {like ? <BiLike size={18} /> : <BiSolidLike size={18} />}
            {likeCount == 0 ? "Like" : likeCount}
          </span>
          <IsUserFollowing
            streamerDetail={streamData}
            isfollowing={following}
          />
        </div>
        <div className="flex items-center">
          <span className="flex items-center gap-1 text-pink-400 mr-3">
            <GoPerson size={23} />
            <ViewerCount streamId={streamId} />
          </span>
          <p
            onClick={() => setShare(!share)}
            className="rounded-full hover:text-indigo-500 hover:bg-gray-300 p-1.5"
          >
            <MdIosShare size={23} />
          </p>
          {share && (
            <DiscordInvite
              share={share}
              setShare={setShare}
              inviteLink={"http://localhost:5173/stream/" + streamId}
            />
          )}
          <p className="rounded-full hover:text-indigo-500 hover:bg-gray-300 p-1.5">
            <PiDotsThreeOutlineVerticalFill size={23} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChannelContainer;
