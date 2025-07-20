import React from "react";
import Logo from "../components/Logo";
import MainCarosel from "../components/MainCarosel";

const Home = () => {
  return (
    <div className="border w-full h-screen">
      <div className="w-3/4">
        <MainCarosel />
      </div>
    </div>
  );
};

export default Home;
