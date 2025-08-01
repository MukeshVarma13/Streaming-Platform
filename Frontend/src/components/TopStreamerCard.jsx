import React from "react";

const TopStreamerCard = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="p-1 border-fuchsia-500 border-2 rounded-full">
        <img src="https://i.pinimg.com/736x/ab/fa/ac/abfaacbee15ce3011247f2c6182e9a63.jpg" alt="" className="h-24 w-24 rounded-full bg-white" />
      </div>
      <div className="flex flex-col items-center w-2/3">
        <h2 className="font-semibold">MisFit Playz</h2>
        <p className="text-wrap text-center text-xs text-grade font-semibold">Some random ass text of streamer</p>
        <span className="text-xs">Followers : 200k</span>
      </div>
    </div>
  );
};

export default TopStreamerCard;
