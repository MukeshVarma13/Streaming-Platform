import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Camera,
  Edit2,
  Video,
  Users,
  UserPlus,
  ArrowLeft,
  Settings,
  Play,
  Crown,
  Plus,
  Trash2,
  Download,
  EyeOff,
  MoreHorizontal,
  ListPlus,
} from "lucide-react";

const EditProfile = () => {
  const navigate = useNavigate();

  const [user] = useState({
    name: "Mukesh",
    username: "@mukeshcodes",
    email: "mukesh@example.com",
    profilePic: "/profile-pic/1775669246789_button.png",
    banner: "https://picsum.photos/id/1015/2000/600",
    bio: "Building the next-gen Discord + Twitch experience • Always live coding 🔥",
    stats: {
      videos: 12,
      followers: 1240,
      following: 87,
      communities: 4,
    },
  });

  // Dummy data
  const videos = [
    {
      id: 1,
      title: "How to build a Discord clone in 2026",
      thumbnail: "https://picsum.photos/id/1015/400/225",
      duration: "14:22",
      views: "24K",
      time: "3d ago",
    },
    {
      id: 2,
      title: "React + Tailwind Dark Theme Tips",
      thumbnail: "https://picsum.photos/id/201/400/225",
      duration: "8:45",
      views: "12K",
      time: "1w ago",
    },
    {
      id: 3,
      title: "WebSocket + STOMP Real-time Chat",
      thumbnail: "https://picsum.photos/id/301/400/225",
      duration: "21:10",
      views: "8.4K",
      time: "2w ago",
    },
  ];

  const followers = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "https://picsum.photos/id/64/64/64",
    },
    {
      id: 2,
      name: "Rahul Verma",
      avatar: "https://picsum.photos/id/201/64/64",
    },
    { id: 3, name: "Ananya Rao", avatar: "https://picsum.photos/id/29/64/64" },
  ];

  const following = [
    {
      id: 4,
      name: "Tech with Tanay",
      avatar: "https://picsum.photos/id/1009/64/64",
    },
    {
      id: 5,
      name: "CodeWithHarry",
      avatar: "https://picsum.photos/id/160/64/64",
    },
  ];

  const communities = [
    {
      id: 1,
      name: "React India",
      icon: "RI",
      color: "from-blue-500 to-cyan-500",
      members: 12480,
    },
    {
      id: 2,
      name: "WebSocket Wizards",
      icon: "WS",
      color: "from-purple-500 to-pink-500",
      members: 3420,
    },
  ];

  return (
    <div className=" text-white pb-20">
      {/* Banner + Profile Header */}
      <div className="relative h-64 md:h-80">
        <img
          src={user.banner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#202225]/70 to-[#202225]" />

        <div className="absolute -bottom-12 left-6 md:left-12 flex items-end gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded overflow-hidden bg-theme shadow-2xl">
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 bg-[#FF2164] p-3 rounded-2xl shadow-xl hover:scale-110 transition-all">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tighter capitalize">
                {user.name}
              </h1>
              {/* <span className="text-[#FF2164] text-xl">{user.username}</span> */}
            </div>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-16">
        {/* <p className="text-gray-300 text-lg max-w-2xl">{user.bio}</p> */}
        <div className="mt-10 grid grid-cols-4 gap-6 bg-[#292b2f] rounded p-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#FF2164]">
              {user.stats.videos}
            </div>
            <div className="text-xs tracking-widest text-gray-400 mt-1">
              VIDEOS
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#FF2164]">
              {user.stats.followers}
            </div>
            <div className="text-xs tracking-widest text-gray-400 mt-1">
              FOLLOWERS
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#FF2164]">
              {user.stats.following}
            </div>
            <div className="text-xs tracking-widest text-gray-400 mt-1">
              FOLLOWING
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#FF2164]">
              {user.stats.communities}
            </div>
            <div className="text-xs tracking-widest text-gray-400 mt-1">
              COMMUNITIES
            </div>
          </div>
        </div>

        {/* ====================== VERTICAL LIST SECTIONS ====================== */}

        {/* 1. Manage Videos */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-3">
              <Video className="w-7 h-7 text-[#FF2164]" />
              Manage Videos
            </h2>
          </div>
          <div className="space-y-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-theme rounded p-5 flex flex-col gap-5 transition-all"
              >
                <img
                  src={video.thumbnail}
                  alt=""
                  className="aspect-video w-64 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-xl">{video.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {video.views} views • {video.time}
                  </p>
                  <div className="mt-2 flex gap-3">
                    <button className="px-2 py-1 bg-[#36393e] hover:bg-[#FF2164] rounded text-sm font-medium transition-all">
                      Edit Video
                    </button>
                    <button className="px-2 py-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded text-sm font-medium transition-all">
                      Delete
                    </button>
                  </div>
                </div>
                {/* <div className="text-xs font-mono bg-black/60 self-start px-3 py-1 rounded-2xl">
                  {video.duration}
                </div> */}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Manage Followers */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-3">
              <Users className="w-7 h-7 text-[#FF2164]" />
              Manage Followers • {user.stats.followers}
            </h2>
          </div>
          <div className="bg-[#292b2f] rounded p-6 space-y-5">
            {followers.map((follower) => (
              <div
                key={follower.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={follower.avatar}
                    alt=""
                    className="w-12 h-12 rounded-2xl"
                  />
                  <p className="font-medium text-lg">{follower.name}</p>
                </div>
                <button className="px-7 py-3 text-sm bg-red-500/10 hover:bg-red-500 text-red-400 rounded transition-all">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Manage Following */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-3">
              <UserPlus className="w-7 h-7 text-[#FF2164]" />
              Manage Following • {user.stats.following}
            </h2>
          </div>
          <div className="bg-[#292b2f] rounded p-6 space-y-5">
            {following.map((f) => (
              <div key={f.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={f.avatar}
                    alt=""
                    className="w-12 h-12 rounded-2xl"
                  />
                  <p className="font-medium text-lg">{f.name}</p>
                </div>
                <button className="px-7 py-3 text-sm bg-[#36393e] hover:bg-[#FF2164] rounded transition-all">
                  Unfollow
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. My Communities */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-3">
              <Crown className="w-7 h-7 text-[#FF2164]" />
              My Communities • {user.stats.communities}
            </h2>
          </div>
          <div className="space-y-6">
            {communities.map((comm) => (
              <div
                key={comm.id}
                className="bg-[#292b2f] rounded p-8 flex items-center gap-6 hover:ring-2 hover:ring-[#FF2164] transition-all"
              >
                <div
                  className={`w-20 h-20 rounded-xl bg-linear-to-br ${comm.color} flex items-center justify-center text-5xl font-black text-white`}
                >
                  {comm.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">{comm.name}</h3>
                  <p className="text-gray-400">
                    {comm.members.toLocaleString()} members
                  </p>
                </div>
                <button
                  onClick={() => navigate("/manage-community")}
                  className="px-8 py-5 bg-[#FF2164] hover:bg-[#ff4d7f] rounded-xl font-semibold flex items-center gap-3"
                >
                  <Settings className="w-5 h-5" />
                  Manage
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button (optional) */}
        <button
          onClick={() => navigate(-1)}
          className="mt-16 mx-auto flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
