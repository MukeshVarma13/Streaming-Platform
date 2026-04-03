// import React, { useEffect, useState } from "react";
// import ServerSidebar from "./components/ServerSidebar";
// import ChannelSidebar from "./components/ChannelSidebar";
// import MainChat from "./components/MainChat";
// import MembersSidebar from "./components/MembersSidebar";
// import CreateServerModal from "./components/modals/CreateServerModal";
// import CreateChannelModal from "./components/modals/CreateChannelModal";
// import VoicePanel from "./components/modals/VoicePanel";

// function CommunityApp() {
//   // --- States ---
//   const [servers, setServers] = useState([
//     {
//       id: 1,
//       name: "Gaming Hub",
//       icon: "🎮",
//       color: "#5865f2",
//       members: 1248,
//       channels: [
//         { id: 1, name: "general", type: "text", unread: 3 },
//         { id: 2, name: "memes", type: "text", unread: 0 },
//         { id: 3, name: "lobby", type: "voice", usersInVoice: 4 },
//         { id: 4, name: "strategize", type: "voice", usersInVoice: 2 },
//       ],
//     },
//     {
//       id: 2,
//       name: "Chill Lounge",
//       icon: "🌿",
//       color: "#3ba55c",
//       members: 892,
//       channels: [
//         { id: 5, name: "chill-chat", type: "text", unread: 0 },
//         { id: 6, name: "music", type: "voice", usersInVoice: 7 },
//       ],
//     },
//     {
//       id: 3,
//       name: "Podcast Studio",
//       icon: "🎙️",
//       color: "#faa61a",
//       members: 342,
//       channels: [
//         { id: 7, name: "announcements", type: "text", unread: 1 },
//         { id: 8, name: "live-recording", type: "voice", usersInVoice: 3 },
//         { id: 9, name: "guest-room", type: "voice", usersInVoice: 0 },
//       ],
//     },
//   ]);
//   const [currentServerId, setCurrentServerId] = useState(1);
//   const [currentChannelId, setCurrentChannelId] = useState(1);
//   const [messages, setMessages] = useState({
//     1: [
//       {
//         id: 1,
//         user: "xAI_Grok",
//         avatarColor: "#5865f2",
//         time: "9:41 AM",
//         content: "Hey everyone! Welcome to the Gaming Hub 🚀",
//       },
//       {
//         id: 2,
//         user: "PixelWarrior",
//         avatarColor: "#3ba55c",
//         time: "9:42 AM",
//         content: "Anyone up for a ranked match?",
//       },
//       {
//         id: 3,
//         user: "You",
//         avatarColor: "#f04747",
//         time: "9:43 AM",
//         content: "I'm in! Let's gooo 🔥",
//       },
//     ],
//   });
//   const [newMessage, setNewMessage] = useState("");

//   const [showCreateServerModal, setShowCreateServerModal] = useState(false);
//   const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
//   const [showVoicePanel, setShowVoicePanel] = useState(false);
//   const [isInVoice, setIsInVoice] = useState(false);
//   const [currentVoiceChannelId, setCurrentVoiceChannelId] = useState(null);
//   const [serverNameInput, setServerNameInput] = useState("");
//   const [selectedTemplate, setSelectedTemplate] = useState("gaming");
//   const [channelNameInput, setChannelNameInput] = useState("");
//   const [channelType, setChannelType] = useState("text");

//   // --- Derived State ---
//   const currentServer = servers.find((s) => s.id === currentServerId);
//   const currentChannel = currentServer
//     ? currentServer.channels.find((c) => c.id === currentChannelId)
//     : null;
//   const currentMessagesList = messages[currentChannelId] || [];

//   // --- Logic Handlers ---

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !currentChannelId) return;

//     const newMsg = {
//       id: Date.now(),
//       user: "You",
//       avatarColor: "#f04747",
//       time: new Date().toLocaleTimeString([], {
//         hour: "numeric",
//         minute: "2-digit",
//       }),
//       content: newMessage,
//     };

//     setMessages((prev) => ({
//       ...prev,
//       [currentChannelId]: [...(prev[currentChannelId] || []), newMsg],
//     }));

//     setNewMessage("");

//     // Fake automatic reply logic
//     if (Math.random() > 0.7) {
//       setTimeout(() => {
//         const replies = [
//           "Haha same 😂",
//           "This is so true",
//           "🔥🔥🔥",
//           "I'm dead 💀",
//         ];
//         const fakeReply = {
//           id: Date.now(),
//           user: "xAI_Grok",
//           avatarColor: "#5865f2",
//           time: new Date().toLocaleTimeString([], {
//             hour: "numeric",
//             minute: "2-digit",
//           }),
//           content: replies[Math.floor(Math.random() * replies.length)],
//         };
//         setMessages((prev) => ({
//           ...prev,
//           [currentChannelId]: [...(prev[currentChannelId] || []), fakeReply],
//         }));
//       }, 1200);
//     }
//   };

