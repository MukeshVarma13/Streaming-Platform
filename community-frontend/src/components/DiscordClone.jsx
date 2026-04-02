import React, { useState, useEffect } from 'react';

const initialServers = [
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
            { id: 4, name: "strategize", type: "voice", usersInVoice: 2 }
        ]
    },
    {
        id: 2,
        name: "Chill Lounge",
        icon: "🌿",
        color: "#3ba55c",
        members: 892,
        channels: [
            { id: 5, name: "chill-chat", type: "text", unread: 0 },
            { id: 6, name: "music", type: "voice", usersInVoice: 7 }
        ]
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
            { id: 9, name: "guest-room", type: "voice", usersInVoice: 0 }
        ]
    }
];

const mockUsers = [
    { id: 1, name: "You", avatarColor: "#f04747", status: "online", isYou: true },
    { id: 2, name: "xAI_Grok", avatarColor: "#5865f2", status: "online" },
    { id: 3, name: "PixelWarrior", avatarColor: "#3ba55c", status: "idle" },
    { id: 4, name: "ChillVibes42", avatarColor: "#faa61a", status: "dnd" }
];

export default function DiscordClone() {
    const [servers, setServers] = useState(initialServers);
    const [currentServerId, setCurrentServerId] = useState(1);
    const [currentChannelId, setCurrentChannelId] = useState(1);
    const [messages, setMessages] = useState({
        1: [
            { id: 1, user: "xAI_Grok", avatarColor: "#5865f2", time: "9:41 AM", content: "Hey everyone! Welcome to the Gaming Hub 🚀" },
            { id: 2, user: "PixelWarrior", avatarColor: "#3ba55c", time: "9:42 AM", content: "Anyone up for a ranked match?" },
            { id: 3, user: "You", avatarColor: "#f04747", time: "9:43 AM", content: "I'm in! Let's gooo 🔥" }
        ]
    });
    const [newMessage, setNewMessage] = useState("");
    const [showCreateServerModal, setShowCreateServerModal] = useState(false);
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
    const [showVoicePanel, setShowVoicePanel] = useState(false);
    const [isInVoice, setIsInVoice] = useState(false);
    const [serverNameInput, setServerNameInput] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState("gaming");
    const [channelNameInput, setChannelNameInput] = useState("");
    const [channelType, setChannelType] = useState("text");

    const currentServer = servers.find(s => s.id === currentServerId);
    const currentChannel = currentServer ? currentServer.channels.find(c => c.id === currentChannelId) : null;
    const currentMessagesList = messages[currentChannelId] || [];

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentChannelId) return;
        const newMsg = {
            id: Date.now(),
            user: "You",
            avatarColor: "#f04747",
            time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
            content: newMessage
        };
        setMessages(prev => ({ ...prev, [currentChannelId]: [...(prev[currentChannelId] || []), newMsg] }));
        setNewMessage("");

        if (Math.random() > 0.7) {
            setTimeout(() => {
                const replies = ["Haha same 😂", "This is so true", "🔥🔥🔥", "I'm dead 💀"];
                const fakeReply = {
                    id: Date.now(),
                    user: "xAI_Grok",
                    avatarColor: "#5865f2",
                    time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
                    content: replies[Math.floor(Math.random() * replies.length)]
                };
                setMessages(prev => ({ ...prev, [currentChannelId]: [...(prev[currentChannelId] || []), fakeReply] }));
            }, 1200);
        }
    };

    const createServer = () => {
        if (!serverNameInput.trim()) return;
        const templateChannels = {
            gaming: [{ id: Date.now() + 1, name: "general", type: "text" }, { id: Date.now() + 3, name: "lobby", type: "voice" }],
            chilling: [{ id: Date.now() + 1, name: "chill-chat", type: "text" }],
            podcast: [{ id: Date.now() + 1, name: "announcements", type: "text" }],
            study: [{ id: Date.now() + 1, name: "focus-zone", type: "text" }]
        };
        const newServer = {
            id: Date.now(),
            name: serverNameInput,
            icon: selectedTemplate === "gaming" ? "🎮" : selectedTemplate === "chilling" ? "🌿" : "🎙️",
            color: "#5865f2",
            channels: templateChannels[selectedTemplate] || templateChannels.gaming
        };
        setServers(prev => [...prev, newServer]);
        setCurrentServerId(newServer.id);
        setCurrentChannelId(newServer.channels[0].id);
        setShowCreateServerModal(false);
        setServerNameInput("");
    };

    const createChannel = () => {
        if (!channelNameInput.trim() || !currentServer) return;
        const newChannel = { id: Date.now(), name: channelNameInput, type: channelType, unread: 0, usersInVoice: channelType === "voice" ? 0 : undefined };
        setServers(prev => prev.map(s => s.id === currentServerId ? { ...s, channels: [...s.channels, newChannel] } : s));
        setCurrentChannelId(newChannel.id);
        setShowCreateChannelModal(false);
        setChannelNameInput("");
    };

    const joinVoice = (channel) => {
        setIsInVoice(true);
        setShowVoicePanel(true);
        setCurrentChannelId(channel.id);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#202225] text-white">
            {/* Server Sidebar */}
            <div className="w-[72px] bg-[#202225] flex flex-col items-center py-3 space-y-2 border-r border-[#292b2f]">
                <div onClick={() => alert("DMs coming soon!")} className="w-12 h-12 rounded-3xl bg-[#36393e] flex items-center justify-center text-2xl hover:rounded-2xl cursor-pointer mb-2 shadow-inner">🏠</div>
                <div className="w-8 h-0.5 bg-[#292b2f] mx-auto my-2" />
                {servers.map(server => (
                    <div key={server.id} onClick={() => { setCurrentServerId(server.id); setCurrentChannelId(server.channels[0].id); setIsInVoice(false); }}
                        className={`server-icon w-12 h-12 flex items-center justify-center text-3xl cursor-pointer transition-all duration-200 
                        ${currentServerId === server.id ? 'rounded-2xl bg-[#5865f2] text-white' : 'bg-[#36393e] hover:bg-[#5865f2] hover:text-white rounded-3xl'}`}>
                        {server.icon}
                    </div>
                ))}
                <div onClick={() => setShowCreateServerModal(true)} className="w-12 h-12 flex items-center justify-center text-3xl text-[#3ba55c] bg-[#36393e] hover:bg-[#3ba55c] hover:text-white rounded-3xl cursor-pointer mt-2">+</div>
                <div className="flex-1" />
                <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full bg-[#f04747] flex items-center justify-center text-xs font-bold">Y</div>
                    <div className="text-[10px] text-green-400">●</div>
                </div>
            </div>

            {/* Channel Sidebar */}
            <div className="w-72 bg-[#2f3136] flex flex-col">
                <div className="h-12 bg-[#2f3136] border-b border-[#202225] flex items-center px-3 font-semibold cursor-pointer hover:bg-[#393c43]">
                    <span className="flex-1 truncate">{currentServer?.name}</span>
                    <i className="fa-solid fa-chevron-down text-xs" />
                </div>
                <div className="mx-2 mt-2 bg-gradient-to-r from-[#5865f2] to-[#3ba55c] text-white text-xs p-2 rounded flex items-center gap-2 cursor-pointer">
                    <i className="fa-solid fa-gem" /> Level 2 Server
                </div>
                
                <div className="px-4 mt-4 text-xs font-semibold uppercase text-[#949ba4] flex justify-between">
                    <span>Text Channels</span>
                    <i onClick={() => { setChannelType("text"); setShowCreateChannelModal(true); }} className="fa-solid fa-plus cursor-pointer hover:text-white" />
                </div>
                <div className="flex-1 overflow-y-auto px-2 mt-2">
                    {currentServer?.channels.filter(c => c.type === "text").map(channel => (
                        <div key={channel.id} onClick={() => {setCurrentChannelId(channel.id); setIsInVoice(false);}}
                            className={`flex items-center gap-2 px-2 py-1.5 mx-2 rounded mb-1 cursor-pointer ${currentChannelId === channel.id && !isInVoice ? 'bg-[#393c43] text-white' : 'text-[#949ba4] hover:bg-[#35373c] hover:text-white'}`}>
                            <span className="text-xl opacity-40">#</span>
                            <span className="flex-1 truncate">{channel.name}</span>
                            {channel.unread > 0 && <span className="bg-[#f04747] text-white text-[10px] px-2 rounded-full">3</span>}
                        </div>
                    ))}
                    <div className="px-4 mt-4 text-xs font-semibold uppercase text-[#949ba4] flex justify-between">
                        <span>Voice Channels</span>
                        <i onClick={() => { setChannelType("voice"); setShowCreateChannelModal(true); }} className="fa-solid fa-plus cursor-pointer hover:text-white" />
                    </div>
                    {currentServer?.channels.filter(c => c.type === "voice").map(channel => (
                        <div key={channel.id} onClick={() => joinVoice(channel)}
                            className={`flex items-center gap-2 px-2 py-1.5 mx-2 rounded mb-1 cursor-pointer ${currentChannelId === channel.id && isInVoice ? 'bg-[#393c43] text-white' : 'text-[#949ba4] hover:bg-[#35373c] hover:text-white'}`}>
                            <i className="fa-solid fa-microphone text-lg opacity-40" />
                            <span className="flex-1 truncate">{channel.name}</span>
                        </div>
                    ))}
                </div>

                {/* User Info Bar */}
                <div className="h-14 bg-[#292b2f] flex items-center px-2 gap-2 border-t border-[#202225]">
                    <div className="w-8 h-8 rounded-full bg-[#f04747] flex items-center justify-center text-sm font-bold flex-shrink-0">Y</div>
                    <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">Mukesh</div>
                        <div className="text-[#b9bbbe] text-xs">#Bengaluru</div>
                    </div>
                    <div className="flex gap-2 text-[#b9bbbe]">
                        <i className="fa-solid fa-microphone-slash cursor-pointer hover:text-white" />
                        <i className="fa-solid fa-gear cursor-pointer hover:text-white" />
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-[#36393e]">
                <header className="h-12 border-b border-[#202225] flex items-center px-4 shadow-sm font-semibold">
                    <span className="text-[#949ba4] mr-2">#</span>
                    {currentChannel?.name}
                </header>

                {isInVoice ? (
                    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#2f3136] to-[#36393e]">
                        <div className="text-center">
                            <div className="text-6xl mb-6">🎤</div>
                            <h2 className="text-3xl font-bold mb-2">Voice Connected</h2>
                            <p className="text-[#b9bbbe]">In {currentChannel?.name}</p>
                            <button onClick={() => setIsInVoice(false)} className="mt-8 bg-[#f04747] px-8 py-2 rounded-full font-bold">Leave Voice</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {currentMessagesList.map(msg => (
                                <div key={msg.id} className="message flex gap-4 group">
                                    <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white" style={{ backgroundColor: msg.avatarColor }}>
                                        {msg.user[0]}
                                    </div>
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-semibold">{msg.user}</span>
                                            <span className="message-timestamp text-xs text-[#949ba4]">{msg.time}</span>
                                        </div>
                                        <div className="text-[#dcddde]">{msg.content}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={sendMessage} className="px-4 pb-6">
                            <div className="bg-[#40444b] rounded-lg px-4 py-3 flex items-center">
                                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder={`Message #${currentChannel?.name}`} className="flex-1 bg-transparent outline-none text-white placeholder-[#949ba4]" />
                                <button type="submit" className="ml-4 text-[#5865f2]"><i className="fa-solid fa-paper-plane text-xl" /></button>
                            </div>
                        </form>
                    </>
                )}
            </div>

            {/* Create Server Modal */}
            {showCreateServerModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="modal-anim bg-[#36393e] w-full max-w-md rounded-xl p-6 shadow-2xl">
                        <h2 className="text-2xl font-bold text-center mb-6">Create Your Server</h2>
                        <input className="w-full bg-[#202225] rounded p-3 outline-none mb-6" placeholder="Server Name"
                            value={serverNameInput} onChange={(e) => setServerNameInput(e.target.value)} />
                        <div className="flex justify-end gap-4">
                            <button onClick={() => setShowCreateServerModal(false)}>Cancel</button>
                            <button onClick={createServer} className="bg-[#5865f2] px-6 py-2 rounded font-bold">Create</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}