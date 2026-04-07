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
    isLoading: descLoading,
    isError: descError,
  } = useQuery({
    queryKey: ["community-details"],
    queryFn: () => communityDetails().then((res) => res.data),
  });

  const { showCreateServerModal, setShowCreateServerModal, invite, setInvite } =
    useContext(UserContext);

  const [currentChannelId, setCurrentChannelId] = useState(
    communityData?.[0]?.channels?.[0]?.channelId,
  );

  return (
    <div className="flex flex-col md:w-52 text-white max-md:mb-2">
      {/* Scrollable Communities Area */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-2 scrollbar-thin scrollbar-thumb-[#36393e] hover:scrollbar-thumb-[#4f545c] scrollbar-track-transparent">
        {communityData?.map((community, index) => (
          <React.Fragment key={index}>
            {/* Individual Community Block with subtle border for separation */}
            <div className="w-full border border-[#36393e] rounded-md bg-[#2f3136] overflow-hidden shadow-sm">
              <CommunityChannels
                community={community}
                currentChannelId={currentChannelId}
                setCurrentChannelId={setCurrentChannelId}
              />
            </div>
            {/* {index < (communityData?.length || 0) - 1 && (
              <div className="h-px bg-[#36393e] mx-6" />
            )} */}
          </React.Fragment>
        ))}
      </div>
      <div className="bg-[#292b2f] border-t border-[#202225] md:fixed bottom-0 md:w-52 w-60 max-md:mx-2 z-10">
        <div className="p-3 grid grid-cols-2 gap-2">
          <div
            onClick={() => setShowCreateServerModal(true)}
            className="group w-full h-11 flex items-center justify-center gap-2 bg-[#36393e] hover:bg-[#FF2164] text-[#b9bbbe] hover:text-white rounded-xl cursor-pointer transition-all duration-200 active:scale-95 shadow-sm hover:shadow-lg"
          >
            <span className="text-sm font-semibold tracking-tighter">New</span>
            <Plus className="w-5 h-5 text-[#b9bbbe] group-hover:text-white transition-colors" />
          </div>
          <div
            onClick={() => setInvite(true)}
            className="group w-full h-11 flex items-center justify-center gap-2 bg-[#36393e] hover:bg-[#FF2164] text-[#b9bbbe] hover:text-white rounded-xl cursor-pointer transition-all duration-200 active:scale-95 shadow-sm hover:shadow-lg"
          >
            <span className="text-sm font-semibold tracking-tighter">Join</span>
            <MdJoinFull className="w-5 h-5 text-[#b9bbbe] group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* Enhanced User Profile Bar */}
        {/* <div className="h-14 bg-[#292b2f] flex items-center px-3 gap-3 border-t border-[#202225] hover:bg-[#36393e] transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-[#f04747] to-[#f04747] flex items-center justify-center text-white text-sm font-bold shrink-0 ring-2 ring-offset-2 ring-offset-[#292b2f] ring-[#f04747]/30 hover:ring-[#f04747]/60 transition-all">
            M
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-white truncate">Mukesh</div>
            <div className="text-[#b9bbbe] text-xs flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-[#3ba55c] rounded-full animate-pulse" />
              #Bengaluru
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#b9bbbe]">
            <button className="hover:text-white p-1.5 rounded-md hover:bg-[#42444a] transition-all active:scale-90" aria-label="Mute">
              <i className="fa-solid fa-microphone-slash text-lg" />
            </button>
            <button className="hover:text-white p-1.5 rounded-md hover:bg-[#42444a] transition-all active:scale-90" aria-label="Deafen">
              <i className="fa-solid fa-headphones text-lg" />
            </button>
            <button className="hover:text-white p-1.5 rounded-md hover:bg-[#42444a] transition-all active:scale-90" aria-label="Settings">
              <i className="fa-solid fa-gear text-lg" />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CommunitySideBar;
