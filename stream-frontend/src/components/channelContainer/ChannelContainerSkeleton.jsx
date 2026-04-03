const ChannelContainerSkeleton = () => {
  return (
    <div className="flex md:justify-between md:flex-row flex-col md:gap-0 gap-4 animate-pulse">
      {/* LEFT SIDE */}
      <div className="flex gap-2.5 items-end">
        {/* Avatar */}
        <div className="h-20 w-20 rounded-full bg-white/10" />

        <div className="flex flex-col gap-2">
          {/* Username */}
          <div className="h-7 w-40 bg-white/10 rounded" />

          {/* Stream title */}
          <div className="h-5 w-60 bg-white/10 rounded" />

          {/* Tags */}
          <div className="flex gap-2 mt-1">
            {[...Array(3)].map((item, key) => {
              return (
                <div key={key} className="h-5 w-16 bg-white/10 rounded-full" />
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-end gap-2">
        {/* Like + Follow */}
        <div className="flex gap-2">
          {[...Array(2)].map((item, key) => {
            return (
              <div key={key} className="h-8 w-24 bg-white/10 rounded-full" />
            );
          })}
        </div>

        {/* Viewers + icons */}
        <div className="flex gap-3 items-center">
          <div className="h-8 w-14 bg-white/10 rounded-full" />
          <div className="h-8 w-8 bg-white/10 rounded-full" />
          <div className="h-8 w-8 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ChannelContainerSkeleton;
