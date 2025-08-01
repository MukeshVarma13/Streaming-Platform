import React from "react";
import Logo from "../components/Logo";
import MainCarosel from "../components/MainCarosel";
import RightCarosel from "../components/RightCarosel";
import VideoList from "../components/VideoList";
import TopStreamers from "../components/TopStreamers";
import CategoryComp from "../components/CategoryComp";

const Home = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex w-full h-1/2 gap-3">
        <div className="w-3/4">
          <MainCarosel />
        </div>
        <div className="w-full">
          <RightCarosel title={"Continue Watching"} />
        </div>
      </div>
      <div className="mt-6 pr-5">
        <TopStreamers title={"Top Streamers"} />
      </div>
      <div className="w-full h-1/2 mt-7 pr-5">
        <VideoList title={"Recommended for you"} />
      </div>
      <div className="w-full mt-6 pr-5">
        <CategoryComp />
      </div>
    </div>
  );
};

export default Home;
