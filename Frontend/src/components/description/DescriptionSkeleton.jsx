const DescriptionSkeleton = () => {
  return (
    <div className="w-full h-full animate-pulse">
      <div className="w-44 h-6 bg-white/10 text-xl rounded mb-1.5"></div>
      <div className="w-full bg-white/10 rounded-sm flex justify-between px-4 flex-wrap">
        <div className="h-52 w-20"></div>
      </div>
    </div>
  );
};

export default DescriptionSkeleton;
