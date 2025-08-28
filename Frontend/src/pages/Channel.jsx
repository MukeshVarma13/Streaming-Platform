import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getstreamerDetails } from "../services/StreamService";

const Channel = () => {
  const { id } = useParams();
  const [streamerDetails, setStreamerDetails] = useState();

  const getDetails = async (id) => {
    const details = await getstreamerDetails(id);
    setStreamerDetails(details);
  };
  
  console.log(streamerDetails);

  useEffect(() => {
    getDetails(id);
  }, [id]);
  return <div className="w-full h-full bg-red-500">Channel {id}</div>;
};

export default Channel;
