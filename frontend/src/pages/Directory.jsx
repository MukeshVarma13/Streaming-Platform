import { useNavigate, useParams } from "react-router";
import CategoryComp from "../components/CategoryComp";
import VideoCard from "../components/videosContainer/VideoCard";
import { getByCategories } from "../api/streams.api";
import useInfiniteScrollContext from "../context/useInfiniteScrollContext";
import VideosCardSkeleton from "../components/videosContainer/VideosCardSkeleton";
import TopStreamersSkeleton from "../components/topStreamers/TopStreamersSkeleton";

const Directory = () => {
  const { name } = useParams();
  const navigate = useNavigate();

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
  } = useInfiniteScrollContext(
    getByCategories,
    name,
    "category-streams",
    false
  );

  const streams = data?.pages?.flatMap((page) => page.content) ?? [];

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col gap-5 pr-4 animate-pulse">
        <h1 className="h-22 rounded bg-theme"></h1>
        <div className="w-full py-3">
          <div className="flex gap-3">
            {[...Array(5)].map((items, key) => {
              return (
                <div key={key} className="h-14 w-full bg-theme rounded"></div>
              );
            })}
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[...Array(4)].map((items, key) => {
                return <VideosCardSkeleton key={key} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-10 pr-3">
      <h1 className="text-7xl capitalize">{name}</h1>
      <div className="">
        <CategoryComp />
      </div>
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

export default Directory;
