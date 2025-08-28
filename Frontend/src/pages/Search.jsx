import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  searchByUserName,
  searchVideoInDesc,
  searchVideoInTitle,
} from "../services/StreamService";
import SearchVideosContainer from "../components/SearchVideosContainer";
import { MdOutlineArrowOutward } from "react-icons/md";
import { GoArrowUpLeft } from "react-icons/go";
import ChannelContainer from "../components/ChannelContainer";
import SearchChannels from "../components/SearchChannels";

const Search = () => {
  const [searchParam] = useSearchParams();
  const term = searchParam.get("term");
  const [descVideos, setDescVideos] = useState();
  const [titleVideo, setTitleVideo] = useState();
  const [userChannel, setUserChannel] = useState();

  const searchInDesc = async (term) => {
    const video = await searchVideoInDesc(term);
    // console.log("Description: ");
    // console.log(video);
    setDescVideos(video);
  };

  const searchInTitle = async (term) => {
    const video = await searchVideoInTitle(term);
    // console.log("Title: ");
    // console.log(video);
    setTitleVideo(video);
  };

  const searchUserChannel = async (term) => {
    const channel = await searchByUserName(term);
    // console.log("Channels: ");
    setUserChannel(channel);
  };

  useEffect(() => {
    searchInDesc(term);
    searchInTitle(term);
    searchUserChannel(term);
  }, [term]);

  if (!descVideos || !titleVideo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-fit md:px-[8vw] px-[5vw] flex flex-col gap-2">
      <div>
        <h2 className="flex items-end gap-1">
          <span className="flex items-end">
            <GoArrowUpLeft size={30} className="text-grade" />
            Search for{" "}
          </span>
          <span className="capitalize underline text-xl text-grade">
            {term}
          </span>
        </h2>
        <hr className="opacity-40 mt-1" />
      </div>
      {userChannel.length > 0 && (
        <div className="w-full mt-2">
          <p className="my-1 text-2xl text-grade">Channels</p>
          <div className="flex flex-col">
            {userChannel.map((channel, index) => (
              <SearchChannels channel={channel} key={index} />
            ))}
          </div>
          <hr className="opacity-30" />
        </div>
      )}
      {titleVideo.length > 0 && (
        <div className="w-full mt-2">
          <p className="my-1 text-2xl text-grade">Title</p>
          <SearchVideosContainer videos={titleVideo} />
        </div>
      )}
      {descVideos.length > 0 && (
        <div className="w-full">
          <p className="my-1 text-2xl text-grade">Description</p>
          <SearchVideosContainer videos={descVideos} />
        </div>
      )}
    </div>
  );
};

export default Search;
