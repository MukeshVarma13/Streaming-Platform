import React, { useState } from "react";
import { NavLink } from "react-router";

const CommunityChannels = ({
  community,
  currentChannelId = 3,
  setCurrentChannelId,
  isInVoice,
  joinVoice,
  setShowCreateChannelModal,
  setChannelType,
}) => {
  const [openChannel, setOpenChannel] = useState(false);
  // console.log(community);

  return (
    <div className="max-w-full flex flex-col">
      {/* Server Header */}
      <div
        onClick={() => setOpenChannel(!openChannel)}
        className="h-12 bg-[#2f3136] border-b border-[#202225] flex items-center px-3 font-semibold cursor-pointer hover:bg-[#393c43]"
      >
        <span className="flex-1 truncate">
          {community ? community?.communityName : "Select a server"}
        </span>
        {openChannel ? (
          <i className="fa-solid fa-chevron-up text-xs" />
        ) : (
          <i className="fa-solid fa-chevron-down text-xs" />
        )}
      </div>

      {openChannel && (
        <div className="flex-1 overflow-y-auto">
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
            {community?.channels
              .filter((c) => c.type == "TEXT")
              .map((channel) => (
                <NavLink
                  to={`/community/${channel.channelId}`}
                  key={channel.channelId}
                  onClick={() => {
                    setCurrentChannelId(channel.channelId);
                  }}
                  className={`channel-item flex items-center gap-2 px-4 py-2 mx-2 rounded group cursor-pointer mb-0.5 ${
                    currentChannelId === channel.channelId
                      ? "bg-[#393c43] text-white"
                      : "text-[#949ba4] hover:text-white"
                  }`}
                >
                  <i className="fa-solid fa-hashtag text-lg opacity-60" />
                  <span className="flex-1 truncate">{channel.channelName}</span>
                  {channel.unread > 0 && (
                    <span className="bg-[#f04747] text-white text-[10px] px-2 py-px rounded-full font-bold">
                      {channel.unread}
                    </span>
                  )}
                </NavLink>
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
            {community?.channels
              .filter((c) => c.type == "VIDEO")
              .map((channel) => (
                <div
                  key={channel.channelId}
                  onClick={() => joinVoice(channel)}
                  className={`channel-item flex items-center gap-2 px-4 py-2 mx-2 rounded group cursor-pointer mb-0.5 ${
                    currentChannelId === channel?.channelId && true
                      ? "bg-[#393c43] text-white"
                      : "text-[#949ba4] hover:text-white"
                  }`}
                >
                  <i className="fa-solid fa-microphone text-lg opacity-60" />
                  <span className="flex-1 truncate">{channel.channelName}</span>
                  <span className="text-[#3ba55c] text-xs font-medium flex items-center gap-1">
                    <i className="fa-solid fa-user text-[10px]" />
                    {channel.usersInVoice || 0}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityChannels;
