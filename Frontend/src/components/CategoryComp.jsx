import React from "react";

const CategoryComp = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-3">
      <div className="row-span-2 col-span-1 bg-red-400 rounded-xl relative">
        <div className="h-full">
          <img
          // src="https://i.pinimg.com/736x/d3/8f/4d/d38f4da29234e9188ed3098a83d940aa.jpg"
          alt=""
          className=""
        />
        </div>
        <div className="absolute bottom-0 p-10">
          <h1 className="text-6xl font-bold mb-4">Gaming</h1>
          <button className="mix-grade px-4 py-2 rounded-4xl text-2xl ">Chech Out</button>
        </div>
      </div>
      <div className="bg-blue-200 row-span-1 col-span-2 h-96 rounded-xl">
        category 2
      </div>
      <div className="bg-purple-200 row-span-1 col-span-1 rounded-xl">
        Category 3
      </div>
      <div className="bg-amber-200 row-span-1 col-span-1 rounded-xl">
        Category 4
      </div>
    </div>
  );
};

export default CategoryComp;
