import React, { useState } from "react";
import {
  Users,
  Gauge,
  BarChart3,
  Clock,
  MessageCircle,
  Send,
  Eye,
  Radio,
  StopCircle,
  Wifi,
  Zap,
  LineChart,
} from "lucide-react";
import VideoComponent from "../components/VideoComponent";
import { baseURL, streamURL } from "../config/AxiosHelper";
import { useLocation } from "react-router";
import { useStreamChat } from "../context/useStreamChat";
import ViewerCount from "../components/ViewerCount";
import { streamComplete } from "../services/StreamService";

export default function Dashboard() {
  // --- Dynamic Analytics State ---
  const [timer, setTimer] = useState(0); // Timer in seconds
  const [stats, setStats] = useState({
    viewers: 128,
    peakViewers: 301,
    avgWatchTime: "12m",
    bitrate: 4500,
    latency: 55, // in milliseconds
  });
  const location = useLocation();
  const streamData = location.state;
  const { messages, input, setInput, sendMessage, chatBoxRef, userColorMap } =
    useStreamChat(streamData?.streamId);
  const viewerCount = <ViewerCount streamId={streamData?.streamId} />;
  console.log(streamData);

  // Format the uptime timer
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
      .map((t) => String(t).padStart(2, "0"))
      .join(":");
  };

  const getLatencyColor = () => {
    if (stats.latency <= 50) return "text-green-500";
    if (stats.latency <= 100) return "text-yellow-500";
    return "text-red-500";
  };

  const getLatencyStatus = () => {
    if (stats.latency <= 50) return "Optimal";
    if (stats.latency <= 100) return "Good";
    return "Degraded";
  };

  const handleStreamComplete = () => {
    try {
      streamComplete(streamData.streamKey);
      alert("Stream Completed successfully!");
      window.location.href = "/";
    } catch (error) {
      alert("Something went wrong " + error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6 bg-gradient-to-b text-white">
      {/* LEFT SECTION: STREAM + HEADER */}
      <div className="lg:col-span-3 xl:col-span-4 space-y-6 flex flex-col">
        {/* -------------------------------- STREAM HEADER -------------------------------- */}
        <div className="bg-theme backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_0_20px_rgba(90,90,255,0.15)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(120,120,255,0.25)]">
          {/* TOP BAR */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Radio className="text-red-500 animate-pulse w-5 h-5" />
                <span className="text-red-400 font-bold uppercase tracking-widest text-sm">
                  LIVE
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-300 ml-4">
                <Zap size={18} className="text-yellow-400" />
                <span className="text-sm font-medium">
                  Uptime: {formatTime(timer)}
                </span>
              </div>
            </div>

            <button
              onClick={handleStreamComplete}
              className="px-5 py-2 bg-red-600/90 hover:bg-red-700 text-white rounded-xl flex items-center gap-2 font-semibold transition-all duration-200 shadow-md hover:shadow-red-800/50 active:scale-95"
            >
              <StopCircle size={20} /> End Stream
            </button>
          </div>

          {/* STREAM INFO CARD */}
          <div className="mt-5 hover-theme border border-white/10 rounded-xl p-5 shadow-inner">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              {streamData?.title}
            </h1>

            <p className="text-gray-400 text-sm mt-2 leading-6">
              {streamData?.description ||
                "No description provided for this stream."}
            </p>

            <div className="mt-4 flex items-center gap-2 text-gray-400 text-sm">
              <Clock size={16} className="text-blue-400" />
              <span>
                Started At: {streamData?.startedAt || new Date().toISOString()}
              </span>
            </div>
          </div>
        </div>

        {/* -------------------------------- VIDEO PLAYER -------------------------------- */}
        <div className="rounded-2xl flex-1 border border-white/10 bg-black/30 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.4)] overflow-hidden relative max-h-fit hover-theme">
          <div className="aspect-video">
            <VideoComponent
              videoURL={streamURL + streamData?.url}
              thumbnail={baseURL + streamData?.thumbnail}
              control={true}
            />
          </div>

          <div className="absolute top-4 left-4 bg-black/40 px-3 py-1 rounded-lg text-sm flex items-center gap-2 border border-white/10 shadow-md backdrop-blur-lg">
            <Users size={16} /> {viewerCount}
            Watching
          </div>
        </div>
      </div>

      {/* -------------------------- RIGHT SECTION: ANALYTICS + CHAT -------------------------- */}
      <div className="lg:col-span-1 xl:col-span-1 flex flex-col space-y-6">
        {/* -------------------------------- ANALYTICS PANEL -------------------------------- */}
        <div className="hover-theme backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-[0_0_25px_rgba(100,100,255,0.15)] space-y-5">
          <h2 className="text-lg font-bold text-grade flex items-center gap-2">
            <BarChart3 size={20} /> Stream Analytics
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <EnhancedStatCard
              icon={<Users />}
              title="Current Viewers"
              value={"1"}
              color="text-blue-400"
            />
            <EnhancedStatCard
              icon={<Gauge />}
              title="Bitrate"
              value={`${stats.bitrate} kbps`}
              color="text-red-400"
            />
            <EnhancedStatCard
              icon={<Clock />}
              title="Avg Watch Time"
              value={stats.avgWatchTime}
              color="text-yellow-400"
            />
            <EnhancedStatCard
              icon={<Eye />}
              title="Peak Viewers"
              value={stats.peakViewers}
              color="text-green-400"
            />

            {/* Latency */}
            <div className="col-span-2 bg-theme p-4 rounded-xl border border-white/10 flex justify-between items-center hover:bg-[#26262d] transition-all duration-200">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Wifi size={16} className={getLatencyColor()} /> Network Latency
              </p>

              <div className="text-right">
                <p className={`text-lg font-bold ${getLatencyColor()}`}>
                  {getLatencyStatus()}
                </p>
                <p className="text-xs text-gray-500">{stats.latency} ms</p>
              </div>
            </div>
          </div>

          {/* Small chart placeholder */}
          {/* <div className="bg-theme rounded-xl h-28 flex flex-col items-center justify-center text-gray-500 border border-white/10 text-sm shadow-inner">
            <LineChart size={20} className="mb-1" /> Viewer Trend Graph
          </div> */}
        </div>

        {/* -------------------------------- CHAT PANEL -------------------------------- */}
        {/* CHAT PANEL */}
        <div
          className="hover-theme backdrop-blur-xl rounded-2xl border border-white/10 
             h-full flex flex-col justify-between shadow-[0_0_20px_rgba(0,0,0,0.3)]"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center gap-2 backdrop-blur-xl rounded-t-2xl">
            <MessageCircle size={20} className="text-blue-400" />
            <h2 className="font-semibold tracking-wide">Live Chat</h2>
          </div>

          {/* MESSAGES AREA (FIXED HEIGHT SCROLLING) */}
          <div
            ref={chatBoxRef}
            className="overflow-y-scroll no-scrollbar p-4 h-full"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className="w-full flex items-start gap-0.5 mb-1.5"
              >
                <div className="w-6 h-6 shrink-0">
                  <img
                    src={baseURL + message.userProfile}
                    alt=""
                    className="w-full h-full object-cover rounded-xs"
                  />
                </div>
                <div className="flex gap-2 text-sm">
                  <p
                    className="font-semibold shrink-0"
                    style={{ color: userColorMap.current[message.userName] }}
                  >
                    {message.userName}:
                  </p>
                  <p className="break-all">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                className="w-full bg-theme p-3 rounded-xl text-sm outline-none border border-white/10 focus:border-indigo-500/70 transition"
                placeholder="Send a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="px-4 body-theme rounded-xl hover:bg-indigo-700 transition active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const EnhancedStatCard = ({ icon, title, value, color }) => (
  <div className="bg-theme p-4 rounded-xl border border-white/10 hover:bg-[#26262d] transition-all duration-200 shadow-inner">
    <p className="text-xs text-gray-400">{title}</p>
    <div className="flex items-center gap-2 mt-2">
      {React.cloneElement(icon, { size: 18, className: color })}
      <p className="text-xl font-bold tracking-wider">{value}</p>
    </div>
  </div>
);
