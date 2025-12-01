import MainCarosel from "../components/MainCarosel";
import VideoList from "../components/videos/VideoList";
import TopStreamers from "../components/topStreamers/TopStreamers";
import CategoryComp from "../components/CategoryComp";
import { getAllStreams, getLiveStreams } from "../api/streams.api";
import useInfiniteScrollContext from "../context/useInfiniteScrollContext";
import TopStreamersSkeleton from "../components/topStreamers/TopStreamersSkeleton";
import VideosCardSkeleton from "../components/videos/VideosCardSkeleton";
import { IoIosArrowForward } from "react-icons/io";

const Home = () => {
  const {
    data: recordedStreams,
    hasNextPage: recordedHasNextPage,
    fetchNextPage: recordedFetchNextPage,
    isFetchingNextPage: recordedIsFetchingNextPage,
    isLoading: recordedLoading,
    isError: recordedError,
    isFetching: recordedIsFetching,
    ref: recordedRef,
    inView: recordedInView,
  } = useInfiniteScrollContext(getAllStreams, null, "recorded-streams", false);

  const {
    data: liveStreams,
    isLoading: liveLoading,
    hasNextPage: liveHasNextPage,
    fetchNextPage: liveFetchNextPage,
    isFetchingNextPage: liveIsFetchingNextPage,
    isError: liveError,
    isFetching: liveIsFetching,
    ref: liveRef,
    inView: liveInView,
  } = useInfiniteScrollContext(getLiveStreams, null, "live-streams", true);

  if (recordedLoading || liveLoading) {
    return (
      <div className="h-screen flex flex-col gap-5 pr-4 animate-pulse">
        <div className="flex w-full h-1/3 gap-3">
          <div className="h-72 w-full bg-theme rounded"></div>
        </div>
        <div className="w-full">
          <div className="w-full">
            <div className="flex justify-between">
              <h1 className="font-semibold text-xl text-grade h-7 w-44 bg-theme rounded"></h1>
              <div className="flex items-center gap-2 opacity-70">
                <button className="rounded-full cursor-pointer text-grade h-7 w-7 bg-white/10"></button>
                <button className="rounded-full cursor-pointer text-grade h-7 w-7 bg-white/10"></button>
              </div>
            </div>
            <div className="mt-4 flex flex-row gap-4 md:gap-8 overflow-x-scroll no-scrollbar">
              {[...Array(16)].map((streamer, index) => {
                return <TopStreamersSkeleton key={index} />;
              })}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <div className="h-7 w-44 rounded bg-white/10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[...Array(4)].map((items, key) => {
                return <VideosCardSkeleton key={key} />;
              })}
            </div>
            <span className="opacity-30 flex items-center gap-2">
              <hr className="w-full" />
              <span className="h-6 w-36 rounded-xl bg-theme"></span>
              <hr className="w-full" />
            </span>
          </div>
        </div>
        <div className="w-full py-3">
          <div className="flex gap-3">
            {[...Array(4)].map((items, key) => {
              return (
                <div key={key} className="h-14 w-full bg-theme rounded"></div>
              );
            })}
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <div className="h-7 w-44 rounded bg-white/10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[...Array(4)].map((items, key) => {
                return <VideosCardSkeleton key={key} />;
              })}
            </div>
          </div>
          <span className="opacity-30 flex items-center gap-2">
            <hr className="w-full" />
            <span className="h-6 w-36 rounded-xl bg-theme"></span>
            <hr className="w-full" />
          </span>
        </div>
      </div>
    );
  }

  if (recordedError || liveError) {
    return <p className="text-red-500 p-5">Failed to load streams.</p>;
  }

  return (
    <div className="h-screen flex flex-col gap-5 pr-4">
      <div className="flex w-full h-1/3 gap-3">
        <div className="w-full">
          <MainCarosel />
        </div>
      </div>
      <div className="w-full">
        <TopStreamers title={"Top Streamers"} />
      </div>
      <div className="w-full">
        <VideoList
          title={"Recommended for you"}
          streams={recordedStreams}
          isFetchingNextPage={recordedIsFetchingNextPage}
          observerRef={recordedRef}
        />
      </div>
      <div className="w-full py-3">
        <CategoryComp />
      </div>
      <div className="w-full">
        <VideoList
          title={"Live Streaming"}
          streams={liveStreams}
          isFetchingNextPage={liveIsFetchingNextPage}
          observerRef={liveRef}
        />
      </div>
    </div>
  );
};

export default Home;
