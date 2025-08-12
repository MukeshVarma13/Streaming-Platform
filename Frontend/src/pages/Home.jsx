import MainCarosel from "../components/MainCarosel";
import VideoList from "../components/VideoList";
import TopStreamers from "../components/TopStreamers";
import CategoryComp from "../components/CategoryComp";

const Home = () => {
  return (
    <div className="h-screen flex flex-col gap-5 pr-4">
      <div className="flex w-full h-1/3 gap-3">
        <div className="w-full">
          <MainCarosel />
        </div>
      </div>
      <div className="pr-5">
        <TopStreamers title={"Top Streamers"} />
      </div>
      <div className="w-full h-1/2">
        <VideoList title={"Recommended for you"} />
      </div>
      <div className="w-full py-3">
        <CategoryComp />
      </div>
      <div className="w-full h-1/2">
        <VideoList title={"Live Streaming"} />
      </div>
    </div>
  );
};

export default Home;
