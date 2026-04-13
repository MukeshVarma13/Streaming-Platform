
import {
  Edit2,
  Trash2,
  EyeOff,
  ListPlus,
  Download,
} from "lucide-react";

const EditVideoDropdown = ({
  video,
  onEdit,
  onDelete,
  isOpen,
  setIsOpen,
  dropdownRef,
}) => {
  if (!isOpen) return null;

  const handleOptionClick = (callback) => {
    callback?.();
    setIsOpen(false);
  };

  return (
    <div className="absolute right-0 top-12 w-64 bg-[#292b2f] border border-[#36393e] rounded-3xl shadow-2xl py-2 z-50 overflow-hidden">
      <div className="px-2">
        <button
          onClick={() => handleOptionClick(onEdit)}
          className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-[#36393e] rounded-2xl transition-all text-white"
        >
          <Edit2 className="w-5 h-5" />
          <span className="font-medium">Edit Video Details</span>
        </button>

        <button
          onClick={() => {
            alert("Change Thumbnail feature coming soon");
            setIsOpen(false);
          }}
          className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-[#36393e] rounded-2xl transition-all text-white"
        >
          <Download className="w-5 h-5" />
          <span className="font-medium">Change Thumbnail</span>
        </button>

        <button
          onClick={() => {
            alert("Video visibility updated to Private");
            setIsOpen(false);
          }}
          className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-[#36393e] rounded-2xl transition-all text-white"
        >
          <EyeOff className="w-5 h-5" />
          <span className="font-medium">Make Private</span>
        </button>

        <button
          onClick={() => {
            alert("Added to playlist");
            setIsOpen(false);
          }}
          className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-[#36393e] rounded-2xl transition-all text-white"
        >
          <ListPlus className="w-5 h-5" />
          <span className="font-medium">Add to Playlist</span>
        </button>

        <div className="h-px bg-[#36393e] my-2 mx-3" />

        <button
          onClick={() => handleOptionClick(onDelete)}
          className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-red-500/10 text-red-400 rounded-2xl transition-all font-medium"
        >
          <Trash2 className="w-5 h-5" />
          <span>Delete Video</span>
        </button>
      </div>
    </div>
  );
};

export default EditVideoDropdown;