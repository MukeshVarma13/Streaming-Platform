import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

const VideoCard = ({ index }) => {
  return (
    <div className="flex flex-col overflow-hidden">
      <img
        src="https://i.pinimg.com/736x/58/00/90/5800909258eeb8b128ec80a42c786af8.jpg"
        alt=""
        className="bg-green-200 aspect-video"
      />
      <div className="flex justify-between items-start py-3 px-2">
        <div className="flex gap-2 items-end">
          <img
            src="	https://i.pinimg.com/736x/40/17/50/40175058274de769287ee71582e99fde.jpg"
            alt=""
            className="h-12 w-12 rounded-full border "
          />
          <div>
            <h1 className="text-xs opacity-75">Misfit Playz</h1>
            <h1 className="font-semibold">Rush BGMI Conquror gameplay</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
