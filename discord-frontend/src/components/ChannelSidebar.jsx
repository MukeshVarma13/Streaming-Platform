import React from 'react';
import { Hash, Volume2, ChevronDown, Plus, Mic, Headphones, Settings } from 'lucide-react';

export default function ChannelSidebar() {
  return (
    <div className="w-60 bg-gray-800 flex flex-col h-full border-r border-gray-900">
      {/* Server Header */}
      <div className="h-12 border-b border-gray-900 shadow-sm flex items-center justify-between px-4 hover:bg-gray-700 cursor-pointer font-bold transition-colors">
        <span>General Server</span>
        <ChevronDown size={20} />
      </div>

      {/* Channels List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Text Channels */}
        <div>
          <div className="flex items-center justify-between text-gray-400 hover:text-gray-100 cursor-pointer mb-1">
            <span className="text-xs font-bold uppercase flex items-center"><ChevronDown size={14} className="mr-1" /> Text Channels</span>
            <Plus size={16} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center px-2 py-1.5 bg-gray-700/50 text-gray-100 rounded cursor-pointer">
              <Hash size={20} className="mr-2 text-gray-400" /> general
            </div>
            <div className="flex items-center px-2 py-1.5 text-gray-400 hover:bg-gray-700/50 hover:text-gray-100 rounded cursor-pointer">
              <Hash size={20} className="mr-2 text-gray-400" /> resources
            </div>
          </div>
        </div>

        {/* Voice Channels */}
        <div>
          <div className="flex items-center justify-between text-gray-400 hover:text-gray-100 cursor-pointer mb-1">
            <span className="text-xs font-bold uppercase flex items-center"><ChevronDown size={14} className="mr-1" /> Voice Channels</span>
            <Plus size={16} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center px-2 py-1.5 text-gray-400 hover:bg-gray-700/50 hover:text-gray-100 rounded cursor-pointer">
              <Volume2 size={20} className="mr-2 text-gray-400" /> Lounge
            </div>
            <div className="flex items-center px-2 py-1.5 text-gray-400 hover:bg-gray-700/50 hover:text-gray-100 rounded cursor-pointer">
              <Volume2 size={20} className="mr-2 text-gray-400" /> Streaming
            </div>
          </div>
        </div>
      </div>

      {/* User Controls */}
      <div className="bg-[#292b2f] h-14 flex items-center justify-between px-2 pb-1">
        <div className="flex items-center hover:bg-gray-700 p-1 rounded cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-indigo-500 relative flex items-center justify-center">
            <span className="font-bold text-sm">US</span>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#292b2f]"></div>
          </div>
          <div className="ml-2 text-sm">
            <div className="font-bold text-gray-100">User</div>
            <div className="text-xs text-gray-400">#1234</div>
          </div>
        </div>
        <div className="flex text-gray-400 gap-1">
          <div className="p-1.5 hover:bg-gray-700 hover:text-gray-100 rounded cursor-pointer"><Mic size={20} /></div>
          <div className="p-1.5 hover:bg-gray-700 hover:text-gray-100 rounded cursor-pointer"><Headphones size={20} /></div>
          <div className="p-1.5 hover:bg-gray-700 hover:text-gray-100 rounded cursor-pointer"><Settings size={20} /></div>
        </div>
      </div>
    </div>
  );
}