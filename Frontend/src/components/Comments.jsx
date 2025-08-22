import React, { useContext, useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { LiaComments } from "react-icons/lia";
import SockJS from "sockjs-client";
import { baseURL } from "../config/AxiosHelper";
import { Stomp } from "@stomp/stompjs";
import { GetMessages } from "../services/StreamService";
import { UserContext } from "../context/UserDetailsContext";

const Comments = ({ streamId }) => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);
  const { userDetail } = useContext(UserContext);
  
  const userId = userDetail.id;

  useEffect(() => {
    const connectWebSocket = () => {
      const client = Stomp.over(() => new SockJS(`${baseURL}/chat`));
      client.connect({}, () => {
        setStompClient(client);
        client.subscribe(`/topic/stream/${streamId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };
    connectWebSocket();
  }, [streamId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const message = await GetMessages(streamId);
        setMessages(message);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (stompClient && input.trim()) {
      const message = {
        userId: userId, // dont forget to dynamically add the user id
        content: input,
      };
      stompClient.send(
        `/app/sendMessage/${streamId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }
  };

  const userColorMap = useRef({});

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    messages.forEach((message) => {
      if (!userColorMap.current[message.userName]) {
        userColorMap.current[message.userName] = getRandomColor();
      }
    });
  }, [messages]); // runs when messages change

  return (
    <div className="h-full bg-theme grid grid-cols-1 grid-rows-12">
      <h1 className="w-full py-2 flex px-4 items-center justify-between text-2xl border-b-[1px] font-semibol row-span-1">
        Stream Chat <LiaComments size={22} />
      </h1>
      <div
        ref={chatBoxRef}
        className="w-full row-span-10 overflow-y-scroll relative no-scrollbar mt-2"
      >
        <div className="absolute w-full flex flex-col gap-0.5 px-2 pb-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className="w-full flex items-start gap-0.5 rounded-sm mb-1.5"
            >
              <div className="w-6 h-6 shrink-0">
                <img
                  src={baseURL + message.userProfile}
                  alt=""
                  className="w-full h-full object-cover rounded-xs"
                />
              </div>
              <div className="flex gap-2">
                <p
                  className="shrink-0 break-all font-semibold"
                  style={{ color: userColorMap.current[message.userName] }}
                >
                  {message.userName}:
                </p>
                <p className="break-all">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full row-span-1 bg-gray-800 border-4 border-purple-500 rounded-md pr-3 flex justify-between items-center gap-6">
        <input
          type="text"
          className="h-full outline-none font-semibold pl-3 w-full"
          placeholder="Send a message"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>
          <IoSend size={22} />
        </button>
      </div>
    </div>
  );
};

export default Comments;
