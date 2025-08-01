import React from "react";
import TopStreamerCard from "./TopStreamerCard";

const TopStreamers = ({ title }) => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="w-full">
      <h1 className="font-semibold text-xl">{title}</h1>
      <div className="flex justify-around items-end mt-4">
        {items.map(() => {
          return <TopStreamerCard />;
        })}
      </div>
    </div>
  );
};

export default TopStreamers;
