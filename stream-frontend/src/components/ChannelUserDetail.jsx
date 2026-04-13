import { Edit, User } from "lucide-react";
import { baseURL } from "../api/axios";
import IsUserFollowing from "./IsUserFollowing";
import { useState } from "react";
import ManageProfileModal from "./ManageProfileModal";

const ChannelUserDetail = ({
  streamerDetails,
  latestStreamVideo,
  owner,
  setOwner,
  userDetail,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-purple-5 flex items-baseline-last my-4 w-full justify-between">
        <div className="flex items-center my-4 gap-4">
          <div className="h-28 w-28 rounded-full relative">
            {streamerDetails?.profilePic ? (
              <img
                src={baseURL + streamerDetails?.profilePic}
                alt=""
                className="w-full h-full rounded-full object-cover bg-theme"
              />
            ) : (
              <User className="p-2 rounded-full h-full w-full hover-theme" />
            )}
            <div
              className={`absolute -bottom-1 w-full flex items-center justify-center ${
                latestStreamVideo?.status == "LIVE" ? "" : "hidden"
              }`}
            >
              <p className="bg-red-500 px-1 rounded-sm font-semibold">LIVE</p>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-0">
            <h1 className="text-5xl font-bold text-grade capitalize tracking-tighter">
              {streamerDetails?.name}
            </h1>
            <p className="w-48 opacity-75">{streamerDetails?.communityName}</p>
            <p className="opacity-75">{owner && userDetail?.email}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {owner && (
            <div>
              <div
                onClick={() => setIsModalOpen(true)}
                className="flex gap-2 py-1.5 items-center justify-center rounded-full bg-theme"
              >
                <Edit />
                Manage
              </div>
              <ManageProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentUser={userDetail}
              />
            </div>
          )}

          <IsUserFollowing
            streamerDetail={streamerDetails}
            isfollowing={streamerDetails.isFollowing}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="bg-theme w-full h-28 my-2 rounded-md flex justify-around items-center">
          <span className="flex flex-col items-center border-r w-full">
            <p className="text-sm opacity-65">Videos</p>
            <p className="text-3xl">
              {streamerDetails?.streamVideosResponse?.content?.length}
            </p>
          </span>
          <span className="flex flex-col items-center border-r w-full">
            <p className="text-sm opacity-65">Followers</p>
            <p className="text-3xl">{streamerDetails?.followersCount}</p>
          </span>
          <span className="flex flex-col items-center w-full">
            <p className="text-sm opacity-65">Community Members</p>
            <p className="text-3xl">{streamerDetails?.followersCount}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChannelUserDetail;
