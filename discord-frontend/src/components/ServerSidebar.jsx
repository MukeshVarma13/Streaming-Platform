import React from 'react';
import { Plus, Compass, Download } from 'lucide-react';

const ServerSidebar = ({ servers, activeServer, setActiveServer, onAddServer }) => {
  return (
    <div className="w-[72px] bg-gray-900 flex flex-col items-center py-3 space-y-2 z-20">
      {/* Home Button */}
      <div className="group relative flex items-center justify-center h-12 w-12 rounded-3xl hover:rounded-2xl bg-gray-800 hover:bg-indigo-500 transition-all duration-200 cursor-pointer text-gray-100 mb-2">
        <span className="text-xl font-bold">Discord</span>
      </div>
      
      <div className="w-8 h-1 bg-gray-800 rounded-lg" />

      {/* Server List */}
      {servers.map((server) => (
        <div 
          key={server.id}
          onClick={() => setActiveServer(server.id)}
          className={`relative flex items-center justify-center h-12 w-12 rounded-3xl hover:rounded-2xl transition-all duration-200 cursor-pointer font-bold ${
            activeServer === server.id ? 'bg-indigo-500 text-white rounded-2xl' : 'bg-gray-800 text-gray-100 hover:bg-indigo-400'
          }`}
        >
          {server.initials}
          {activeServer === server.id && (
            <div className="absolute -left-3 w-2 h-10 bg-white rounded-r-lg" />
          )}
        </div>
      ))}

      {/* Add Server Button */}
      <div 
        onClick={onAddServer}
        className="group flex items-center justify-center h-12 w-12 rounded-3xl hover:rounded-2xl bg-gray-800 hover:bg-green-500 transition-all duration-200 cursor-pointer text-green-500 hover:text-white mt-2"
      >
        <Plus size={24} />
      </div>
      
      <div className="group flex items-center justify-center h-12 w-12 rounded-3xl hover:rounded-2xl bg-gray-800 hover:bg-indigo-500 transition-all duration-200 cursor-pointer text-gray-100">
        <Compass size={24} />
      </div>
    </div>
  );
}

export default ServerSidebar