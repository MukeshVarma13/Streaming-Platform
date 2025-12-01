import React from "react";
import { IoSend } from "react-icons/io5";
import { LiaComments } from "react-icons/lia";

const CommentsSkeleton = () => {
  return (
    <div className="h-full bg-theme flex flex-col justify-between">
      <h1 className="w-full py-1 md:py-2 flex px-4 items-center justify-between md:text-2xl border-b-[1px] border-white/20 font-semibol">
        Stream Chat <LiaComments size={22} />
      </h1>
      <div className="w-full row-span-10 overflow-y-scroll relative no-scrollbar mt-2 h-full">
        <div className="absolute w-full flex flex-col gap-0.5 px-2 pb-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-full mb-3 animate-pulse">
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 rounded-full bg-white/10"></div>
                <div className="w-24 h-5 bg-white/10 rounded"></div>
              </div>
              <div className="ml-8 mr-2 bg-white/10 py-1 px-2 rounded-r-xl rounded-b-xl h-8 w-48"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 p-2 w-full border-t border-white/20">
        <input
          type="text"
          className="bg-theme p-3 rounded-xl text-sm outline-none border border-white/10 focus:border-indigo-500/70 transition w-full"
          placeholder="Send a message..."
        />
        <button className="px-2 md:px-4 body-theme rounded-xl hover:bg-indigo-700 transition active:scale-95">
          <IoSend size={22} />
        </button>
      </div>
    </div>
  );
};

export default CommentsSkeleton;
