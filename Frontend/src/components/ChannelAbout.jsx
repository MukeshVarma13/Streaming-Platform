import { useOutletContext } from "react-router";

const ChannelAbout = () => {
  const { streamerDetails } = useOutletContext();
  console.log(streamerDetails);

  return (
    <div className="w-full h-full">
      <h1 className="capitalize text-2xl mb-2">About {streamerDetails.name}</h1>
      <div className="w-full h-96 bg-theme"></div>
    </div>
  );
};

export default ChannelAbout;
