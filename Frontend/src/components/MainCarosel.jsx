import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const MainCarosel = () => {
  const example = [
    <div className="item h-[55vh] bg-red-300 flex items-center justify-center text-3xl rounded-md" data-value="1">
      1
    </div>,
    <div className="item h-[55vh] bg-red-300 flex items-center justify-center text-3xl" data-value="2">
      2
    </div>,
    <div className="item h-[55vh] bg-red-300 flex items-center justify-center text-3xl" data-value="3">
      3
    </div>,
    <div className="item h-[55vh] bg-red-300 flex items-center justify-center text-3xl" data-value="4">
      4
    </div>,
    <div className="item h-[55vh] bg-red-300 flex items-center justify-center text-3xl" data-value="5">
      5
    </div>,
  ];

  return (
    <div>
      <AliceCarousel
        animationType="slide"
        activeIndex={4}
        animationDuration={4000}
        autoPlayStrategy="all"
        disableButtonsControls
        disableDotsControls
        infinite
        items={example}
        mouseTracking
        autoPlay={2}
      />
    </div>
  );
};

export default MainCarosel;
