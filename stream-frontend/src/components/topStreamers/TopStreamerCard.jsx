import { useState } from "react";
import { baseURL } from "../../api/axios";
import Highlight from "../../pages/Highlight";
import { User } from "lucide-react";

const TopStreamerCard = ({ streamer }) => {
  const profile = streamer?.profilePic
    ? baseURL + streamer?.profilePic
    : "https://i.pinimg.com/736x/ab/fa/ac/abfaacbee15ce3011247f2c6182e9a63.jpg";

  const [show, setShow] = useState(false);

  const toggleHighlight = () => {
    setShow(!show);
    setTimeout(() => {
      setShow(false);
    }, 5000);
  };

  return (
    <>
      {false && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShow(false);
            }}
            className="absolute top-6 right-6 text-white text-4xl z-10 hover:text-gray-300 transition-colors"
          >
            &times;
          </button>
          <div className="w-full h-full max-w-md md:h-[90vh] flex items-center justify-center">
            {/* <Highlight onClose={() => setShow(false)} /> */}
          </div>
        </div>
      )}
      <div
        onClick={toggleHighlight}
        className="flex flex-col items-center gap-2 shrink-0 cursor-pointer active:scale-95 transition-transform"
      >
        <div className="p-1 border-pink-600 border-2 rounded-full hover:border-pink-400 transition-colors">
          {streamer?.profilePic ? (
            <img
              src={baseURL + streamer?.profilePic}
              alt={streamer?.name}
              loading="lazy"
              className="h-20 w-20 rounded-full bg-white object-cover"
            />
          ) : (
            <User className="h-20 w-20 bg-theme rounded-full p-2" />
          )}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-grade uppercase tracking-wider">
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
