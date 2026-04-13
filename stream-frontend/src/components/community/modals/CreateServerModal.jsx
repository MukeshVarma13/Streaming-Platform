import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaLaptopCode, FaPodcast } from "react-icons/fa";
import { IoMdMusicalNotes } from "react-icons/io";
import { IoGameControllerOutline } from "react-icons/io5";
import { LuMic } from "react-icons/lu";
import { createCommunity } from "../../../api/community";

const CreateServerModal = ({
  showCreateServerModal,
  setShowCreateServerModal,
}) => {
  if (!showCreateServerModal) return null;

  const [serverNameInput, setServerNameInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (details) => createCommunity(details),
    onSuccess: (data) => {
      setShowCreateServerModal(false);
      queryClient.invalidateQueries({ queryKey: ["community-details"] });
    },
    onError: (err) => {
      alert(err?.response?.data);
    },
  });

  const createServer = () => {
    const details = {
      communityName: serverNameInput,
    };
    mutate(details);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="modal-anim hover-theme w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-2xl font-bold text-center text-white">
            Create Your Server
          </h2>
          <p className="text-[#b9bbbe] text-center mt-2 text-sm">
            Choose a template or start from scratch
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div
              onClick={() => setSelectedTemplate("gaming")}
              className={`p-4 rounded-xl border-2 flex flex-col items-center cursor-pointer transition-all ${
                selectedTemplate === "gaming"
                  ? "border-[#5865f2] bg-theme"
                  : "border-transparent bg-[#2f3136] hover:border-[#5865f2]"
              }`}
            >
              <div className="text-5xl mb-3">
                <IoGameControllerOutline />
              </div>
              <div className="font-semibold text-white">Gaming</div>
            </div>
            <div
              onClick={() => setSelectedTemplate("irl")}
              className={`p-4 rounded-xl border-2 flex flex-col items-center cursor-pointer transition-all ${
                selectedTemplate === "chilling"
                  ? "border-[#3ba55c] bg-theme"
                  : "border-transparent bg-[#2f3136] hover:border-[#3ba55c]"
              }`}
            >
              <div className="text-5xl mb-3">
                <LuMic />
              </div>
              <div className="font-semibold text-white">IRL</div>
            </div>
            <div
              onClick={() => setSelectedTemplate("Music")}
              className={`p-4 rounded-xl border-2 flex flex-col items-center cursor-pointer transition-all ${
                selectedTemplate === "podcast"
                  ? "border-[#faa61a] bg-[#40444b]"
                  : "border-transparent bg-[#2f3136] hover:border-[#faa61a]"
              }`}
            >
              <div className="text-5xl mb-3">
                <IoMdMusicalNotes />
              </div>
              <div className="font-semibold text-white">Music</div>
            </div>

            <div
              onClick={() => setSelectedTemplate("Coding")}
              className={`p-4 rounded-xl border-2 flex flex-col items-center cursor-pointer transition-all ${
                selectedTemplate === "podcast"
                  ? "border-[#faa61a] bg-[#40444b]"
                  : "border-transparent bg-[#2f3136] hover:border-[#faa61a]"
              }`}
            >
              <div className="text-5xl mb-3">
                <FaLaptopCode />
              </div>
              <div className="font-semibold text-white">Coding</div>
            </div>

            {/* Study Template */}
            <div
              onClick={() => setSelectedTemplate("Podcast")}
              className={`p-4 rounded-xl border-2 flex flex-col items-center cursor-pointer transition-all ${
                selectedTemplate === "study"
                  ? "border-[#7289da] bg-[#40444b]"
                  : "border-transparent bg-[#2f3136] hover:border-[#7289da]"
              }`}
            >
              <div className="text-5xl mb-3">
                <FaPodcast />
              </div>
              <div className="font-semibold text-white">Podcast</div>
            </div>
          </div>

          <div className="mt-8">
            <label className="text-xs font-bold block mb-2 text-[#b9bbbe] uppercase tracking-wider">
              Server Name
            </label>
            <input
              value={serverNameInput}
              onChange={(e) => setServerNameInput(e.target.value)}
              className="w-full bg-[#202225] text-white rounded p-3 outline-none focus:ring-2 focus:ring-[#5865f2] transition-all"
              placeholder="My Awesome Server"
            />
          </div>
        </div>

        <div className="bg-theme px-6 py-4 flex justify-end gap-4 border-t border-[#202225]">
          <button
            onClick={() => setShowCreateServerModal(false)}
            className="px-4 py-2 text-white font-medium hover:underline transition-all"
          >
            Cancel
          </button>
          <button
            onClick={createServer}
            className="px-6 py-2 body-theme text-white font-semibold rounded transition-all shadow-lg active:scale-95"
          >
            Create Server
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateServerModal;
