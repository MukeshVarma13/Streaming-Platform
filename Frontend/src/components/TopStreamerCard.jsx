import React from "react";

const TopStreamerCard = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="p-1 border-[#6641A8] border-2 rounded-full">
        <img
          src="https://i.pinimg.com/736x/ab/fa/ac/abfaacbee15ce3011247f2c6182e9a63.jpg"
          alt=""
          className="h-20 w-20 rounded-full bg-white"
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-sm text-nowrap">MisFit Playz</h2>
        {/* <p className="text-wrap text-center text-xs text-grade font-semibold">Some random ass text of streamer</p> */}
        <span className="text-[10px] text-[#6641A8]">Followers : 200k</span>
      </div>
    </div>
  );
};

export default TopStreamerCard;
