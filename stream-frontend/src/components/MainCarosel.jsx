import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules"; // Include other modules if needed

import "swiper/css";
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import "swiper/css/autoplay";

const MainCarosel = () => {
  const items = [
    {
      id: 1,
      image:
        "https://i.pinimg.com/736x/9d/25/e9/9d25e9d83385e67e6b01a118511500ff.jpg",
      streamer: "Demon Rino",
      streamerProfile: "",
      title: "BLOOD OF HEROES",
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/736x/fa/07/57/fa07571d16755a34cb96328d2f73f7c1.jpg",
      streamer: "Misfit Playz",
      streamerProfile: "",
      title: "RDR2 Story Mode",
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/736x/31/62/c8/3162c8f364ecc47ee9b171fdf63ba7ea.jpg",
      streamer: "Rando Gaming",
      streamerProfile: "",
      title: "Random title",
    },
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      // pagination={{ clickable: true }}
      // navigation={true}
      loop={true}
      className="h-full rounded relative"
    >
      {items.map((item, index) => {
        return (
          <SwiperSlide>
            <div className="absolute bg-black w-full h-full opacity-50"></div>
            <img src={item.image} alt="" className="w-full h-full" />
            <div className="absolute bottom-10 left-16 flex flex-col items-start justify-center gap-2">
              <h1 className="text-5xl font-bold">{item.title}</h1>
              <div className="flex gap-4 items-center">
                <img src={item.image} alt="" className="h-8 w-8 rounded-full" />
                <h1 className="text-xl">{item.streamer}</h1>
              </div>
              <div className="py-2 px-6 mt-1 mix-grade rounded-4xl flex gap-1 items-center">
                <span className="text-sm">Watch Stream</span>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MainCarosel;
