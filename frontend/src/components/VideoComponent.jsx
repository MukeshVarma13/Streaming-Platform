import { useRef } from "react";
import { useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./twitch-player.css";

const VideoComponent = ({ videoURL, thumbnail, control = true }) => {
  const videoRef = useRef();
  const playerRef = useRef();

  useEffect(() => {
    playerRef.current = videojs(videoRef.current, {
      controls: control,
      autoplay: control ? true : "muted",
      preload: "auto",
      responsive: true,
      fluid: true,
      playbackRates: [0.5, 1, 1.5, 2],
      poster: thumbnail,
      bigPlayButton: false,
      loop: true,
      sources: [
        {
          src: videoURL,
          type: "application/x-mpegURL",
        },
      ],
    });
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [videoURL]);

  return (
    <div data-vjs-player className="aspect-video">
      <video
        ref={videoRef}
        className="video-js vjs-default-skin vjs-twitch-style aspect-video"
      />
    </div>
  );
};

export default VideoComponent;
