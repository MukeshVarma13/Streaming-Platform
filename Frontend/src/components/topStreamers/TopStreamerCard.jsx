import { baseURL } from "../../api/axios";

const TopStreamerCard = ({ streamer }) => {
  const profile = streamer?.profilePic
    ? baseURL + streamer?.profilePic
    : "https://i.pinimg.com/736x/ab/fa/ac/abfaacbee15ce3011247f2c6182e9a63.jpg";

  return (
    <div className="flex flex-col items-center gap-2 shrink-0 cursor-pointer">
      <div className="p-1 border-[#6641A8] border-2 rounded-full">
        <img
          src={profile}
          alt=""
          loading="lazy"
          className="h-20 w-20 rounded-full bg-white"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-[12px] text-[#6641A8] self-center">
          Followers : {streamer?.followers?.length}
        </span>
        <h2 className="text-sm text-nowrap">{streamer?.name}</h2>
      </div>
    </div>
  );
};

export default TopStreamerCard;
