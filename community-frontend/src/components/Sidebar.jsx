import React, { useState } from 'react';
import { ChevronDown, Plus, Hash, Mic, Search, Users } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Control the dropdown visibility
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for guilds and channels
  const guilds = [
    {
      name: 'Gaming Hub',
      textChannels: [
        { id: 1, name: 'general', mentions: 3 },
        { id: 2, name: 'memes', mentions: 0 },
      ],
      voiceChannels: [
        { id: 3, name: 'lobby', users: 4 },
        { id: 4, name: 'strategize', users: 2 },
      ],
    },
    {
      name: 'Development Base',
      textChannels: [
        { id: 5, name: 'announcements', mentions: 1 },
        { id: 6, name: 'project-updates', mentions: 0 },
      ],
      voiceChannels: [
        { id: 7, name: 'standup', users: 5 },
        { id: 8, name: 'co-working', users: 3 },
      ],
    },
  ];

  // Filter guilds based on the search term
  const filteredGuilds = guilds.filter((guild) =>
    guild.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 h-full bg-[#36393f] text-[#dcddde] font-sans text-sm relative border border-gray-700/50 rounded-lg shadow-xl overflow-hidden">
      {/* Header / Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-[#2f3136] hover:bg-black/10 transition duration-150 border-b border-gray-700/50"
      >
        <span className="font-semibold text-lg text-white">Select Guild</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#36393f] z-10 p-2 space-y-3">
          {/* Search Input */}
          <div className="relative px-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search guild..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-8 px-9 bg-black/30 text-gray-200 rounded text-sm placeholder:text-gray-500 focus:ring-1 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          {/* Iterate over filtered guilds */}
          {filteredGuilds.length > 0 ? (
            filteredGuilds.map((guild, index) => (
              <div key={index} className="space-y-1">
                {/* Guild Name */}
                <div className="text-gray-400 font-bold text-xs uppercase tracking-wider px-2 py-1">
                  {guild.name}
                </div>

                {/* Text Channels */}
                {guild.textChannels.map((channel) => (
                  <div key={channel.id} className="group flex items-center gap-2.5 rounded px-2 py-1.5 hover:bg-black/10 cursor-pointer">
                    <Hash className="w-5 h-5 text-gray-400 group-hover:text-gray-100" />
                    <span className="group-hover:text-white flex-1 truncate">
                      {channel.name}
                    </span>
                    {channel.mentions > 0 && (
                      <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">
                        {channel.mentions}
                      </span>
                    )}
                  </div>
                ))}

                {/* Voice Channels */}
                <div className="pt-2">
                  {guild.voiceChannels.map((channel) => (
                    <div key={channel.id} className="group flex items-center gap-2.5 rounded px-2 py-1.5 hover:bg-black/10 cursor-pointer">
                      <Mic className="w-5 h-5 text-gray-400 group-hover:text-gray-100" />
                      <span className="group-hover:text-white flex-1 truncate">
                        {channel.name}
                      </span>
                      {channel.users > 0 && (
                        <div className="flex items-center gap-1 text-emerald-400">
                          <Users className="w-4 h-4" />
                          <span className="text-xs">{channel.users}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center py-4 text-sm">No guilds found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;