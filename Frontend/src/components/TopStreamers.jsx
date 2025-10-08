import React, { useRef } from "react";
import TopStreamerCard from "./TopStreamerCard";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const TopStreamers = ({ title }) => {
  const streamerRef = useRef(null);
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const scrollLeft = () => {
    if (streamerRef.current) {
      streamerRef.current.scrollBy({ left: -200, behaviour: "smooth" });
    }
  };
  const scrollRight = () => {
    if (streamerRef.current) {
      streamerRef.current.scrollBy({ left: 200, behaviour: "smooth" });
    }
  };
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="font-semibold text-xl text-grade">{title}</h1>
        <div className="flex items-center gap-2 opacity-70">
          <button
            className="border rounded-full hover:text-white hover:bg-white cursor-pointer text-grade"
            onClick={scrollLeft}
          >
            <GrFormPreviousLink size={22} />
          </button>
          <button
            className="border rounded-full hover:text-white hover:bg-white cursor-pointer text-grade"
            onClick={scrollRight}
          >
            <GrFormNextLink size={22} />
          </button>
        </div>
      </div>
      <div
        className="mt-4 flex flex-row gap-4 md:gap-8 overflow-x-scroll no-scrollbar"
        ref={streamerRef}
      >
        {items.map((item, index) => {
          return <TopStreamerCard key={index} />;
        })}
      </div>
    </div>
  );
};

export default TopStreamers;
