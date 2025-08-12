import React, { useEffect, useState } from "react";
import VideoComponent from "../components/VideoComponent";
import Comments from "../components/Comments";
import { GetStreamDetails } from "../services/StreamService";
import { useParams } from "react-router";
import { baseURL } from "../config/AxiosHelper";
import ChannelContainer from "../components/ChannelContainer";
import Description from "../components/Description";

const WatchStream = () => {
  const [streamData, setStreamData] = useState();
  const { streamId } = useParams();

  const fetchStreamData = async () => {
    const response = await GetStreamDetails(streamId);
    setStreamData(response);
  };
  // console.log(streamData);

  useEffect(() => {
    fetchStreamData();
  }, [streamId]);

  if (!streamData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 h-screen w-screen pl-44 pt-16 overflow-hidden">
      <div className="grid grid-cols-5 h-full w-full">
        <div className="h-full col-span-4 overflow-y-scroll no-scrollbar">
          <div className="aspect-video">
            <VideoComponent
              videoURL={baseURL + streamData.url}
              thumbnail={baseURL + streamData.thumbnail}
            />
          </div>
          <div className="w-full py-3 px-6 flex flex-col gap-8 h-2/3">
            <ChannelContainer streamData={streamData} />
            <Description streamData={streamData} />
          </div>
        </div>
        <div className="col-span-1 h-full">
          <Comments streamId={streamId} />
        </div>
      </div>
    </div>
  );
};

export default WatchStream;
