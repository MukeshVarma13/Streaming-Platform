import { useQuery } from "@tanstack/react-query";
import { channelMembers } from "../../api/community";

const MembersSidebar = ({ channelId }) => {
  const {
    data: members,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["channel-members", channelId],
    queryFn: async () => {
      const res = await channelMembers(channelId);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const memberCount = members?.length;

  return (
    <div className="w-72 bg-[#2f3136] border-l border-[#202225] flex flex-col lg:flex h-full">
      {/* Online Count Header */}
      <div className="px-4 py-4 text-xs uppercase font-semibold text-[#949ba4] tracking-wide">
        Member — {memberCount}
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {members?.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 px-4 py-2 hover:bg-[#393c43] mx-2 rounded cursor-pointer group transition-colors duration-150"
          >
            {/* Avatar with Status Indicator */}
            <div
              className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white relative font-medium"
              style={{ backgroundColor: "#5865f2" }}
            >
              {user.name[0]}
              {/* {user.status === "online" && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#2f3136]" />
              )} */}
            </div>

            {/* User Info */}
            <div className="min-w-0">
              <div className="font-medium text-[#8e9297] group-hover:text-white truncate">
                {user.name}
              </div>
              {/* {user.isYou && (
                <div className="text-[10px] text-[#949ba4] italic">
                  That's you!
                </div>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersSidebar;
