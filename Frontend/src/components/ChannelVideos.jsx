import { useNavigate, useOutletContext } from "react-router";
import { baseURL } from "../config/AxiosHelper";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ChannelVideos = () => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useOutletContext();
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  // console.log(streamerDetails);

  const allVideos =
    data?.pages.flatMap((page) => page.streamVideosResponse.content) ?? [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  if (!allVideos.length) {
    return <div className="text-gray-400 p-5">No recent streams found.</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full h-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allVideos?.map((videos, index) => {
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
                    <h2
                      className="text-grade capitalize cursor-pointer"
                      onClick={() => {
                        navigate(`/directory/${videos.categories}`);
                      }}
                    >
                      {videos.categories}
                    </h2>
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
        <div ref={ref} className="h-10">{isFetchingNextPage && "Loading"}</div>
      </div>
    </div>
  );
};

export default ChannelVideos;
