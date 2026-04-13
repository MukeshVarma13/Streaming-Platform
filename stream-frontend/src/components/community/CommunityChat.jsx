import ChannelWelcomeHeader from "./modals/ChannelWelcomeHeader";
import VoiceChannelStage from "./VoiceChannelStage";
import { channelDetail } from "../../api/community";
import { useQuery } from "@tanstack/react-query";
import useCommunityChat from "../../context/useCommunityChat";
import { Loader } from "lucide-react";
import { baseURL } from "../../api/axios";

const CommunityChat = ({ channelId, openMembers, setOpenMembers }) => {
  // const { channelId } = useParams();

  const {
    data: currentChannel,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["channel-details", channelId],
    queryFn: () => channelDetail(channelId).then((res) => res.data),
    enabled: !!channelId,
  });

  const {
    chats: currentMessagesList,
    input,
    setInput,
    sendMessage,
    chatBoxRef,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError: chatError,
    isLoadingMessages,
    isFetching,
    observerRef,
    inView,
  } = useCommunityChat(channelId);

  if (currentMessagesList) {
    currentMessagesList.reverse();
  }
  // console.log(currentMessagesList);

  if (!currentChannel || !currentMessagesList) {
    return <div>Loading..</div>;
  }

  return (
    <div className="flex flex-col bg-[#36393e] h-full w-full">
      {/* Top Bar */}
      <div className="h-12 border-b border-[#202225] flex items-center px-4 shadow-sm">
        {currentChannel?.type === "TEXT" ? (
          <i className="fa-solid fa-hashtag text-[#949ba4] mr-2" />
        ) : (
          <i className="fa-solid fa-microphone text-[#949ba4] mr-2" />
        )}
        <div className="font-semibold h-12 flex items-center text-xl">
          {currentChannel ? currentChannel.channelName : "Welcome"}
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-4 text-[#949ba4]">
          <i className="fa-solid fa-magnifying-glass cursor-pointer hover:text-white" />
          <i
            onClick={() => setOpenMembers(!openMembers)}
            className="fa-solid fa-user-group cursor-pointer hover:text-white"
          />
          <div className="w-px h-6 bg-[#202225]" />
          <i className="fa-solid fa-bell cursor-pointer hover:text-white" />
        </div>
      </div>

      <div
        ref={chatBoxRef}
        className="overflow-y-scroll no-scrollbar w-full h-full"
      >
        <div className="h-full">
          <div className="h-full flex">
            <ChannelWelcomeHeader channelName={currentChannel.channelName} />
          </div>
          {currentMessagesList?.length > 0 ? (
            <div className="space-y-6 h-full">
              {/* Content Area */}
              {currentChannel?.type === "TEXT" ? (
                /* Chat Mode */
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {hasNextPage && (
                    <div
                      ref={observerRef}
                      className="flex w-full items-center justify-center"
                    >
                      {isFetchingNextPage && (
                        <Loader size={30} className="animate-spin" />
                      )}
                    </div>
                  )}
                  {currentMessagesList?.map((msg) => (
                    <div key={msg.id} className="message flex gap-2 group">
                      {msg.userProfile ? (
                        <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white text-xl">
                          <img
                            src={baseURL + msg.userProfile}
                            className="w-full h-full"
                          />
                        </div>
                      ) : (
                        <div
                          className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white text-xl"
                          style={{ backgroundColor: "#faa61a" }}
                        >
                          {msg.userName[0]}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-semibold cursor-pointer">
                            {msg.userName}
                          </span>
                          <span className="message-timestamp text-xs text-[#949ba4]">
                            {msg.time}
                          </span>
                        </div>
                        <div className="text-[#dcddde] leading-relaxed mr-2 w-fit bg-white/10 py-1 px-2 rounded-r-xl rounded-b-xl wrap-anywhere text-sm">
                          {msg.content.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Voice Connected Mode */
                <div className="flex-1 flex items-center justify-center bg-linear-to-br from-[#2f3136] to-[#36393e] p-8">
                  <div className="text-center max-w-md">
                    <div className="text-6xl mb-6 animate-pulse">🎤</div>
                    <h2 className="text-3xl font-bold mb-2">Voice Connected</h2>
                    <p className="text-[#b9bbbe]">
                      {currentChannel
                        ? `In ${currentChannel.channelName}`
                        : "Joining..."}
                    </p>

                    {currentChannel?.type === "VIDEO" && (
                      <div className="mt-8 flex justify-center gap-8">
                        <div className="flex flex-col items-center group cursor-pointer">
                          <div className="w-12 h-12 bg-[#f04747] hover:bg-[#d83c3e] rounded-full flex items-center justify-center text-2xl transition-colors">
                            📴
                          </div>
                          <span className="text-xs mt-2 text-[#f04747] font-semibold">
                            Leave
                          </span>
                        </div>
                        <div className="flex flex-col items-center group cursor-pointer">
                          <div className="w-12 h-12 bg-[#3ba55c] hover:bg-[#2d8047] rounded-full flex items-center justify-center text-2xl transition-colors">
                            🎙️
                          </div>
                          <span className="text-xs mt-2 text-[#3ba55c] font-semibold">
                            Mute
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="mt-12 text-[#949ba4] text-sm italic">
                      Connected with 4 others
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            currentChannel?.type == "VIDEO" && <VoiceChannelStage />
          )}
        </div>
      </div>

      {/* Message Input (Only visible in text channels) */}
      {currentChannel?.type === "TEXT" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="px-4 pb-6"
        >
          <div className="bg-[#40444b] rounded-lg px-4 py-3 flex items-center shadow-inner">
            <i className="fa-solid fa-circle-plus text-[#b9bbbe] hover:text-white mr-4 text-xl cursor-pointer transition-colors" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     sendMessage();
              //   }
              // }}
              placeholder={
                currentChannel ? `Message #${currentChannel.channelName}` : ""
              }
              className="flex-1 bg-transparent outline-none text-white placeholder-[#72767d]"
            />
            <button
              type="submit"
              className="ml-4 text-[#b9bbbe] hover:text-[#5865f2] transition-colors"
            >
              <i className="fa-solid fa-paper-plane text-xl" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommunityChat;
