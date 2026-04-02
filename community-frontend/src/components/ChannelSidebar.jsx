import React from "react";

const ChannelSidebar = ({
  currentServer,
  currentChannelId,
  setCurrentChannelId,
  isInVoice,
  joinVoice,
  setShowCreateChannelModal,
  setChannelType,
}) => {
  return (
    <div className="w-72 bg-[#2f3136] flex flex-col">
      {/* Server Header */}
      <div className="h-12 bg-[#2f3136] border-b border-[#202225] flex items-center px-3 font-semibold cursor-pointer hover:bg-[#393c43]">
        <span className="flex-1 truncate">
          {currentServer ? currentServer.name : "Select a server"}
        </span>
        <i className="fa-solid fa-chevron-down text-xs" />
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {/* Text Channels Header */}
        <div className="px-4 mt-4 text-xs font-semibold uppercase tracking-widest flex items-center justify-between text-[#949ba4]">
          <div>TEXT CHANNELS</div>
          <i
            onClick={() => {
              setChannelType("text");
              setShowCreateChannelModal(true);
            }}
            className="fa-solid fa-plus cursor-pointer hover:text-white"
          />
        </div>

        {/* Text Channels List */}
        <div className="mt-1">
          {currentServer?.channels
            .filter((c) => c.type === "text")
            .map((channel) => (
              <div
                key={channel.id}
                onClick={() => setCurrentChannelId(channel.id)}
                className={`channel-item flex items-center gap-2 px-4 py-2 mx-2 rounded group cursor-pointer mb-0.5 ${
                  currentChannelId === channel.id
                    ? "bg-[#393c43] text-white"
                    : "text-[#949ba4] hover:text-white"
                }`}
              >
                <i className="fa-solid fa-hashtag text-lg opacity-60" />
                <span className="flex-1 truncate">{channel.name}</span>
                {channel.unread > 0 && (
                  <span className="bg-[#f04747] text-white text-[10px] px-2 py-px rounded-full font-bold">
                    {channel.unread}
                  </span>
                )}
              </div>
            ))}
        </div>

        {/* Voice Channels Header */}
        <div className="px-4 mt-6 text-xs font-semibold uppercase tracking-widest flex items-center justify-between text-[#949ba4]">
          <div>VOICE CHANNELS</div>
          <i
            onClick={() => {
              setChannelType("voice");
              setShowCreateChannelModal(true);
            }}
            className="fa-solid fa-plus cursor-pointer hover:text-white"
          />
        </div>

        {/* Voice Channels List */}
        <div className="mt-1">
          {currentServer?.channels
            .filter((c) => c.type === "voice")
            .map((channel) => (
              <div
                key={channel.id}
                onClick={() => joinVoice(channel)}
                className={`channel-item flex items-center gap-2 px-4 py-2 mx-2 rounded group cursor-pointer mb-0.5 ${
                  currentChannelId === channel.id && isInVoice
                    ? "bg-[#393c43] text-white"
                    : "text-[#949ba4] hover:text-white"
                }`}
              >
                <i className="fa-solid fa-microphone text-lg opacity-60" />
                <span className="flex-1 truncate">{channel.name}</span>
                <span className="text-[#3ba55c] text-xs font-medium flex items-center gap-1">
                  <i className="fa-solid fa-user text-[10px]" />
                  {channel.usersInVoice || 0}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Bottom User Bar */}
      <div className="h-14 bg-[#292b2f] flex items-center px-2 gap-2 border-t border-[#202225]">
        <div className="w-8 h-8 rounded-full bg-[#f04747] flex items-center justify-center text-sm font-bold flex-shrink-0">
          Y
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">Mukesh</div>
          <div className="text-[#b9bbbe] text-xs">#Bengaluru</div>
        </div>
        <div className="flex gap-1 text-[#b9bbbe]">
          <i className="fa-solid fa-microphone-slash cursor-pointer hover:text-white p-1" />
          <i className="fa-solid fa-headphones cursor-pointer hover:text-white p-1" />
          <i className="fa-solid fa-gear cursor-pointer hover:text-white p-1" />
        </div>
      </div>
    </div>
  );
};

export default ChannelSidebar;