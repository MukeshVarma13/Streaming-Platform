import { axios } from "../config/AxiosHelper";
import { axiosLive } from "../config/AxiosHelper";

const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjUsInN1YiI6ImtpcmFAZ21haWwuY29tIiwiaXNzIjoiTVZSIiwiaWF0IjoxNzU1NzA4Mzk0LCJleHAiOjE3NTY3ODgzOTR9.SJ_YMGHqOXKQ0esVYRLdWzvGS-dRNJ8XS2DqXVj9Rgw";

// const token =
//   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInN1YiI6Im1pc2ZpdEBnbWFpbC5jb20iLCJpc3MiOiJNVlIiLCJpYXQiOjE3NTU4ODY3MjMsImV4cCI6MTc1Njk2NjcyM30.WjsDkF7zxdfLQC8DJaL7dKo7THlgUbtBnGe2qrp88go";

localStorage.setItem("token", token); // remove and implement login

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
  const response = await axios.get(`/api/v1/videos/${streamId}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const GetMessages = async (streamId) => {
  const response = await axios.get(`/api/v1/videos/${streamId}/messages`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const addLike = async (streamId, like) => {
  const response = await axios.post(
    `/api/v1/videos/like/${streamId}?like=${like}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

export const follow = async (streamerId, follow) => {
  const response = await axios.post(
    `/api/v1/videos/follow/${streamerId}?follow=${follow}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

export const GetLoggedUser = async () => {
  const response = await axios.get(`/api/v1/videos/me`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
