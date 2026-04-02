import { useState } from "react";

export default function ChatArea({ channel }) {
  const [message, setMessage] = useState("");

  if (!channel) return null;

  return (
    <div className="flex-1 flex flex-col bg-[#36393e]">
      <div className="h-12 flex items-center px-4 border-b border-[#202225]">
        # {channel.name}
      </div>

      <div className="flex-1 p-4 text-gray-300">
        <p>Chat messages go here...</p>
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          setMessage("");
        }}
        className="p-4"
      >
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={`Message #${channel.name}`}
          className="w-full bg-[#40444b] p-3 rounded outline-none"
        />
      </form>
    </div>
  );
}