import { NavLink, Outlet, useParams } from "react-router";
import VideoComponent from "../components/VideoComponent";
import { streamURL } from "../api/axios";
import ChannelUserDetail from "../components/ChannelUserDetail";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getstreamerDetails } from "../api/streams.api";

const Channel = () => {
  const { id } = useParams();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["channel-streamer-details", id],
    queryFn: ({ pageParam = 0 }) => getstreamerDetails(id, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.streamVideosResponse.last
        ? undefined
        : lastPage.streamVideosResponse.number + 1,
    enabled: !!id,
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
  });

  const streamerDetails = data?.pages?.[0];
  const latestStream = data?.pages?.[0].streamVideosResponse?.content?.[0];
  // console.log(data);

  if (isLoading) {
    return <p>Loading....</p>;
  }
  return (
    <div className="w-full relative pr-4">
      {latestStream?.status == "LIVE" ? (
        <VideoComponent
          videoURL={streamURL + latestStream.url}
          control={false}
        />
      ) : (
        <img
          src="/profile.jpeg"
          alt=""
          className="w-full h-96 object-cover rounded-md"
        />
      )}

      <div className="absolute top-1/2 right-0 left-0 flex flex-col bg-[#0e0e10] gap-5 pr-4 md:mr-24">
        <ChannelUserDetail
          streamerDetails={streamerDetails}
          latestStreamVideo={latestStream}
        />
        <div className="w-full mb-3">
          <ul className="flex gap-8 text-xl mb-7">
            <NavLink to="" end>
              <li className="">Home</li>
            </NavLink>
            <NavLink to="about">
              <li>About</li>
            </NavLink>
            <NavLink to="videos">
              <li>Videos</li>
            </NavLink>
          </ul>
          {/* <hr className="w-full pb-3 opacity-60"/> */}
          <Outlet
            context={{
              data,
              isFetchingNextPage,
              fetchNextPage,
              hasNextPage,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Channel;
