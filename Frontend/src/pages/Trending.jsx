import React from "react";
import { useParams } from "react-router";
import CategoryComp from "../components/CategoryComp";

const Trending = () => {
  const { name } = useParams();
  return (
    <div className="w-full h-full flex flex-col gap-10">
      <h1 className="text-7xl capitalize">{name}</h1>
      <CategoryComp />
    </div>
  );
};

export default Trending;
