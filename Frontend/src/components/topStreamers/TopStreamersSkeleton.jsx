const TopStreamersSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0 cursor-pointer">
      <div className="p-1 border-white/10 border-2 rounded-full">
        <div className="h-20 w-20 rounded-full bg-white/10"></div>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <span className="bg-white/10 h-5 w-28 rounded"></span>
        <h2 className="bg-white/10 h-5 w-16 rounded"></h2>
      </div>
    </div>
  );
};

export default TopStreamersSkeleton;
