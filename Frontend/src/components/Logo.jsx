import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <img src="/icon.png" alt="" className="h-12" />
      <span className="text-4xl font-bold flex">
        MisFit <span className="text-xs top-0 opacity-45">IN</span>
      </span>
      {/* <div className="flex flex-col items-center font-extrabold text-3xl -space-y-3">
        <h1>LIVE</h1>
        <h1>STREAM</h1>
      </div> */}
    </div>
  );
};

export default Logo;
