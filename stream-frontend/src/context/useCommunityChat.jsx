import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./UserDetailsContext";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getChannelChats } from "../api/community";
import useInfiniteScrollContext from "./useInfiniteScrollContext";
import { baseURL } from "../api/axios";

const useCommunityChat = (channelId) => {
  const [stompClient, setStompClient] = useState(null);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);
  const queryClient = useQueryClient();

  const { userDetail } = useContext(UserContext);
  const userId = userDetail?.id;

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${baseURL}/chat`),
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      // debug: (msg) => console.log("[STOMP]", msg),
    });

    client.onConnect = () => {
      setStompClient(client);
      client.subscribe(`/topic/community/${channelId}`, (msg) => {
        const newMessage = JSON.parse(msg.body);
        queryClient.setQueryData(["community-chat", channelId], (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page, index) => {
              if (index === 0) {
                return {
                  ...page,
                  content: [...page.content, newMessage],
                };
              }
              return page;
            }),
          };
        });
      });
    };
    client.activate();
    return () => client.deactivate();
  }, [channelId]);

  const {
    data: messages = [],
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoading: isLoadingMessages,
    isFetching,
    ref: observerRef,
    inView,
  } = useInfiniteScrollContext(
    getChannelChats,
    channelId,
    "community-chats",
    true,
  );

  const chats = messages?.pages?.flatMap((page) => page.content) ?? [];
  //   console.log(chats);

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
      contentType: "TEXT",
      content: input,
    };

    stompClient.publish({
      destination: `/app/community/${channelId}`,
      body: JSON.stringify(msgObj),
    });

    setInput("");
  };

  return {
    chats,
    input,
    setInput,
    sendMessage,
    chatBoxRef,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoadingMessages,
    isFetching,
    observerRef,
    inView,
  };
};

export default useCommunityChat;
