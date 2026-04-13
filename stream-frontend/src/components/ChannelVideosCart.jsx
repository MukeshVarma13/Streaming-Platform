import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router"; // ← Fixed: Missing import
import EditVideoDropdown from "./EditVideoDropdown";
import { MoreHorizontal } from "lucide-react";
import { baseURL } from "../api/axios";

const ChannelVideosCart = ({ videos, owner }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-full w-full">
      <div
        className="aspect-video rounded-xl overflow-hidden cursor-pointer"
        onClick={() => navigate(`/stream/${videos.id}`)}
      >
        <img
          src={
            videos.thumbnail.startsWith("http")
              ? videos.thumbnail
              : baseURL + videos.thumbnail
          }
          alt={videos.title}
          className="h-full w-full object-cover bg-[#292b2f]"
        />
      </div>
      <div className="py-3 flex flex-col pl-1">
        <p
          className="text-xl font-medium line-clamp-2 cursor-pointer"
          onClick={() => navigate(`/stream/${videos.id}`)}
        >
          {videos.title}
        </p>

        <div className="flex justify-between items-start mt-3">
          <div className="flex gap-2 items-center flex-wrap text-sm">
            <h2
              className="text-grade capitalize cursor-pointer"
              onClick={() => navigate(`/directory/${videos.categories}`)}
            >
              {videos.categories}
            </h2>
            {videos.tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-[#29292E] hover:bg-[#36393e] rounded-2xl px-3 py-1 text-xs cursor-pointer transition-colors"
                onClick={() => navigate(`/directory/tag/${tag}`)}
              >
                {tag}
              </span>
            ))}
          </div>

          {owner && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(!isOpen);
                }}
                className="p-2 hover:bg-[#36393e] rounded-2xl transition-all text-gray-400 hover:text-white"
              >
                <MoreHorizontal className="w-6 h-6" />
              </button>
              {isOpen && (
                <EditVideoDropdown
                  video={videos}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  dropdownRef={dropdownRef}
                  onEdit={() => {
                    alert(`Editing video: ${videos.title}`);
                  }}
                  onDelete={() => {
                    if (confirm(`Delete "${videos.title}"?`)) {
                      alert("Video deleted (demo)");
                    }
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelVideosCart;
