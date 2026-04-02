export const initialServers = [
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
];
