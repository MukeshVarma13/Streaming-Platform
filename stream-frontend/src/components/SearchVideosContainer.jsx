import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LineEnd from "./LineEnd";
import SearchVideosComp from "./SearchVideosComp";
import { useState } from "react";

const SearchVideosContainer = ({ videos }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  if (!videos) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-col gap-4 mb-4">
      {videos
        .map((video, index) => {
          return <SearchVideosComp key={index} video={video} />;
        })
        .slice(0, showMore ? videos.length : 3)}
      <button className="w-full text-nowrap" onClick={handleShowMore}>
        <span
          className={`text-[12px] opacity-60 flex items-center ${
            videos.length > 3 ? "gap-2" : ""
          }`}
        >
          <hr className="w-full" />
          <span className="flex items-center gap-1 text-grade">
            {videos.length > 3 ? (showMore ? "Show less" : "Show more") : ""}
            {videos.length > 3 ? (
              showMore ? (
                <IoIosArrowBack size={16} />
              ) : (
                <IoIosArrowForward size={16} />
              )
            ) : (
              ""
            )}
          </span>
          <hr className="w-full" />
        </span>
      </button>
    </div>
  );
};

export default SearchVideosContainer;
