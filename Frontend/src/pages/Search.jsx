import { useSearchParams } from "react-router";
import {
  searchByUserName,
  searchVideoInDesc,
  searchVideoInTitle,
} from "../api/streams.api";
import SearchVideosContainer from "../components/SearchVideosContainer";
import { GoArrowUpLeft } from "react-icons/go";
import SearchChannels from "../components/SearchChannels";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Search = () => {
  const [searchParam] = useSearchParams();
  const term = searchParam.get("term");

  const {
    data: descVideos,
    isLoading: descLoading,
    isError: descError,
  } = useQuery({
    queryKey: ["description-search", term],
    queryFn: () => searchVideoInDesc(term).then((res) => res.data),
    enabled: !!term,
  });

  const {
    data: titleVideo,
    isLoading: titleLoading,
    isError: titleError,
  } = useQuery({
    queryKey: ["title-search", term],
    queryFn: () => searchVideoInTitle(term).then((res) => res.data),
    enabled: !!term,
  });

  const {
    data: channelUser,
    isLoading: channelLoading,
    isError: channelError,
  } = useQuery({
    queryKey: ["channel-search", term],
    queryFn: () => searchByUserName(term).then((res) => res.data),
    enabled: !!term,
  });

  if (descLoading || titleLoading || channelLoading) {
    return <p className="text-white p-5">Loading...</p>;
  }

  if (descError || titleError || channelError) {
    return <p className="text-red-500 p-5">Failed to load streams.</p>;
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
      {channelUser.length > 0 && (
        <div className="w-full mt-2">
          <p className="my-1 text-2xl text-grade">Channels</p>
          <div className="flex flex-col">
            {channelUser.map((channel, index) => (
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
