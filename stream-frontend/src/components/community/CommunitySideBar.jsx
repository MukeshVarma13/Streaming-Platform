import { useState } from "react";
import CommunityChannels from "./CommunityChannels";

const CommunitySideBar = () => {
  const [servers, setServers] = useState([
    {
      id: 1,
      name: "Gaming Hub",
      icon: "🎮",
      color: "#5865f2",
      members: 1248,
      channels: [
        { id: 1, name: "general", type: "text", unread: 3 },
        { id: 2, name: "memes", type: "text", unread: 0 },
        { id: 3, name: "lobby", type: "voice", usersInVoice: 4 },
        { id: 4, name: "strategize", type: "voice", usersInVoice: 2 },
      ],
    },
    {
      id: 2,
      name: "Chill Lounge",
      icon: "🌿",
      color: "#3ba55c",
      members: 892,
      channels: [
        { id: 5, name: "chill-chat", type: "text", unread: 0 },
        { id: 6, name: "music", type: "voice", usersInVoice: 7 },
      ],
    },
    {
      id: 3,
      name: "Podcast Studio",
      icon: "🎙️",
      color: "#faa61a",
      members: 342,
      channels: [
        { id: 7, name: "announcements", type: "text", unread: 1 },
        { id: 8, name: "live-recording", type: "voice", usersInVoice: 3 },
        { id: 9, name: "guest-room", type: "voice", usersInVoice: 0 },
      ],
    },
  ]);
  const [currentServerId, setCurrentServerId] = useState(1);
  const [currentChannelId, setCurrentChannelId] = useState(1);
  const currentServer = servers.find((s) => s.id === currentServerId);
  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        user: "xAI_Grok",
        avatarColor: "#5865f2",
        time: "9:41 AM",
        content: "Hey everyone! Welcome to the Gaming Hub 🚀",
      },
      {
        id: 2,
        user: "PixelWarrior",
        avatarColor: "#3ba55c",
        time: "9:42 AM",
        content: "Anyone up for a ranked match?",
      },
      {
        id: 3,
        user: "You",
        avatarColor: "#f04747",
        time: "9:43 AM",
        content: "I'm in! Let's gooo 🔥",
      },
    ],
  });
  const [newMessage, setNewMessage] = useState("");

  return (
    <div>
      {servers?.map((server, index) => {
        return (
          <div className="px-2" key={index}>
            <CommunityChannels
            currentServer={server}
            // setChannelType={setChannelType}
            // setShowCreateChannelModal={setShowCreateChannelModal}
            currentChannelId={currentChannelId}
          />
          </div>
        );
      })}
      {/* Bottom User Bar */}
      <div className="h-14 bg-[#292b2f] flex items-center px-2 gap-2 border-t border-[#202225] fixed bottom-0 w-">
        <div className="w-8 h-8 rounded-full bg-[#f04747] flex items-center justify-center text-sm font-bold shrink-0">
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

export default CommunitySideBar;
