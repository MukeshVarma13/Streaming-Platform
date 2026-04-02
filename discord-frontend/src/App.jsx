import React, { useState } from 'react';
import ServerSidebar from './components/ServerSidebar.jsx';
import ChannelSidebar from './components/ChannelSidebar';
import ChatArea from './components/ChatArea';
import CreateServerModal from './components/CreateServerModal.jsx';

export default function App() {
  const [activeServer, setActiveServer] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [servers, setServers] = useState([
    { id: 1, name: 'General Server', initials: 'GS' }
  ]);

  const handleCreateServer = (serverData) => {
    const newServer = {
      id: servers.length + 1,
      name: serverData.name,
      initials: serverData.name.substring(0, 2).toUpperCase()
    };
    setServers([...servers, newServer]);
    setIsCreateModalOpen(false);
    setActiveServer(newServer.id);
  };

  return (
    <div className="flex h-screen w-full bg-gray-800 text-white overflow-hidden font-sans">
      <ServerSidebar 
        servers={servers} 
        activeServer={activeServer} 
        setActiveServer={setActiveServer} 
        onAddServer={() => setIsCreateModalOpen(true)} 
      />
      
      <div className="flex flex-1 flex-col sm:flex-row">
        <ChannelSidebar />
        <ChatArea />
      </div>

      {isCreateModalOpen && (
        <CreateServerModal 
          onClose={() => setIsCreateModalOpen(false)} 
          onCreate={handleCreateServer} 
        />
      )}
    </div>
  );
}
