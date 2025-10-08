import { useNavigate, useParams } from "react-router";
import CategoryComp from "../components/CategoryComp";
import { useEffect, useState } from "react";
import { getCategories } from "../services/StreamService";
import VideoCard from "../components/VideoCard";

const Trending = () => {
  const { name } = useParams();
  const [streams, setStreams] = useState();
  const navigate = useNavigate();
  const getCategoryVideo = async () => {
    const streamVideos = await getCategories(name);
    setStreams(streamVideos);
    // console.log(streamVideos);
  };

  useEffect(() => {
    getCategoryVideo(name);
  }, [name]);

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <h1 className="text-7xl capitalize">{name}</h1>
      <div className="pr-4">
        <CategoryComp />
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {streams && streams.length > 0 ? (
          streams.map((stream, index) => {
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
    </div>
  );
};

export default Trending;
