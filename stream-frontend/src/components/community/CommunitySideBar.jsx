import React, { useContext, useState } from "react";
import CommunityChannels from "./CommunityChannels";
import { communityDetails } from "../../api/community";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../context/UserDetailsContext";
import { Plus } from "lucide-react";
import { MdJoinFull } from "react-icons/md";

const CommunitySideBar = () => {
  const {
    data: communityData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["community-details"],
    queryFn: () => communityDetails().then((res) => res.data),
  });

  const { setShowCreateServerModal, setInvite, userDetail } =
    useContext(UserContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentChannelId, setCurrentChannelId] = useState(
    communityData?.[0]?.channels?.[0]?.channelId,
  );

  const filteredCommunities = (communityData || []).filter((community) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase().trim();
    return community.communityName?.toLowerCase().includes(term);
  });

  return (
    <div className="flex flex-col md:w-52 text-white max-md:mb-2">
      <div className="px-3">
        <input
          type="text"
          placeholder="Communities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-1.5 text-sm rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-3"
        />
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-2 scrollbar-thin scrollbar-thumb-[#36393e] hover:scrollbar-thumb-[#4f545c] scrollbar-track-transparent">
        {filteredCommunities.map((community, index) => (
          <React.Fragment key={index}>
            <div className="w-full border border-[#36393e] rounded-md bg-[#2f3136] overflow-hidden shadow-sm">
              <CommunityChannels
                community={community}
                currentChannelId={currentChannelId}
                setCurrentChannelId={setCurrentChannelId}
              />
            </div>
            {/* {index < (filteredCommunities.length || 0) - 1 && (
              <div className="h-px bg-[#36393e] mx-6" />
            )} */}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-[#292b2f] border-t border-[#202225] md:fixed bottom-0 md:w-52 w-60 max-md:mx-2 z-10">
        <div className="p-3 flex gap-2">
          {!userDetail?.communityId && (
            <div
              onClick={() => setShowCreateServerModal(true)}
              className="group w-full h-11 flex items-center justify-center gap-2 bg-[#36393e] hover:bg-[#FF2164] text-[#b9bbbe] hover:text-white rounded-xl cursor-pointer transition-all duration-200 active:scale-95 shadow-sm hover:shadow-lg"
            >
              <span className="text-sm font-semibold tracking-tighter">
                New
              </span>
              <Plus className="w-5 h-5 text-[#b9bbbe] group-hover:text-white transition-colors" />
            </div>
          )}
          <div
            onClick={() => setInvite(true)}
            className="group w-full h-11 flex items-center justify-center gap-2 bg-[#36393e] hover:bg-[#FF2164] text-[#b9bbbe] hover:text-white rounded-xl cursor-pointer transition-all duration-200 active:scale-95 shadow-sm hover:shadow-lg"
          >
            <span className="text-sm font-semibold tracking-tighter">Join</span>
            <MdJoinFull className="w-5 h-5 text-[#b9bbbe] group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySideBar;
