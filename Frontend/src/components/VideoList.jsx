import { IoIosArrowForward } from "react-icons/io";
import VideoCard from "../components/VideoCard";
import LineEnd from "./LineEnd";

const VideoList = ({ title }) => {
  const items = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="text-2xl text-grade">{title}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {items.map((item, index) => {
          return <VideoCard index={index} />;
        })}
      </div>
      <div>
        <LineEnd
          text={"Show more"}
          icon={<IoIosArrowForward size={15} />}
          link={"/"}
        />
      </div>
    </div>
  );
};

export default VideoList;
