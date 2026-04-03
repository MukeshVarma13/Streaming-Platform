import React from "react";
import WelcomeScreen from "./modals/WelcomeScreen";
import ChannelWelcomeHeader from "./modals/ChannelWelcomeHeader";
import VoiceChannelStage from "./VoiceChannelStage";

const CommunityChat = ({
  currentChannel,
  currentMessagesList,
  newMessage,
  setNewMessage,
  sendMessage,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-[#36393e]">
      {/* Top Bar */}
      <div className="h-12 border-b border-[#202225] flex items-center px-4 shadow-sm">
        {currentChannel?.type === "text" ? (
          <i className="fa-solid fa-hashtag text-[#949ba4] mr-2" />
        ) : (
          <i className="fa-solid fa-microphone text-[#949ba4] mr-2" />
        )}
        <div className="font-semibold">
          {currentChannel ? currentChannel.name : "Welcome"}
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-4 text-[#949ba4]">
          <i className="fa-solid fa-magnifying-glass cursor-pointer hover:text-white" />
          <i className="fa-solid fa-user-group cursor-pointer hover:text-white" />
          <div className="w-px h-6 bg-[#202225]" />
          <i className="fa-solid fa-bell cursor-pointer hover:text-white" />
        </div>
      </div>

      {currentMessagesList.length > 0 ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Content Area */}
          {currentChannel?.type === "text" ? (
            /* Chat Mode */
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {currentMessagesList.map((msg) => (
                <div key={msg.id} className="message flex gap-4 group">
                  <div
                    className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white text-xl"
                    style={{ backgroundColor: msg.avatarColor }}
                  >
                    {msg.user === "You" ? "Y" : msg.user[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold cursor-pointer">
                        {msg.user}
                      </span>
                      <span className="message-timestamp text-xs text-[#949ba4]">
                        {msg.time}
                      </span>
                    </div>
                    <div className="text-[#dcddde] leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Voice Connected Mode */
            <div className="flex-1 flex items-center justify-center bg-linear-to-br from-[#2f3136] to-[#36393e] p-8">
              <div className="text-center max-w-md">
                <div className="text-6xl mb-6 animate-pulse">🎤</div>
                <h2 className="text-3xl font-bold mb-2">Voice Connected</h2>
                <p className="text-[#b9bbbe]">
                  {currentChannel ? `In ${currentChannel.name}` : "Joining..."}
                </p>

                {currentChannel?.type === "voice" && (
                  <div className="mt-8 flex justify-center gap-8">
                    <div className="flex flex-col items-center group cursor-pointer">
                      <div className="w-12 h-12 bg-[#f04747] hover:bg-[#d83c3e] rounded-full flex items-center justify-center text-2xl transition-colors">
                        📴
                      </div>
                      <span className="text-xs mt-2 text-[#f04747] font-semibold">
                        Leave
                      </span>
                    </div>
                    <div className="flex flex-col items-center group cursor-pointer">
                      <div className="w-12 h-12 bg-[#3ba55c] hover:bg-[#2d8047] rounded-full flex items-center justify-center text-2xl transition-colors">
                        🎙️
                      </div>
                      <span className="text-xs mt-2 text-[#3ba55c] font-semibold">
                        Mute
                      </span>
                    </div>
                  </div>
                )}
                <div className="mt-12 text-[#949ba4] text-sm italic">
                  Connected with 4 others
                </div>
              </div>
            </div>
          )}
        </div>
      ) : currentChannel.name === "general" ? (
        <WelcomeScreen serverName={"Misfits"} />
      ) : currentChannel.type == "text" ? (
        <ChannelWelcomeHeader channelName={currentChannel.name} />
      ) : (
        currentChannel.type == "voice" && <VoiceChannelStage />
      )}

      {/* Message Input (Only visible in text channels) */}
      {currentChannel?.type === "text" && (
        <form onSubmit={sendMessage} className="px-4 pb-6">
          <div className="bg-[#40444b] rounded-lg px-4 py-3 flex items-center shadow-inner">
            <i className="fa-solid fa-circle-plus text-[#b9bbbe] hover:text-white mr-4 text-xl cursor-pointer transition-colors" />
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={
                currentChannel ? `Message #${currentChannel.name}` : ""
              }
              className="flex-1 bg-transparent outline-none text-white placeholder-[#72767d]"
            />
            <button
              type="submit"
              className="ml-4 text-[#b9bbbe] hover:text-[#5865f2] transition-colors"
            >
              <i className="fa-solid fa-paper-plane text-xl" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommunityChat;
