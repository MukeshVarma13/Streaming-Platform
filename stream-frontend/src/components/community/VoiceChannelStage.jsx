import { useState } from "react";

const VoiceChatSplitView = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isCameraOff, setIsCameraOff] = useState(true);

  return (
    <div className="flex flex-col h-full w-full  text-white font-sans overflow-hidden">
      {/* --- Main Video Grid Area --- */}
      <div className="flex-1 flex flex-col p-4 gap-2 items-center justify-center max-w-5xl mx-auto w-full">
        {/* Top Panel: Participant Avatar */}
        <div className="flex-1 w-full bg-[#ff4499] rounded-xl relative flex items-center justify-center shadow-lg border border-white/10 overflow-hidden">
          {/* Discord Logo Placeholder */}
          {/* <i className="fa-brands fa-discord text-white text-8xl opacity-90" /> */}
          <span className="text-7xl text-center">M</span>
          {/* Participant Label */}
          <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/5">
            <i className="fa-solid fa-microphone-slash text-red-400 text-xs" />
            <span className="text-xs font-semibold tracking-tight">Misfit</span>
          </div>
        </div>

        {/* Bottom Panel: Activity / Invite CTA */}
        <div className="flex-1 w-full bg-[#111214] rounded-xl relative flex flex-col items-center justify-center border border-white/10 shadow-lg group">
          {/* Illustration Placeholder (SVG or Icon Stack) */}
          <div className="relative mb-8 transform group-hover:scale-105 transition-transform duration-500">
            <div className="text-8xl flex items-center gap-4">
              <span className="drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                🐢
              </span>
              <span className="text-6xl drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                🏆
              </span>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-4xl drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
              💎
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-[#2b2d31] hover:bg-[#35373c] px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <i className="fa-solid fa-user-plus text-xs" />
              Invite to Voice
            </button>
            <button className="flex items-center gap-2 bg-[#2b2d31] hover:bg-[#35373c] px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <i className="fa-solid fa-shapes text-xs" />
              Choose Activity
            </button>
          </div>
        </div>
      </div>

      {/* --- Bottom Controls Bar --- */}
      <div className="h-20 flex items-center justify-between px-6">
        {/* Left Side: Add Member */}
        <div>
          <button className="w-10 h-10 bg-transparent hover:bg-white/10 rounded-full flex items-center justify-center transition-colors">
            <i className="fa-solid fa-user-plus text-[#b9bbbe]" />
          </button>
        </div>

        {/* Center: Main Call Controls */}
        <div className="flex items-center gap-2">
          <div className="flex bg-[#2b2d31] p-1 rounded-xl">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-10 rounded-lg flex items-center justify-center transition-colors ${isMuted ? "text-red-400 bg-red-400/10 hover:bg-red-400/20" : "hover:bg-white/10"}`}
            >
              <i
                className={`fa-solid ${isMuted ? "fa-microphone-slash" : "fa-microphone"}`}
              />
            </button>
            <div className="w-px h-6 bg-white/10 self-center mx-1" />
            <button className="w-6 h-10 hover:bg-white/10 rounded-lg flex items-center justify-center text-xs text-[#b9bbbe]">
              <i className="fa-solid fa-chevron-down" />
            </button>
          </div>

          <div className="flex bg-[#2b2d31] p-1 rounded-xl">
            <button
              onClick={() => setIsCameraOff(!isCameraOff)}
              className={`w-12 h-10 rounded-lg flex items-center justify-center transition-colors ${isCameraOff ? "text-red-400 bg-red-400/10 hover:bg-red-400/20" : "hover:bg-white/10"}`}
            >
              <i
                className={`fa-solid ${isCameraOff ? "fa-video-slash" : "fa-video"}`}
              />
            </button>
            <div className="w-px h-6 bg-white/10 self-center mx-1" />
            <button className="w-6 h-10 hover:bg-white/10 rounded-lg flex items-center justify-center text-xs text-[#b9bbbe]">
              <i className="fa-solid fa-chevron-down" />
            </button>
          </div>

          <ControlCircle icon="fa-desktop" />
          <ControlCircle icon="fa-border-all" />
          <ControlCircle icon="fa-wand-magic-sparkles" />
          <ControlCircle icon="fa-ellipsis" />

          {/* End Call Button */}
          <button className="w-14 h-10 bg-red-500 hover:bg-red-600 rounded-xl flex items-center justify-center shadow-lg transition-transform active:scale-95 ml-2">
            <i className="fa-solid fa-phone-slash rotate-[135deg]" />
          </button>
        </div>

        {/* Right Side: Pop-out and Fullscreen */}
        <div className="flex gap-4">
          <i className="fa-solid fa-up-right-from-square text-[#b9bbbe] hover:text-white cursor-pointer" />
          <i className="fa-solid fa-expand text-[#b9bbbe] hover:text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const ControlCircle = ({ icon }) => (
  <button className="w-12 h-10 bg-[#2b2d31] hover:bg-[#35373c] rounded-xl flex items-center justify-center transition-colors text-white">
    <i className={`fa-solid ${icon}`} />
  </button>
);

export default VoiceChatSplitView;
