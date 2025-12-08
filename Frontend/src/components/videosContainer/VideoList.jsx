import { IoIosArrowForward } from "react-icons/io";
import VideoCard from "./VideoCard";
import { useState } from "react";

const VideoList = ({ title, streams, isFetchingNextPage, observerRef }) => {
  const allStream = streams?.pages?.flatMap((page) => page.content) ?? [];
  const [showMore, setShowMore] = useState(true);
  // console.log(allStream);
  const handleShowmore = () => {
    setShowMore(false);
  };

  if (!streams) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="text-2xl text-grade">{title}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {(allStream?.length > 0) ? allStream?.map((stream, index) => {
          return <VideoCard key={index} stream={stream} />;
        }): <div>No streams available...</div>}
      </div>
      <div>
        {allStream?.length > 0 && showMore && (
          <span
            onClick={handleShowmore}
            className="text-[12px] opacity-60 flex items-center gap-2 text-nowrap cursor-pointer"
          >
            <hr className="w-full" />
            <span className="flex items-center gap-1 text-grade">
              Show more
              <IoIosArrowForward size={15} />
            </span>
            <hr className="w-full" />
          </span>
        )}
        {!showMore && (
          <div ref={observerRef} className="h-2">
            {isFetchingNextPage && "Loading more..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoList;
