import { axios } from "../config/AxiosHelper";
import { axiosLive } from "../config/AxiosHelper";

const token = localStorage.getItem("token");

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
export const getCategories = async (term, pageParam = 0) => {
  const response = await axios.get(
    `api/v1/videos/category?term=${term}?page=${pageParam}&size=15`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
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

// To sign in
export const login = async (user) => {
  try {
    const response = await axios.post(`/login`, {
      email: user.email,
      password: user.password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Invalid email or password"
      );
    } else if (error.request) {
      throw new Error(
        "Network error. Please check your connection and try again."
      );
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export const sendOtp = async (email) => {
  const response = await axios.post(`/send-otp?email=${email}`);
  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await axios.post(`/verify-otp?email=${email}&otp=${otp}`);
  return response.data;
};

export const register = async (data) => {
  const response = await axios.post("/register", data);
  return response.data;
};

// Generate stream key
export const generateKey = async () => {
  const response = await axios.get("/api/stream-key");
  return response.data;
};

// Start the stream
export const startStream = async (formData) => {
  try {
    const response = await axios.post("/api/stream/start", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// Preview the stream and wait for OBS to connect
export const goLive = async (streamKey) => {
  const response = await axios.post(
    `/api/stream/setup?streamKey=${streamKey}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

export const streamComplete = async (streamKey) => {
  const response = await axios.post(`/api/stream/complete?name=${streamKey}`);
  return response.data;
};
