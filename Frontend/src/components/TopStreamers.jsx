import React from "react";
import TopStreamerCard from "./TopStreamerCard";

const TopStreamers = ({ title }) => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  return (
    <div className="w-full">
      <h1 className="font-semibold text-xl text-grade">{title}</h1>
      <div className="mt-4 flex flex-row justify-evenly gap-4 md:gap-8 overflow-x-scroll no-scrollbar">
        {items.map(() => {
          return <TopStreamerCard />;
        })}
      </div>
    </div>
  );
};

export default TopStreamers;
