import { useNavigate, useOutletContext } from "react-router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ChannelVideosCart from "./ChannelVideosCart";

const ChannelVideos = () => {
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    owner,
    setOwner,
  } = useOutletContext();
  const navigate = useNavigate();
  const { ref, inView } = useInView();

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
                <ChannelVideosCart videos={videos} owner={owner} />
              </div>
            );
          })}
        </div>
        <div ref={ref} className="h-10">
          {isFetchingNextPage && "Loading"}
        </div>
      </div>
    </div>
  );
};

export default ChannelVideos;
