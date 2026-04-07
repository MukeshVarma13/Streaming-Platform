import React, { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react"; // Using Lucide for icons

const DiscordInvite = ({
  share,
  setShare,
  inviteLink = "https://localhost:5173",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      // Reset the button state after 2 seconds
      setTimeout(() => {
        setCopied(false);
        setShare(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  useEffect(() => {
    if (share) {
      setTimeout(() => {
        setShare(false);
      }, 3000);
    }
  }, [share]);

  return (
    <div className="w-full max-w-md p-4 bg-[#313338] rounded-md shadow-lg fixed bottom-0 right-0 z-10">
      <h3 className="text-xs font-bold text-[#B5BAC1] uppercase mb-2 tracking-wide">
        Send a server invite link to a friend
      </h3>

      <div className="relative flex items-center bg-[#1E1F22] rounded-[3px] p-1 transition-all duration-200">
        <input
          type="text"
          readOnly
          value={inviteLink}
          className="bg-transparent text-[#DBDEE1] text-sm p-2 w-full outline-none selection:bg-[#35373C]"
        />

        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-[3px] text-sm font-medium text-white transition-colors duration-200 min-w-[70px] ${
            copied
              ? "bg-[#248046]" // Discord Success Green
              : "bg-[#5865F2] hover:bg-[#4752C4]" // Discord Blurple
          }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <p className="text-[12px] text-[#949BA4] mt-2">
        Your invite link expires in 7 days.{" "}
        <span className="text-[#00A8FC] cursor-pointer hover:underline">
          Edit invite link.
        </span>
      </p>
    </div>
  );
};

export default DiscordInvite;
