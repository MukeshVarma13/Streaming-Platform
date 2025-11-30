import { useNavigate, useParams } from "react-router";
import CategoryComp from "../components/CategoryComp";
import VideoCard from "../components/VideoCard";
import { getByCategories } from "../api/streams.api";
import useInfiniteScrollContext from "../context/useInfiniteScrollContext";

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
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-10 pr-3">
      <h1 className="text-7xl capitalize">{name}</h1>
      <div className="">
        <CategoryComp />
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {streams.length > 0 ? (
          <div>
            {streams.map((stream, index) => {
              return <VideoCard stream={stream} index={index} key={index} />;
            })}
            <div ref={observerRef} className="h-10">
              {isFetchingNextPage && "Loading..."}
            </div>
          </div>
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
    </div>
  );
};

export default Directory;
