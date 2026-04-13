import React from "react";

const VoicePanel = ({ showVoicePanel, currentChannel, leaveVoice }) => {
  // if (!showVoicePanel) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-[#292b2f] rounded-2xl shadow-2xl w-80 overflow-hidden animate-in slide-in-from-bottom-4 duration-300 z-10">
      {/* Header */}
      <div className="px-4 py-3 body-theme text-white flex items-center justify-between text-sm font-semibold">
        <div className="flex items-center gap-2">
          <span>🔊</span>
          <span>Voice Connected</span>
        </div>
        <i
          // onClick={leaveVoice}
          className="fa-solid fa-xmark cursor-pointer hover:rotate-90 transition-transform p-1"
        />
      </div>

      {/* Connection Info */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-[#b9bbbe]">
          <div>In channel</div>
          <div className="text-grade">
            {currentChannel ? currentChannel.name : "Unknown"}
          </div>
        </div>

        {/* User: You */}
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#3ba55c] rounded-full flex items-center justify-center text-white font-bold shadow-md">
              Y
            </div>
            <div className="text-sm font-medium text-white">You (speaking)</div>
          </div>
          <div className="text-green-400 text-[10px] animate-pulse">🟢</div>
        </div>

        {/* User: PixelWarrior */}
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#faa61a] rounded-full flex items-center justify-center text-white font-bold shadow-md">
              P
            </div>
            <div className="text-sm font-medium text-white">PixelWarrior</div>
          </div>
          <div className="text-green-400 text-[10px]">🟢</div>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="h-1 bg-linear-to-r from-transparent via-[#5865f2] to-transparent opacity-30" />
    </div>
  );
};

export default VoicePanel;
