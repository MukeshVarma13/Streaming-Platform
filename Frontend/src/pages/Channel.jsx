import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router";
import { getstreamerDetails } from "../services/StreamService";
import VideoComponent from "../components/VideoComponent";
import { baseURL } from "../config/AxiosHelper";
import ChannelUserDetail from "../components/ChannelUserDetail";

const Channel = () => {
  const { id } = useParams();
  const [streamerDetails, setStreamerDetails] = useState();
  const [latestStream, setLatestStream] = useState();

  const getDetails = async (id) => {
    const details = await getstreamerDetails(id);
    setStreamerDetails(details);
    setLatestStream(details.streamVideosResponse.toReversed()[1]); // Change this later
  };

  useEffect(() => {
    getDetails(id);
  }, [id]);

  if (!streamerDetails || !latestStream) {
    return <p>Loading....</p>;
  }
  return (
    <div className="w-full relative px-">
      {latestStream.isLive ? (
        <VideoComponent videoURL={baseURL + latestStream.url} control={false} /> // change this later too
      ) : (
        <img
          src="/profile.jpeg"
          alt=""
          className="w-full h-96 object-cover rounded-md"
        />
      )}

      <div className="absolute top-1/2 right-0 left-0 flex flex-col bg-[#0e0e10] gap-5 pr-4 mr-24">
        <ChannelUserDetail
          streamerDetails={streamerDetails}
          latestStreamVideo={latestStream}
        />
        <div className="w-full mb-3">
          <ul className="flex gap-8 text-xl mb-7">
            <NavLink to="" end>
              <li className="">Home</li>
            </NavLink>
            <NavLink to="about">
              <li>About</li>
            </NavLink>
            <NavLink to="videos">
              <li>Videos</li>
            </NavLink>
          </ul>
          {/* <hr className="w-full pb-3 opacity-60"/> */}
          <Outlet context={{ streamerDetails }} />
        </div>
      </div>
    </div>
  );
};

export default Channel;
