import React, { useState, useRef } from "react";
import { Camera, X, Check, Loader2, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { completeProfile } from "../api/auth.api";
import { baseURL } from "../api/axios";

const ManageProfileModal = ({ isOpen, onClose, currentUser, onUpdate }) => {
  const [name, setName] = useState(currentUser?.name);
  const [preview, setPreview] = useState(currentUser?.profilePic);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [imageChange, setImageChange] = useState(false);

  //   console.log(currentUser);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => completeProfile(formData),
    onSuccess: (data) => {
      alert("Changes may take time to appear completely");
      onClose();
    },
    onError: (err) => {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to upload profile!");
    },
  });

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageChange(true);
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", name);
    if (selectedFile) {
      formData.append("profile", selectedFile);
    }

    mutate(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-[#1A1D21] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="flex flex-col items-center justify-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#FF2164]/20 bg-[#0F1113]">
                <img
                  src={imageChange ? preview : baseURL + preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute -bottom-2 -right-2 bg-[#FF2164] p-3 rounded-2xl shadow-xl hover:scale-110 active:scale-90 transition-all text-white"
              >
                <Camera size={18} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Click icon to change photo
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#FF2164] ml-1">
              Display Name
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0F1113] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#FF2164] transition-colors font-medium"
                placeholder="Enter your name"
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/5 border-t border-white/5 flex gap-3">
          <button
            onClick={onClose}
            disabled={isPending}
            className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-400 hover:bg-white/5 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="flex-1 bg-[#FF2164] hover:bg-[#ff4d7f] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-[#FF2164]/20 transition-all flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProfileModal;
