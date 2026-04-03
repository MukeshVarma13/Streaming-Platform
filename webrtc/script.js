const videoEl = document.querySelector("#my-video");

let stream = null;
const constraints = {
  audio: true,
  video: true,
};

const getMicAndCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log(stream);
  } catch (err) {
    if (err.name === "NotAllowedError") {
      console.log("User or browser blocked permission.");
    } else if (err.name === "NotFoundError") {
      console.log("No camera/mic hardware found.");
    } else {
      console.log("Error:", err);
    }
  }
};

const showMyFeed = (e) => {
  console.log("ShowMyFeed is Working");
  videoEl.srcObject = stream;
  const tracks = stream.getTracks();
  console.log(tracks);
};

const stopMyFeed = (e) => {
  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    console.log(track);
    track.stop();
  });
};

document
  .querySelector("#share")
  .addEventListener("click", (e) => getMicAndCamera(e));
document
  .querySelector("#show-video")
  .addEventListener("click", (e) => showMyFeed(e));
document
  .querySelector("#stop-video")
  .addEventListener("click", (e) => stopMyFeed(e));
document
  .querySelector("#change-size")
  .addEventListener("click", (e) => changeVideoSize());
