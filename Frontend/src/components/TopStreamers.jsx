import React from "react";
import TopStreamerCard from "./TopStreamerCard";

const TopStreamers = ({ title }) => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="w-full">
      <h1 className="font-semibold text-xl text-grade">{title}</h1>
      <div className="grid lg:grid-cols-10 mt-4">
        {items.map(() => {
          return <TopStreamerCard />;
        })}
      </div>
    </div>
  );
};

export default TopStreamers;
