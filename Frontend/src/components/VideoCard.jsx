import { NavLink, useNavigate } from "react-router";
import { baseURL } from "../config/AxiosHelper";

const VideoCard = ({ stream }) => {
  // console.log(stream);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2">
      <NavLink to={`/stream/${stream?.id}`} className="aspect-video rounded">
        <img
          src={baseURL + stream?.thumbnail}
          alt=""
          loading="lazy"
          className="aspect-video w-full h-full bg-theme rounded"
        />
      </NavLink>
      <div className="flex gap-2 capitalize items-center">
        <NavLink
          to={`/channel/${stream?.streamUserResponse?.id}`}
          className="w-12 h-12 rounded-full"
        >
          <img
            src={baseURL + stream?.streamUserResponse?.profilePic}
            alt=""
            loading="lazy"
            className="w-full h-full rounded-full object-cover bg-theme"
          />
        </NavLink>
        <div>
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate(`/stream/${stream?.id}`);
            }}
          >
            <h2>{stream?.streamUserResponse?.name}</h2>
            <p className="text-sm">{stream?.title}</p>
          </div>
          <div className="flex gap-2 items-center flex-wrap text-sm">
            <h2
              className="text-grade capitalize cursor-pointer"
              onClick={() => {
                navigate(`/directory/${stream?.categories}`);
              }}
            >
              {stream?.categories}
            </h2>
            {stream?.tags?.map((tag, index) => {
              return (
                <span
                  className="bg-[#29292E] rounded-2xl px-2 capitalize text-center cursor-pointer"
                  key={index}
                  onClick={() => {
                    navigate(`/directory/tag/${tag}`);
                  }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
