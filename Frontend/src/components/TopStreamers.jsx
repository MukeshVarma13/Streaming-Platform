import { useRef } from "react";
import TopStreamerCard from "./TopStreamerCard";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { topStreamers } from "../api/streams.api";

const TopStreamers = ({ title }) => {
  const streamerRef = useRef(null);
  // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["top-streamers"],
    queryFn: ({ pageParam = 0 }) =>
      topStreamers(pageParam).then((res) => res.data),
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
  });
  // console.log(data);
  
  const streamers = data?.pages?.flatMap((page) => page.content);

  const scrollLeft = () => {
    if (streamerRef.current) {
      streamerRef.current.scrollBy({ left: -200, behaviour: "smooth" });
    }
  };
  const scrollRight = () => {
    if (streamerRef.current) {
      streamerRef.current.scrollBy({ left: 200, behaviour: "smooth" });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="font-semibold text-xl text-grade">{title}</h1>
        <div className="flex items-center gap-2 opacity-70">
          <button
            className="border rounded-full hover:text-white hover:bg-white cursor-pointer text-grade"
            onClick={scrollLeft}
          >
            <GrFormPreviousLink size={22} />
          </button>
          <button
            className="border rounded-full hover:text-white hover:bg-white cursor-pointer text-grade"
            onClick={scrollRight}
          >
            <GrFormNextLink size={22} />
          </button>
        </div>
      </div>
      <div
        className="mt-4 flex flex-row gap-4 md:gap-8 overflow-x-scroll no-scrollbar"
        ref={streamerRef}
      >
        {streamers?.map((streamer, index) => {
          return <TopStreamerCard key={index} streamer={streamer} />;
        })}
      </div>
    </div>
  );
};

export default TopStreamers;
