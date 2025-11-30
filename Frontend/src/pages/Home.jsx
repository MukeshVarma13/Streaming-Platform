import MainCarosel from "../components/MainCarosel";
import VideoList from "../components/VideoList";
import TopStreamers from "../components/TopStreamers";
import CategoryComp from "../components/CategoryComp";
import { getAllStreams, getLiveStreams } from "../api/streams.api";
import useInfiniteScrollContext from "../context/useInfiniteScrollContext";

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
    return <p className="text-white p-5">Loading...</p>;
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
