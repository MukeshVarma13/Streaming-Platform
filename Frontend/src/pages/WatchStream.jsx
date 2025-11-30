import VideoComponent from "../components/VideoComponent";
import Comments from "../components/Comments";
import { useParams } from "react-router";
import { baseURL, streamURL } from "../api/axios";
import ChannelContainer from "../components/ChannelContainer";
import Description from "../components/Description";
import { useQuery } from "@tanstack/react-query";
import { getStream } from "../api/streams.api";
import { useState } from "react";
import { RiExpandLeftLine } from "react-icons/ri";
import ChannelContainerSkeleton from "../components/ChannelContainerSkeleton";

const WatchStream = () => {
  const { streamId } = useParams();
  const [showComments, setShowComments] = useState(true);

  const {
    data: streamData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["stream-details", streamId],
    queryFn: async () => {
      const res = await getStream(streamId);
      return res.data;
    },
    refetchInterval: 5000,
  });

  // console.log(streamData);

  if (isLoading) {
    return (
      <div className="text-white flex items-center justify-center h-screen text-xl">
        Loading stream...
      </div>
    );
  }

  if (isError || !streamData) {
    return (
      <div className="text-red-400 text-xl flex items-center justify-center h-screen">
        Failed to load stream.
      </div>
    );
  }

  const videoSrc =
    streamData.status === "LIVE"
      ? streamURL + streamData.url
      : baseURL + streamData.url;

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 h-screen w-screen md:pl-44 md:pt-16 pt-2 overflow-hidden">
      <div
        className={`grid ${
          showComments ? "grid-cols-5" : ""
        }  h-full w-full relative`}
      >
        <div className="h-full col-span-3 md:col-span-4 overflow-y-scroll no-scrollbar">
          <div
            className={`border-b-[1px] relative bg-black ${
              showComments ? "" : "md:h-10/12 md:flex md:justify-center"
            } `}
          >
            <div className="aspect-video">
              <button
                onClick={() => setShowComments(!showComments)}
                className="absolute right-1 top-1 md:top-3 z-10 h-fit hover:bg-white/20 p-1 rounded-full duration-300"
              >
                <RiExpandLeftLine size={22} />
              </button>
              <VideoComponent
                videoURL={videoSrc}
                thumbnail={baseURL + streamData.thumbnail}
              />
            </div>
          </div>
          <div className="w-full py-3 px-6 flex flex-col gap-8">
            {isLoading ? (
              <ChannelContainerSkeleton />
            ) : (
              <ChannelContainer streamData={streamData} streamId={streamId} />
            )}
            <Description streamData={streamData} />
          </div>
        </div>
        <div
          className={`col-span-2 md:col-span-1 md:h-full ${
            showComments ? "" : "hidden"
          }`}
        >
          <Comments streamId={streamId} />
        </div>
      </div>
    </div>
  );
};

export default WatchStream;
