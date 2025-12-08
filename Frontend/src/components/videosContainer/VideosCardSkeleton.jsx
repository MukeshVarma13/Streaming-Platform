import React from "react";

const VideosCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="aspect-video rounded">
        <div className="aspect-video w-full h-full bg-theme rounded" />
      </div>
      <div className="flex gap-2 items-center">
        <div className="w-12 h-12 rounded-full">
          <div className="w-full h-full rounded-full bg-theme" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <h2 className="h-6 w-32 bg-white/10 rounded"></h2>
            <p className="h-5 w-full bg-white/10 rounded"></p>
          </div>
          <div className="flex gap-2 items-center">
            <h2 className="bg-white/10 h-5 w-14 rounded"></h2>
            {[...Array(3)].map((tag, index) => {
              return (
                <span
                  className="bg-[#29292E] rounded-xl w-10 h-5"
                  key={index}
                ></span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosCardSkeleton;
