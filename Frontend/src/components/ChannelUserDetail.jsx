import { baseURL } from "../config/AxiosHelper";
import IsUserFollowing from "./IsUserFollowing";

const ChannelUserDetail = ({ streamerDetails, latestStreamVideo }) => {
  
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-purple-5 flex items-center my-4 gap-4">
        <div className="h-28 w-28 rounded-full relative">
          <img
            src={baseURL + streamerDetails?.profilePic}
            alt=""
            className="w-full h-full rounded-full object-cover bg-theme"
          />
          <div
            className={`absolute -bottom-1 w-full flex items-center justify-center ${
              latestStreamVideo?.isLive ? "" : "hidden"
            }`}
          >
            <p className="bg-red-500 px-1 rounded-sm font-semibold">LIVE</p>
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <h1 className="text-3xl text-grade capitalize">
            {streamerDetails?.name}
          </h1>
          <p className="w-48 h-4 bg-white rounded opacity-75"></p>
          <p className="w-48 h-4 bg-white rounded opacity-75"></p>
          <IsUserFollowing streamerDetail={streamerDetails} />
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
            <p className="text-3xl">{streamerDetails?.followers?.length}</p>
          </span>
          <span className="flex flex-col items-center w-full">
            <p className="text-sm opacity-65">Community Members</p>
            <p className="text-3xl">{streamerDetails?.following?.length}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChannelUserDetail;
