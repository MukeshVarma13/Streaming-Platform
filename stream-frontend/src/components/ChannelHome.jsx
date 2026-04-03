import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import "./ChannelHome.css";
import { useNavigate, useOutletContext } from "react-router";
import { baseURL } from "../api/axios";

const ChannelHome = () => {
  const { data } = useOutletContext();
  const navigate = useNavigate();
  // console.log(data);
  const latestStream = data?.pages?.[0]?.streamVideosResponse?.content;
  // console.log(latestStream);

  if (!latestStream?.length) {
    return <div className="text-gray-400 p-5">No recent streams found.</div>;
  }

  return (
    <div className="w-full h-screen">
      <h1 className="text-2xl mb-2">Recent Streams</h1>
      <div className="w-full h-full">
        <Swiper
          slidesPerView={3.7}
          spaceBetween={22}
          breakpoints={{
            0: { slidesPerView: 1.3, spaceBetween: 10 },
            480: { slidesPerView: 1.6, spaceBetween: 12 },
            640: { slidesPerView: 2.2, spaceBetween: 16 },
            1024: { slidesPerView: 3.2, spaceBetween: 20 },
            1280: { slidesPerView: 3.7, spaceBetween: 22 },
          }}
          // keyboard={{
          //   enabled: true,
          // }}
          // pagination={{
          //   clickable: true,
          // }}
          navigation={true}
          modules={[Keyboard, Pagination, Navigation]}
          className="mySwiper"
        >
          {latestStream.map((stream, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  onClick={() => navigate(`/stream/${stream.id}`)}
                  className="w-full aspect-video mb-2"
                >
                  <img
                    src={baseURL + stream.thumbnail}
                    alt=""
                    className="w-full h-full aspect-video bg-theme rounded-sm"
                  />
                </div>
                <p
                  className="pr-8 pl-1 text-xl cursor-pointer"
                  onClick={() => navigate(`/stream/${stream.id}`)}
                >
                  {stream.title}
                </p>
                <div className="flex gap-2 items-center flex-wrap text-sm pl-1">
                  <h2
                    className="text-grade capitalize cursor-pointer"
                    onClick={() => navigate(`/directory/${stream.categories}`)}
                  >
                    {stream.categories}
                  </h2>
                  {stream.tags.map((tag, index) => {
                    return (
                      <span
                        className="bg-[#29292E] rounded-2xl px-2 capitalize text-center cursor-pointer"
                        key={index}
                        onClick={() => {
                          navigate(`/directory/tag/${tag}`);
                        }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ChannelHome;
