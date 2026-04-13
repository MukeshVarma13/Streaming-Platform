import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { UserContext } from "../../context/UserDetailsContext";

const CommunityChannels = ({
  community,
  currentChannelId = 3,
  setCurrentChannelId,
}) => {
  const [openChannel, setOpenChannel] = useState(false);
  const { setShowCreateChannelModal, setChannelType, userDetail } =
    useContext(UserContext);
  const [communityOwner, setCommunityOwner] = useState(false);

  useEffect(() => {
    if (community?.owner.id === userDetail?.id) {
      setCommunityOwner(true);
    }
  }, [userDetail, community]);

  return (
    <div className="w-full flex flex-col">
      <div
        onClick={() => setOpenChannel(!openChannel)}
        className="h-12 bg-[#2f3136] hover:bg-[#393c43] border-b border-[#202225] flex items-center px-3 font-semibold cursor-pointer transition-colors group"
      >
        <div className="flex-1 truncate flex items-center gap-2">
          <div className="w-6 h-6 bg-[#5865f2] rounded-md flex items-center justify-center text-xs font-bold shrink-0">
            {community?.communityName?.[0] || "C"}
          </div>
          <span className="text-white truncate text-sm flex flex-col">
            <span>
              {community ? community?.communityName : "Select a server"}
            </span>
            {communityOwner && (
              <span className="text-[11px] text-grade">Admin</span>
            )}
          </span>
        </div>

        <i
          className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${
            openChannel ? "rotate-180" : ""
          }`}
        />
      </div>

      {openChannel && (
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-2">
            <div className="px-2 text-xs font-semibold uppercase tracking-widest flex items-center justify-between text-[#949ba4] mb-1">
              <div className="flex items-center gap-1">TEXT CHANNELS</div>
              {communityOwner && (
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                    setChannelType("TEXT");
                    setShowCreateChannelModal(true);
                  }}
                  className="fa-solid fa-plus text-base cursor-pointer hover:text-[#f04747] hover:scale-110 transition-all"
                />
              )}
            </div>

            <div className="space-y-0.5">
              {community?.channels
                .filter((c) => c.type === "TEXT")
                .map((channel) => (
                  <NavLink
                    to={`/community/channel/${channel.channelId}`}
                    key={channel.channelId}
                    onClick={() => setCurrentChannelId(channel.channelId)}
                    className={`flex items-center gap-2 px-2 py-1.5 mx-1 rounded-md group cursor-pointer transition-all duration-150 ${
                      currentChannelId === channel.channelId
                        ? "bg-[#393c43] text-white shadow-sm"
                        : "text-[#949ba4] hover:bg-[#393c43] hover:text-white"
                    }`}
                  >
                    <i className="fa-solid fa-hashtag text-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="flex-1 truncate text-sm font-medium">
                      {channel.channelName}
                    </span>
                    {channel.unread > 0 && (
                      <span className="bg-[#f04747] text-white text-[10px] px-2 py-0.5 rounded-full font-bold min-w-[18px] text-center">
                        {channel.unread}
                      </span>
                    )}
                  </NavLink>
                ))}
            </div>
          </div>

          <div className="px-2 mt-3">
            <div className="px-2 text-xs font-semibold uppercase tracking-widest flex items-center justify-between text-[#949ba4] mb-1">
              <div className="flex items-center gap-1">VOICE CHANNELS</div>
              {communityOwner && (
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                    setChannelType("VIDEO");
                    setShowCreateChannelModal(true);
                  }}
                  className="fa-solid fa-plus text-base cursor-pointer hover:text-[#f04747] hover:scale-110 transition-all"
                />
              )}
            </div>

            <div className="space-y-0.5">
              {community?.channels
                .filter((c) => c.type === "VIDEO")
                .map((channel) => (
                  <NavLink
                    key={channel.channelId}
                    to={`/community/voice/${channel.channelId}`}
                    onClick={() => setCurrentChannelId(channel.channelId)}
                    className={`flex items-center gap-2 px-2 py-1.5 mx-1 rounded-md group cursor-pointer transition-all duration-150 ${
                      currentChannelId === channel.channelId
                        ? "bg-[#393c43] text-white shadow-sm"
                        : "text-[#949ba4] hover:bg-[#393c43] hover:text-white"
                    }`}
                  >
                    <i className="fa-solid fa-microphone text-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="flex-1 truncate text-sm font-medium">
                      {channel.channelName}
                    </span>
                    <span className="text-[#3ba55c] text-xs font-medium flex items-center gap-1 bg-[#3ba55c]/10 px-2 py-px rounded-md">
                      <i className="fa-solid fa-user text-[10px]" />
                      {channel.usersInVoice || 0}
                    </span>
                  </NavLink>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityChannels;
