import { useState } from "react";
import { baseURL } from "../../api/axios";
import Highlight from "../../pages/Highlight";

const TopStreamerCard = ({ streamer }) => {
  const profile = streamer?.profilePic
    ? baseURL + streamer?.profilePic
    : "https://i.pinimg.com/736x/ab/fa/ac/abfaacbee15ce3011247f2c6182e9a63.jpg";
  
  const [show, setShow] = useState(false);

  const toggleHighlight = () => {
    setShow(!show);
    setTimeout(() => {
      setShow(false)
    }, 5000);
  };

  return (
    <>
      {/* 1. THE HIGHLIGHT OVERLAY (Portaled-style logic) */}
      {show && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          {/* Close button - strictly above the highlight */}
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevents re-triggering showHighlight
              setShow(false);
            }}
            className="absolute top-6 right-6 text-white text-4xl z-[110] hover:text-gray-300 transition-colors"
          >
            &times;
          </button>
          
          {/* The Highlight Component Container */}
          <div className="w-full h-full max-w-md md:h-[90vh] flex items-center justify-center">
             {/* Pass setShow so the Highlight component itself can close when finished */}
             <Highlight onClose={() => setShow(false)} />
          </div>
        </div>
      )}

      {/* 2. THE BACKGROUND CARD */}
      <div
        onClick={toggleHighlight}
        className="flex flex-col items-center gap-2 shrink-0 cursor-pointer active:scale-95 transition-transform"
      >
        <div className="p-1 border-[#6641A8] border-2 rounded-full hover:border-purple-400 transition-colors">
          <img
            src={profile}
            alt={streamer?.name}
            loading="lazy"
            className="h-20 w-20 rounded-full bg-white object-cover"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-[#6641A8] uppercase tracking-wider">
            Followers: {streamer?.followers?.length || 0}
          </span>
          <h2 className="text-sm truncate w-24 text-center">
            {streamer?.name}
          </h2>
        </div>
      </div>
    </>
  );
};

export default TopStreamerCard;