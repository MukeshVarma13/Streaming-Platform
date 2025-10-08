import MainCarosel from "../components/MainCarosel";
import VideoList from "../components/VideoList";
import TopStreamers from "../components/TopStreamers";
import CategoryComp from "../components/CategoryComp";
import { useEffect, useState } from "react";
import {
  GetLiveStreamVideo,
  GetStreamedVideo,
} from "../services/StreamService";

const Home = () => {
  const [streamVideos, setStreamVideos] = useState();
  const [liveStreams, setLiveStreams] = useState();

  const getStreamedVideos = async () => {
    const streamedVideos = await GetStreamedVideo();
    setStreamVideos(streamedVideos);
    // console.log(streamedVideos);
  };

  const getLiveStreamVideo = async () => {
    const liveStreamsVideos = await GetLiveStreamVideo();
    setLiveStreams(liveStreamsVideos);
    // console.log(liveStreamsVideos);
  };

  useEffect(() => {
    getStreamedVideos();
    getLiveStreamVideo();
  }, []);

  if (!streamVideos || !liveStreams) {
    return <p>Loading...</p>;
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
        <VideoList title={"Recommended for you"} streams={streamVideos} />
      </div>
      <div className="w-full py-3">
        <CategoryComp />
      </div>
      <div className="w-full">
        <VideoList title={"Live Streaming"} streams={liveStreams} />
      </div>
    </div>
  );
};

export default Home;
