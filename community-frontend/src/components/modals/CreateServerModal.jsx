import React from "react";

const CreateServerModal = ({
  showCreateServerModal,
  setShowCreateServerModal,
  serverNameInput,
  setServerNameInput,
  selectedTemplate,
  setSelectedTemplate,
  createServer,
}) => {
  if (!showCreateServerModal) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="modal-anim bg-[#36393e] w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-2xl font-bold text-center text-white">Create Your Server</h2>
          <p className="text-[#b9bbbe] text-center mt-2 text-sm">
            Choose a template or start from scratch
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {/* Gaming Template */}
            <div
              onClick={() => setSelectedTemplate("gaming")}
              className={`p-4 rounded-xl border-2 flex flex-col items-center cursor-pointer transition-all ${
                selectedTemplate === "gaming" 
                  ? "border-[#5865f2] bg-[#40444b]" 
                  : "border-transparent bg-[#2f3136] hover:border-[#5865f2]"
              }`}
            >
              <div className="text-5xl mb-3">🎮</div>
              <div className="font-semibold text-white">Gaming</div>
            </div>

            {/* Chilling Template */}
            <div
              onClick={() => setSelectedTemplate("chilling")}
              className={`p-4 rounded-xl border-2 flex flex-col items-center cursor-pointer transition-all ${
                selectedTemplate === "chilling" 
                  ? "border-[#3ba55c] bg-[#40444b]" 
                  : "border-transparent bg-[#2f3136] hover:border-[#3ba55c]"
              }`}
            >
              <div className="text-5xl mb-3">🌿</div>
              <div className="font-semibold text-white">Chilling</div>
            </div>

            {/* Podcast Template */}
            <div
              onClick={() => setSelectedTemplate("podcast")}
              className={`p-4 rounded-xl border-2 flex flex-col items-center cursor-pointer transition-all ${
                selectedTemplate === "podcast" 
                  ? "border-[#faa61a] bg-[#40444b]" 
                  : "border-transparent bg-[#2f3136] hover:border-[#faa61a]"
              }`}
            >
              <div className="text-5xl mb-3">🎙️</div>
              <div className="font-semibold text-white">Podcast</div>
            </div>

            {/* Study Template */}
            <div
              onClick={() => setSelectedTemplate("study")}
              className={`p-4 rounded-xl border-2 flex flex-col items-center cursor-pointer transition-all ${
                selectedTemplate === "study" 
                  ? "border-[#7289da] bg-[#40444b]" 
                  : "border-transparent bg-[#2f3136] hover:border-[#7289da]"
              }`}
            >
              <div className="text-5xl mb-3">📚</div>
              <div className="font-semibold text-white">Study</div>
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

        <div className="bg-[#2f3136] px-6 py-4 flex justify-end gap-4 border-t border-[#202225]">
          <button
            onClick={() => setShowCreateServerModal(false)}
            className="px-4 py-2 text-white font-medium hover:underline transition-all"
          >
            Cancel
          </button>
          <button
            onClick={createServer}
            className="px-6 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white font-semibold rounded transition-all shadow-lg active:scale-95"
          >
            Create Server
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateServerModal;