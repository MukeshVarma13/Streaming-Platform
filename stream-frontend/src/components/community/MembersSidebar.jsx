import { useQuery } from "@tanstack/react-query";
import { channelMembers } from "../../api/community";
import { baseURL } from "../../api/axios";
import { useNavigate } from "react-router";

const MembersSidebar = ({ channelId }) => {
  const navigate = useNavigate();
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
      <div className="px-4 py-4 text-xs uppercase font-semibold text-[#949ba4] tracking-wide">
        Member — {memberCount}
      </div>
      <div className="flex-1 overflow-y-auto">
        {members?.map((user) => (
          <div
            onClick={() => navigate(`/channel/${user?.id}`)}
            key={user.id}
            className="flex items-center gap-3 px-4 py-2 hover:bg-[#393c43] mx-2 rounded cursor-pointer group transition-colors duration-150"
          >
            <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white relative font-medium bg-theme">
              {user.profilePic ? (
                <img
                  src={baseURL + user.profilePic}
                  className="w-full h-full rounded-full"
                />
              ) : (
                user.name[0]
              )}
              {/* {user.status === "online" && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#2f3136]" />
              )} */}
            </div>
            <div className="min-w-0">
              <div className="font-medium text-[#8e9297] group-hover:text-white truncate">
                {user.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersSidebar;