//   const createServer = () => {
//     if (!serverNameInput.trim()) return;

//     const templateChannels = {
//       gaming: [
//         { id: Date.now() + 1, name: "general", type: "text" },
//         { id: Date.now() + 3, name: "lobby", type: "voice" },
//       ],
//       chilling: [{ id: Date.now() + 1, name: "chill-chat", type: "text" }],
//       podcast: [{ id: Date.now() + 1, name: "announcements", type: "text" }],
//       study: [{ id: Date.now() + 1, name: "focus-zone", type: "text" }],
//     };

//     const newServer = {
//       id: Date.now(),
//       name: serverNameInput,
//       icon:
//         selectedTemplate === "gaming"
//           ? "🎮"
//           : selectedTemplate === "chilling"
//             ? "🌿"
//             : "🎙️",
//       color: selectedTemplate === "gaming" ? "#5865f2" : "#3ba55c",
//       members: Math.floor(Math.random() * 800) + 100,
//       channels: templateChannels[selectedTemplate] || templateChannels.gaming,
//     };

//     setServers((prev) => [...prev, newServer]);
//     setCurrentServerId(newServer.id);
//     setCurrentChannelId(newServer.channels[0].id);
//     setShowCreateServerModal(false);
//     setServerNameInput("");
//   };

//   const createChannel = () => {
//     if (!channelNameInput.trim() || !currentServer) return;

//     const newChannel = {
//       id: Date.now(),
//       name: channelNameInput,
//       type: channelType,
//       unread: 0,
//       usersInVoice: channelType === "voice" ? 0 : undefined,
//     };

//     setServers((prev) =>
//       prev.map((server) =>
//         server.id === currentServerId
//           ? { ...server, channels: [...server.channels, newChannel] }
//           : server,
//       ),
//     );

//     setCurrentChannelId(newChannel.id);
//     setShowCreateChannelModal(false);
//     setChannelNameInput("");
//   };

//   const joinVoice = (channel) => {
//     if (channel.type !== "voice") return;
//     setCurrentVoiceChannelId(channel.id);
//     setIsInVoice(true);
//     setShowVoicePanel(true);
//     setCurrentChannelId(channel.id);
//   };

//   const leaveVoice = () => {
//     setIsInVoice(false);
//     setShowVoicePanel(false);
//     setCurrentVoiceChannelId(null);
//   };

//   // --- JSX Layout ---
//   return (
//     <div className="flex h-screen overflow-hidden bg-[#202225] text-white">
//       <ServerSidebar
//         servers={servers}
//         currentServerId={currentServerId}
//         setCurrentServerId={setCurrentServerId}
//         setCurrentChannelId={setCurrentChannelId}
//         setShowCreateServerModal={setShowCreateServerModal}
//       />

//       <ChannelSidebar
//         currentServer={currentServer}
//         currentChannelId={currentChannelId}
//         setCurrentChannelId={setCurrentChannelId}
//         isInVoice={isInVoice}
//         joinVoice={joinVoice}
//         setShowCreateChannelModal={setShowCreateChannelModal}
//         setChannelType={setChannelType}
//       />

//       <MainChat
//         currentChannel={currentChannel}
//         currentMessagesList={currentMessagesList}
//         newMessage={newMessage}
//         setNewMessage={setNewMessage}
//         sendMessage={sendMessage}
//       />

//       {/* <MembersSidebar /> */}

//       {showCreateServerModal && (
//         <CreateServerModal
//           showCreateServerModal={showCreateServerModal}
//           setShowCreateServerModal={setShowCreateServerModal}
//           serverNameInput={serverNameInput}
//           setServerNameInput={setServerNameInput}
//           selectedTemplate={selectedTemplate}
//           setSelectedTemplate={setSelectedTemplate}
//           createServer={createServer}
//         />
//       )}

//       {showCreateChannelModal && (
//         <CreateChannelModal
//           showCreateChannelModal={showCreateChannelModal}
//           setShowCreateChannelModal={setShowCreateChannelModal}
//           channelNameInput={channelNameInput}
//           setChannelNameInput={setChannelNameInput}
//           channelType={channelType}
//           setChannelType={setChannelType}
//           createChannel={createChannel}
//         />
//       )}

//       {showVoicePanel && (
//         <VoicePanel
//           showVoicePanel={showVoicePanel}
//           currentChannel={currentChannel}
//           leaveVoice={leaveVoice}
//         />
//       )}
//     </div>
//   );
// }

// export default CommunityApp;


import React from 'react'

const CommunityApp = () => {
  return (
    <div>CommunityApp</div>
  )
}

export default CommunityApp