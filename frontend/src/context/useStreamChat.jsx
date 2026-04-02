import { useState, useEffect, useRef, useContext } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { baseURL } from "../config/AxiosHelper";
import { UserContext } from "../context/UserDetailsContext";
import { getMessages } from "../api/streams.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useStreamChat = (streamId) => {
  const [stompClient, setStompClient] = useState(null);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);
  const userColorMap = useRef({});
  const queryClient = useQueryClient();

  const { userDetail } = useContext(UserContext);
  const userId = userDetail?.id;

  const generateColor = () => {
    const letters = "0123456789ABCDEF";
    let c = "#";
    for (let i = 0; i < 6; i++) c += letters[Math.floor(Math.random() * 16)];
    return c;
  };

  const assignUserColors = (newMessages) => {
    newMessages.forEach((msg) => {
      if (!userColorMap.current[msg.userName]) {
        userColorMap.current[msg.userName] = generateColor();
      }
    });
  };

  // --- WebSocket Connect ---
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${baseURL}/chat`), // FIXED
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      // debug: (msg) => console.log("[STOMP]", msg),
    });

    client.onConnect = () => {
      setStompClient(client);
      client.subscribe(`/topic/stream/${streamId}`, (msg) => {
        const newMessage = JSON.parse(msg.body);
        assignUserColors([newMessage]);
        queryClient.setQueryData(["stream-messages", streamId], (old = []) => [
          ...old,
          newMessage,
        ]);
      });
    };
    client.activate();
    return () => client.deactivate();
  }, [streamId]);

  // --- Load old messages ---
  const {
    data: messages = [],
    isLoading: isLoadingMessages,
    isError,
  } = useQuery({
    queryKey: ["stream-messages", streamId],
    queryFn: () =>
      getMessages(streamId).then((res) => {
        assignUserColors(res.data);
        return res.data;
      }),
  });

  // --- Auto Scroll ---
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // --- Send Message ---
  const sendMessage = () => {
    if (!stompClient || !input.trim()) return;

    const msgObj = {
      userId,
      content: input,
    };

    stompClient.publish({
      destination: `/app/sendMessage/${streamId}`,
      body: JSON.stringify(msgObj),
    });

    setInput("");
  };

  return {
    messages,
    isLoadingMessages,
    isError,
    input,
    setInput,
    sendMessage,
    chatBoxRef,
    userColorMap,
  };
};
