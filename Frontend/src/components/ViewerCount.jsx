import { useEffect, useState } from "react";
import { baseURL } from "../config/AxiosHelper";

const ViewerCount = ({ streamId }) => {
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    const socket = new WebSocket(`${baseURL}/viewers?streamId=${streamId}`);

    socket.onopen = () => {
      console.log("Connected to viewers counter for stream " + streamId);
    };

    socket.onmessage = (e) => {
      setViewers(parseInt(e.data, 10));
    };

    socket.onclose = () => {
      console.log("Disconneted from viewer counter for stream " + streamId);
    };

    return () => {
      socket.close();
    };
  }, [streamId]);

  return <span>{viewers}</span>;
};

export default ViewerCount;
