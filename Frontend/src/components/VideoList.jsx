import React from "react";
import VideoCard from "../components/VideoCard";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const VideoList = ({ title }) => {
  const items = [1, 2, 3, 4];
  return (
    <div className="">
      <div className="flex justify-between">
        <h1 className="text-xl">{title}</h1>
        <div className="mix-grade px-3 rounded-4xl">view more</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
        {items.map((item, index) => {
          return <VideoCard index={index} />;
        })}
      </div>
    </div>
  );
};

export default VideoList;
