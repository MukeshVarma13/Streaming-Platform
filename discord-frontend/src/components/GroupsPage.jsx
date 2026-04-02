const GroupsPage = () => (
  <>
    {/* COLUMN 3: CHANNEL LIST */}
    <aside className="w-60 bg-[#35363b] flex flex-col shrink-0">
      <header className="h-14 px-4 flex items-center border-b border-black/10 font-bold">
        Driver <span className="ml-auto text-xs opacity-50">v</span>
      </header>
      <div className="p-4 space-y-6 overflow-y-auto">
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">General</p>
          <p className="text-sm bg-[#778ee3] px-3 py-2 rounded-lg font-medium"># Chill</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Gaming</p>
          <div className="space-y-1 ml-2 text-sm text-gray-400">
            <p># Room 1</p>
            <p># Room 2</p>
          </div>
        </div>
      </div>
    </aside>

    {/* COLUMN 4: CHAT AREA */}
    <section className="flex-1 flex flex-col bg-[#303136] relative">
      <header className="h-14 px-6 flex items-center border-b border-black/10">
        <span className="text-gray-500 mr-2">#</span>
        <span className="font-bold">Chill</span>
      </header>
      
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <Message user="You" text="When are we going to play?" time="11:45" isMe />
        <Message user="Friend" text="Lets play GTA tomorrow!" time="11:46" />
      </div>

      {/* Input bar */}
      <div className="p-4">
        <input 
          type="text" 
          placeholder="Send message to #chill" 
          className="w-full bg-[#35363b] rounded-xl px-4 py-3 outline-none border border-white/5"
        />
      </div>
    </section>
  </>
);

const Message = ({ user, text, time, isMe }) => (
  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
    <div className="flex items-center space-x-2 mb-1">
      <span className="text-[10px] font-bold uppercase text-gray-500">{user}</span>
      <span className="text-[10px] text-gray-600">{time}</span>
    </div>
    <div className={`px-4 py-2 rounded-2xl max-w-md ${isMe ? 'bg-[#778ee3] text-white rounded-tr-none' : 'bg-[#35363b] rounded-tl-none'}`}>
      {text}
    </div>
  </div>
);