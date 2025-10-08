import { axios } from "../config/AxiosHelper";
import { axiosLive } from "../config/AxiosHelper";

// const token =
//   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjUsInN1YiI6ImtpcmFAZ21haWwuY29tIiwiaXNzIjoiTVZSIiwiaWF0IjoxNzU1NzA4Mzk0LCJleHAiOjE3NTY3ODgzOTR9.SJ_YMGHqOXKQ0esVYRLdWzvGS-dRNJ8XS2DqXVj9Rgw";

// const token =
//   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInN1YiI6Im1pc2ZpdEBnbWFpbC5jb20iLCJpc3MiOiJNVlIiLCJpYXQiOjE3NTU4ODY3MjMsImV4cCI6MTc1Njk2NjcyM30.WjsDkF7zxdfLQC8DJaL7dKo7THlgUbtBnGe2qrp88go";

const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjYsInN1YiI6Im11a2VzaDFAZ21haWwuY29tIiwiaXNzIjoiTVZSIiwiaWF0IjoxNzU3MzQ3NjMyLCJleHAiOjE3NTg0Mjc2MzJ9.5D6S2AM1Ocd4_qKe_It7z50k3nDp2spVqfOOuItkQ6A";

localStorage.setItem("token", token); // remove and implement login

// Get videos that are live
export const GetLiveStreamVideo = async () => {
  const response = await axios.get(`/api/v1/videos/live`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

// Get all the videos that are present in the db
export const GetStreamedVideo = async () => {
  const response = await axios.get(`/api/v1/videos`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

// Get video details like title, desc, streamer, etc
export const GetStreamDetails = async (streamId) => {
  const response = await axios.get(`/api/v1/videos/${streamId}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

// To get all the messages of that particular video
export const GetMessages = async (streamId) => {
  const response = await axios.get(`/api/v1/videos/${streamId}/messages`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

// To like the video
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

// To follow the streamer
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

// To get logged user details
export const GetLoggedUser = async () => {
  const response = await axios.get(`/api/v1/videos/me`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

// Search videos by descrption
export const searchVideoInDesc = async (term) => {
  const response = await axios.get(
    `/api/v1/videos/search-in-desc?term=${term}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

// Search videos by title
export const searchVideoInTitle = async (term) => {
  const response = await axios.get(
    `/api/v1/videos/search-in-title?term=${term}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

// Search streamer by streamer name
export const searchByUserName = async (term) => {
  const response = await axios.get(
    `api/v1/videos/search-by-user?term=${term}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

// Get streamer details for the channel page
export const getstreamerDetails = async (streamerId) => {
  const response = await axios.get(
    `api/v1/videos/streamer-detail/${streamerId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

// Get streams by category
export const getCategories = async (term) => {
  const response = await axios.get(`api/v1/videos/category?term=${term}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

// Get streams by Tag
export const getByTags = async (term) => {
  const response = await axios.get(`api/v1/videos/tag?term=${term}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
