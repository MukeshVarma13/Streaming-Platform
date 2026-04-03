import React, { useState, useEffect, useRef } from "react";

const Highlight = () => {
  const stories = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
      user: "Mukesh_Varma",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1579546671585-0238c82709cc",
      user: "MisFits_Live",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1557683311-eac922347aa1",
      user: "FullStack_Dev",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const STORY_DURATION = 5000; // 5 Seconds
  const INTERVAL_STEP = 50; // Update every 50ms

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < 100) {
          return oldProgress + (INTERVAL_STEP / STORY_DURATION) * 100;
        }

        // Progress reached 100, move to next
        if (currentIndex < stories.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setCurrentIndex(0); // Loop back
        }
        return 0;
      });
    }, INTERVAL_STEP);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, stories.length]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      setCurrentIndex(0);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    } else {
      setProgress(0); // Just restart current if at the beginning
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="relative w-full max-w-md h-screen sm:h-[85vh] sm:rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Progress Bar Segments */}
        <div className="absolute top-4 left-0 right-0 flex px-3 gap-1.5 z-30">
          {stories.map((_, index) => (
            <div
              key={index}
              className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-75 ease-linear"
                style={{
                  width:
                    index === currentIndex
                      ? `${progress}%`
                      : index < currentIndex
                        ? "100%"
                        : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* User Info Header */}
        <div className="absolute top-8 left-4 flex items-center gap-3 z-30">
          <div className="w-10 h-10 rounded-full p-0.5 bg-linear-to-tr from-yellow-400 to-fuchsia-600">
            <div className="w-full h-full rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-white text-xs font-bold">
              {stories[currentIndex].user[0]}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-bold drop-shadow-md">
              {stories[currentIndex].user}
            </span>
            <span className="text-white/70 text-[10px]">Sponsored</span>
          </div>
        </div>

        {/* Story Content */}
        <div className="w-full h-full flex items-center justify-center bg-zinc-900">
          <img
            key={currentIndex} // Key change triggers the CSS animation
            src={stories[currentIndex].url}
            alt="Content"
            className="w-full h-full object-cover select-none animate-in fade-in duration-300"
          />
        </div>

        {/* Navigation Overlays */}
        <div className="absolute inset-0 flex z-20">
          <div className="w-1/4 h-full cursor-pointer" onClick={handlePrev} />
          <div className="w-3/4 h-full cursor-pointer" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default Highlight;
