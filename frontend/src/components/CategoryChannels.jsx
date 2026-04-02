import { useOutletContext } from "react-router";
import useInfiniteScrollContext from "../context/useInfiniteScrollContext";
import { getByTags } from "../api/streams.api";
import VideoCard from "./videosContainer/VideoCard";
import VideosCardSkeleton from "./videosContainer/VideosCardSkeleton";

const CategoryChannels = () => {
  const { category } = useOutletContext();
  // console.log(category);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    isFetching,
    ref: observerRef,
    inView,
  } = useInfiniteScrollContext(getByTags, category, "tag-streams", false);

  const streams = data?.pages?.flatMap((page) => page.content) ?? [];

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col gap-5 pr-4 animate-pulse">
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[...Array(8)].map((items, key) => {
                return <VideosCardSkeleton key={key} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* <div className="mb-4">
        <CategoryComp />
      </div> */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {streams.length > 0 ? (
          streams?.map((stream, index) => {
            return <VideoCard stream={stream} index={index} key={index} />;
          })
        ) : (
          <div className="w-full flex flex-col items-center gap-4">
            <h1 className="text-3xl">OOP's Nothing Found</h1>
            <button
              onClick={() => navigate("/")}
              className="body-theme hover:border outline-none px-3 py-2 text-xl rounded-md cursor-pointer"
            >
              Return Home
            </button>
          </div>
        )}
      </div>
      {hasNextPage && (
        <div ref={observerRef} className="h-2">
          {isFetchingNextPage && "Loading more..."}
        </div>
      )}
    </div>
  );
};

export default CategoryChannels;
