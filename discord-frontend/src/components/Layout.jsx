import { BrowserRouter, Routes, Route, Outlet, Link, useParams } from 'react-router';
import React from 'react';

// Common Styles
const theme = {
  serverRail: 'bg-[#1e1f22]',
  channelSidebar: 'bg-[#2b2d31]',
  mainContent: 'bg-[#313338]',
  textSecondary: 'text-[#b5bac1]',
  accent: 'bg-[#5865f2]',
};

const Layout = () => {
  return (
    <div className="flex h-screen w-full text-[#f2f3f5] font-sans overflow-hidden">
      {/* 1. SERVER RAIL */}
      <nav className={`${theme.serverRail} w-[72px] flex flex-col items-center py-3 space-y-2 shrink-0`}>
        <Link to="/" className="w-12 h-12 bg-[#313338] rounded-[24px] hover:rounded-[16px] transition-all flex items-center justify-center text-green-500 text-2xl">+</Link>
        <div className="w-8 h-[2px] bg-[#35373c] rounded-full my-1" />
        <Link to="/settings" className={`w-12 h-12 ${theme.accent} rounded-[16px] flex items-center justify-center font-bold text-xs`}>CG</Link>
      </nav>

      {/* 2. CHANNEL SIDEBAR */}
      <aside className={`${theme.channelSidebar} w-60 flex flex-col shrink-0`}>
        <header className="h-12 px-4 flex items-center shadow-sm border-b border-[#1e1f22] font-bold">Cool Group</header>
        <div className="flex-1 overflow-y-auto pt-4 px-2 space-y-4">
          <div>
            <p className="px-2 text-[11px] font-bold uppercase text-[#b5bac1] mb-1">Admin Tools</p>
            <SidebarLink to="/settings" label="Group Settings" icon="⚙️" />
            <SidebarLink to="/members" label="Member Profile" icon="👤" />
          </div>
          <div>
            <p className="px-2 text-[11px] font-bold uppercase text-[#b5bac1] mb-1">Channels</p>
            <SidebarLink to="/channel/general" label="general" isChannel />
            <SidebarLink to="/channel/discussions" label="discussions" isChannel />
            <SidebarLink to="/create-channel" label="Add Channel" icon="+" />
          </div>
        </div>
      </aside>

      {/* 3. DYNAMIC MAIN CONTENT */}
      <main className={`${theme.mainContent} flex-1 flex flex-col`}>
        <Outlet /> 
      </main>
    </div>
  );
};


export default Layout;

const SidebarLink = ({ to, label, icon, isChannel }) => (
  <Link to={to} className="flex items-center px-2 py-1.5 rounded hover:bg-[#35373c] text-[#80848e] hover:text-[#dbdee1] mb-[2px]">
    <span className="mr-2 opacity-60">{isChannel ? '#' : icon}</span>
    <span className="text-[15px] font-medium">{label}</span>
  </Link>
);