import React from 'react';
import { Hash, Bell, Pin, Users, Inbox, HelpCircle, PlusCircle, Smile, Gift, Image } from 'lucide-react';

export default function ChatArea() {
  return (
    <div className="flex-1 flex flex-col bg-[#36393f] min-w-0">
      {/* Chat Header */}
      <div className="h-12 border-b border-gray-900 shadow-sm flex items-center justify-between px-4">
        <div className="flex items-center text-gray-100 font-bold">
          <Hash size={24} className="text-gray-400 mr-2" /> general
        </div>
        <div className="flex items-center space-x-4 text-gray-400">
          <Hash size={24} className="hover:text-gray-100 cursor-pointer hidden sm:block" />
          <Bell size={24} className="hover:text-gray-100 cursor-pointer hidden sm:block" />
          <Pin size={24} className="hover:text-gray-100 cursor-pointer hidden sm:block" />
          <Users size={24} className="hover:text-gray-100 cursor-pointer" />
          <div className="w-40 bg-gray-900 rounded px-2 py-1 text-sm hidden lg:block">Search</div>
          <Inbox size={24} className="hover:text-gray-100 cursor-pointer hidden sm:block" />
          <HelpCircle size={24} className="hover:text-gray-100 cursor-pointer hidden sm:block" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="mt-auto">
          <div className="flex items-start mt-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 mr-4 cursor-pointer hover:opacity-80"></div>
            <div>
              <div className="flex items-baseline">
                <span className="font-semibold text-green-500 hover:underline cursor-pointer mr-2">SystemAdmin</span>
                <span className="text-xs text-gray-400">Today at 10:42 AM</span>
              </div>
              <p className="text-gray-100">Welcome to the general channel! Feel free to start chatting.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 pt-0">
        <div className="bg-[#40444b] rounded-lg flex items-center px-4 py-2">
          <PlusCircle size={24} className="text-gray-400 hover:text-gray-100 cursor-pointer mr-4" />
          <input 
            type="text" 
            placeholder="Message #general" 
            className="flex-1 bg-transparent border-none outline-none text-gray-100 placeholder-gray-400"
          />
          <div className="flex items-center space-x-3 ml-4">
            <Gift size={24} className="text-gray-400 hover:text-gray-100 cursor-pointer" />
            <Image size={24} className="text-gray-400 hover:text-gray-100 cursor-pointer" />
            <Smile size={24} className="text-gray-400 hover:text-gray-100 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}