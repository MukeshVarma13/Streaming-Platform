import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

const VideoCard = ({ index }) => {
  return (
    <div className="flex flex-col rounded-md overflow-hidden">
      <img
        src="https://i.pinimg.com/736x/58/00/90/5800909258eeb8b128ec80a42c786af8.jpg"
        alt=""
        className="h-60 w-xl bg-green-200"
      />
      <div
        className={`flex justify-between items-start ${
          index == 2 ? "mix-grade" : "bg-theme"
        } py-3 px-2`}
      >
        <div className="flex gap-2 items-center">
          <img
            src="	https://i.pinimg.com/736x/40/17/50/40175058274de769287ee71582e99fde.jpg"
            alt=""
            className="h-12 w-12 rounded-full border "
          />
          <div>
            <h1 className="font-semibold">Rush BGMI Conquror gameplay</h1>
            <h1 className="text-xs opacity-75">Misfit Playz</h1>
            <p className="opacity-75 text-xs flex gap-2 items-center">
              <span>2.2k Views</span>
              <GoDotFill />
              <span>3 hours ago</span>
            </p>
          </div>
        </div>
        <button className="rounded-full p-2 hover:bg-black duration-300 hover:opacity-50 shadow-2xl">
          <BsThreeDotsVertical size={22} />
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
