import React, { useEffect, useState } from "react";
import { AiFillYoutube } from "react-icons/ai";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Description = ({ streamData }) => {
  const [followers, setFollowers] = useState(
    streamData.streamUserResponse.followers.length
  );

  return (
    <div className="">
      <h1 className="text-xl mb-1.5">
        About {streamData.streamUserResponse.name}
      </h1>
      <div className="w-full bg-theme rounded-sm flex justify-between px-4 flex-wrap">
        <div className="flex flex-col gap-3 py-3">
          <h3 className="text-[17px]">
            <span className="font-semibold">{followers}</span>{" "}
            <span className="opacity-80">followers</span>
          </h3>
          <p className="first-letter:capitalize">{streamData.description}</p>
        </div>
        <div className="text-[18px] pt-8 pb-4 mr-10">
          <h4 className="flex items-center gap-1">
            <FaXTwitter /> Twitter
          </h4>
          <h4 className="flex items-center gap-1">
            <AiFillYoutube /> Youtube
          </h4>
          <h4 className="flex items-center gap-1">
            <FaTiktok /> TikTok
          </h4>
          <h4 className="flex items-center gap-1">
            <FaInstagram /> Instagram
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Description;
