import { IoIosArrowForward } from "react-icons/io";
import VideoCard from "../components/VideoCard";
import LineEnd from "./LineEnd";
import { NavLink } from "react-router";

const VideoList = ({ title, streams }) => {
  // console.log(streams);
  if (!streams) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="text-2xl text-grade">{title}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {streams.slice(0, 5).map((stream, index) => {
          return <VideoCard key={index} stream={stream} />;
        })}
      </div>
      <div>
        {/* <LineEnd
          text={"Show more"}
          icon={<IoIosArrowForward size={15} />}
          link={"/"}
        /> */}
        <NavLink className="w-full text-nowrap">
          <span className="text-[12px] opacity-60 flex items-center gap-2">
            <hr className="w-full" />
            <span className="flex items-center gap-1 text-grade">
              Show more
              <IoIosArrowForward size={15} />
            </span>
            <hr className="w-full" />
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default VideoList;
