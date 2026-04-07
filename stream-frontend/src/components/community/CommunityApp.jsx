import { useParams } from "react-router";
import CommunityChat from "./CommunityChat";
import MembersSidebar from "./MembersSidebar";
import { useState } from "react";

const CommunityApp = () => {
  const { channelId } = useParams();
  const [openMembers, setOpenMembers] = useState(false);

  return (
    <div className="h-full flex max-md:h-[88%] pr-3">
      {/* Chat */}
      <div className="flex-1">
        <CommunityChat
          channelId={channelId}
          openMembers={openMembers}
          setOpenMembers={setOpenMembers}
        />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        {openMembers && <MembersSidebar channelId={channelId} />}
      </div>

      {/* Mobile Sidebar (Overlay) */}
      {openMembers && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#2f3136]">
          <div className="h-full w-full relative">
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={() => setOpenMembers(false)}
                className="text-white text-xl"
              >
                ✕
              </button>
            </div>

            <MembersSidebar channelId={channelId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityApp;
