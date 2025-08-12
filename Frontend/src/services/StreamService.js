import { axios } from "../config/AxiosHelper";
import { axiosLive } from "../config/AxiosHelper";

const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInN1YiI6Im1pc2ZpdEBnbWFpbC5jb20iLCJpc3MiOiJNVlIiLCJpYXQiOjE3NTQ2NDI5OTQsImV4cCI6MTc1NTAwMjk5NH0.i2VW4h7efZGQmOMuqf95zvv7iwvGBGg9yN-sGC3g850";

export const GetLiveStreamVideo = async (liveURL) => {
  const response = await axiosLive.get(liveURL);
  return response.data;
};

export const GetStreamedVideo = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const GetStreamDetails = async (streamId) => {
  const response = await axios.get(`/api/videos/${streamId}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const GetMessages = async (streamId) => {
  const response = await axios.get(`/api/videos/${streamId}/messages`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
