import React from "react";

const ServerSidebar = ({
  servers,
  currentServerId,
  setCurrentServerId,
  setCurrentChannelId,
  setShowCreateServerModal,
}) => {
  return (
    <div className="w-18 bg-[#202225] flex flex-col items-center py-3 space-y-2 border-r border-[#292b2f]">
      {/* Home button */}
      <div
        onClick={() => alert("DMs page coming soon!")}
        className="w-12 h-12 rounded-3xl bg-[#36393e] flex items-center justify-center text-2xl hover:rounded-2xl cursor-pointer mb-2 shadow-inner transition-all duration-200"
      >
        🏠
      </div>

      <div className="w-8 h-0.5 bg-[#292b2f] mx-auto my-2" />

      {/* Servers List */}
      {servers.map((server) => (
        <div
          key={server.id}
          onClick={() => {
            setCurrentServerId(server.id);
            setCurrentChannelId(server.channels[0]?.id || 1);
          }}
          className={`server-icon w-12 h-12 flex items-center justify-center text-3xl cursor-pointer transition-all duration-200 ${
            currentServerId === server.id
              ? "rounded-2xl bg-[#5865f2] text-white"
              : "bg-[#36393e] hover:bg-[#5865f2] hover:text-white rounded-3xl"
          }`}
        >
          {server.icon}
        </div>
      ))}

      {/* Create server button */}
      <div
        onClick={() => setShowCreateServerModal(true)}
        className="w-12 h-12 flex items-center justify-center text-3xl text-[#3ba55c] bg-[#36393e] hover:bg-[#3ba55c] hover:text-white rounded-3xl hover:rounded-2xl cursor-pointer shadow-inner mt-2 transition-all duration-200"
      >
        +
      </div>

      <div className="flex-1" />

      {/* Current user avatar */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-8 h-8 rounded-full bg-[#f04747] flex items-center justify-center text-xs font-bold">
          Y
        </div>
        <div className="text-[10px] text-green-400">●</div>
      </div>
    </div>
  );
};

export default ServerSidebar;