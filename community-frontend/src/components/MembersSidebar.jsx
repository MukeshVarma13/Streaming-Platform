import React from "react";
import { mockUsers } from "../data/mockUsers";

const MembersSidebar = () => {
  const onlineCount = mockUsers.filter((u) => u.status === "online").length;

  return (
    <div className="w-72 bg-[#2f3136] border-l border-[#202225] flex flex-col hidden lg:flex">
      {/* Online Count Header */}
      <div className="px-4 py-4 text-xs uppercase font-semibold text-[#949ba4] tracking-wide">
        Online — {onlineCount}
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {mockUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 px-4 py-2 hover:bg-[#393c43] mx-2 rounded cursor-pointer group transition-colors duration-150"
          >
            {/* Avatar with Status Indicator */}
            <div
              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white relative font-medium"
              style={{ backgroundColor: user.avatarColor }}
            >
              {user.name[0]}
              {user.status === "online" && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#2f3136]" />
              )}
            </div>

            {/* User Info */}
            <div className="min-w-0">
              <div className="font-medium text-[#8e9297] group-hover:text-white truncate">
                {user.name}
              </div>
              {user.isYou && (
                <div className="text-[10px] text-[#949ba4] italic">
                  That's you!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersSidebar;