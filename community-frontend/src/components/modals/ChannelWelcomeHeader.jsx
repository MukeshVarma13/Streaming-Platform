import React from "react";

const ChannelWelcomeHeader = ({ channelName = "clips-and-highlights" }) => {
  return (
    <div className="flex flex-col items-start justify-end p-4 mb-8 select-none animate-in fade-in slide-in-from-bottom-2 duration-500 flex-1">
      {/* The large Hashtag Circle */}
      <div className="w-16 h-16 bg-[#4f545c] rounded-full flex items-center justify-center mb-4 shadow-lg">
        <i className="fa-solid fa-hashtag text-white text-4xl" />
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl font-extrabold text-white mb-2">
        Welcome to #{channelName}!
      </h1>

      {/* Subtext */}
      <p className="text-[#b9bbbe] text-base mb-4">
        This is the start of the #{channelName} channel.
      </p>

      {/* Edit Button */}
      <button
        onClick={() => console.log("Open Channel Settings")}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#4f545c] hover:bg-[#5d6269] text-white text-sm font-medium rounded transition-colors duration-150 active:scale-95"
      >
        <i className="fa-solid fa-pencil text-[10px]" />
        Edit Channel
      </button>

      {/* Divider */}
      <div className="w-full h-px bg-[#4f545c] mt-8 opacity-30" />
    </div>
  );
};

export default ChannelWelcomeHeader;
