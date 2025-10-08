import { useNavigate, useOutletContext } from "react-router";
import { baseURL } from "../config/AxiosHelper";

const ChannelVideos = () => {
  const { streamerDetails } = useOutletContext();
  const navigate = useNavigate();
  // console.log(streamerDetails);

  return (
    <div className="w-full">
      <div className="w-full h-full">
        <div className="grid grid-cols-4 gap-4 ">
          {streamerDetails.streamVideosResponse.map((videos, index) => {
            return (
              <div key={index}>
                <div
                  className="aspect-video rounded"
                  onClick={() => {
                    navigate(`/stream/${videos.id}`);
                  }}
                >
                  <img
                    src={baseURL + videos.thumbnail}
                    alt=""
                    className="h-full w-full aspect-video bg-theme rounded"
                  />
                </div>
                <div className="py-1 flex flex-col pl-0.5 capitalize">
                  <p
                    className="text-xl"
                    onClick={() => {
                      navigate(`/stream/${videos.id}`);
                    }}
                  >
                    {videos.title}
                  </p>
                  {/* <span className="text-xs">{videos.likes.length} Likes</span> */}
                  <div className="flex gap-2 items-center flex-wrap text-sm">
                    {videos.categories.map((category, index) => {
                      return (
                        <h2
                          className="text-grade capitalize cursor-pointer"
                          key={index}
                          onClick={() => {
                            navigate(`/directory/category/${category}`);
                          }}
                        >
                          {category}
                        </h2>
                      );
                    })}
                    {videos.tags.map((tag, index) => {
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChannelVideos;
