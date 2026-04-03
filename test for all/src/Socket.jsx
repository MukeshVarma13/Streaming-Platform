import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";

const Socket = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const stompClientRef = useRef(null);
  const SOCKET_URL = "https://englacial-lynell-prohibitively.ngrok-free.dev/ws";

  useEffect(() => {
    const socket = new SockJS(SOCKET_URL);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log("Connected to Websocket");
        stompClient.subscribe("/topic/signals", (response) => {
          console.log("Received message: ", response.body);
          setMessage(JSON.parse(response.body));
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });
    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const sendMessage = () => {
    const stompClient = stompClientRef.current;
    if (stompClient && stompClient.connected) {
      console.log("Sending message: ", name);
      stompClient.publish({
        destination: "/app/signal",
        body: JSON.stringify({ content: name }),
      });
    } else {
      console.error("Stomp client is not connected");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div style={{ marginTop: "20px" }}>
        <strong>Server Response:</strong> {JSON.stringify(message)}
      </div>
    </div>
  );
};

export default Socket;
