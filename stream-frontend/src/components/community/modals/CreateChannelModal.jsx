import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createChannel } from "../../../api/community";
import { useNavigate } from "react-router";

const CreateChannelModal = ({
  showCreateChannelModal,
  setShowCreateChannelModal,
  channelType,
  setChannelType,
}) => {
  if (!showCreateChannelModal) return null;

  const [channelNameInput, setChannelNameInput] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (details) => createChannel(details),
    onSuccess: (data) => {
      // console.log(data);
      setShowCreateChannelModal(false);
      queryClient.invalidateQueries({ queryKey: ["community-details"] });
      navigate(`/community/channel/${data.data.channelId}`);
    },
    onError: (err) => {
      console.error(err);
      alert("Failed to create channel");
    },
  });

  const create = () => {
    const channelDetails = {
      channelName: channelNameInput,
      type: channelType,
    };
    // console.log(channelDetails);
    mutate(channelDetails);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          create();
        }}
        className="modal-anim bg-[#36393e] w-full max-w-md rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="px-6 py-6">
          <h2 className="text-xl font-bold text-white">Create Channel</h2>

          <div className="flex gap-4 mt-6">
            {/* Text Channel Option */}
            <button
              onClick={() => setChannelType("TEXT")}
              className={`flex-1 py-4 rounded-xl flex flex-col items-center transition-all duration-200 ${
                channelType === "TEXT"
                  ? "body-theme text-white shadow-lg"
                  : "bg-[#2f3136] text-[#b9bbbe] hover:bg-[#393c43]"
              }`}
            >
              <i className="fa-solid fa-hashtag text-3xl mb-2" />
              <span className="font-semibold">Text</span>
            </button>

            {/* Voice Channel Option */}
            <button
              onClick={() => setChannelType("VIDEO")}
              className={`flex-1 py-4 rounded-xl flex flex-col items-center transition-all duration-200 ${
                channelType === "VIDEO"
                  ? "body-theme text-white shadow-lg"
                  : "bg-[#2f3136] text-[#b9bbbe] hover:bg-[#393c43]"
              }`}
            >
              <i className="fa-solid fa-microphone text-3xl mb-2" />
              <span className="font-semibold">Voice</span>
            </button>
          </div>

          <div className="mt-8">
            <label className="uppercase text-xs font-bold text-[#949ba4] block mb-2 tracking-wider">
              Channel name
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#949ba4] text-xl">
                {channelType === "TEXT" ? "#" : "🔊"}
              </span>
              <input
                required={true}
                type="text"
                value={channelNameInput}
                onChange={(e) => setChannelNameInput(e.target.value)}
                className="w-full bg-[#202225] text-white p-4 pl-10 rounded-xl outline-none focus:ring-2 focus:ring-[#5865f2] transition-all"
                placeholder="new-channel"
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-[#2f3136] flex justify-end items-center gap-3">
          <button
            onClick={() => setShowCreateChannelModal(false)}
            className="px-6 py-2 text-white text-sm font-medium hover:underline transition-all"
          >
            Cancel
          </button>
          <button
            // onClick={createChannel}
            className="body-theme hover:bg-[#4752c4] px-8 py-2 rounded text-white font-semibold transition-all shadow-md active:scale-95"
          >
            Create Channel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChannelModal;
