import { http } from "./axios";

// Get videos that are live
export const getLiveStreams = (pageParam = 0) => {
  return http.get(`/api/v1/videos/live?page=${pageParam}&size=15`);
};

// Get all the videos that are present in the db
export const getAllStreams = (pageParam = 0) => {
  return http.get(`/api/v1/videos?page=${pageParam}&size=15`);
};

// Get video details like title, desc, streamer, etc
export const getStream = (streamId) => {
  return http.get(`/api/v1/videos/${streamId}`);
};

// To get all the messages of that particular video
export const getMessages = (streamId) => {
  return http.get(`/api/v1/videos/${streamId}/messages`);
};

// To like/unlike stream
export const likeStream = (streamId, like) => {
  return http.post(`/api/v1/videos/like/${streamId}?like=${like}`);
};

// To follow/unfollow the streamer
export const followStreamer = (streamerId, follow) => {
  return http.post(`/api/v1/videos/follow/${streamerId}?follow=${follow}`);
};

// Search videos by descrption
export const searchVideoInDesc = (term) => {
  return http.get(`/api/v1/videos/search-in-desc?term=${term}`);
};

// Search videos by title
export const searchVideoInTitle = (term) => {
  return http.get(`/api/v1/videos/search-in-title?term=${term}`);
};

// Search streamer by streamer name
export const searchByUserName = (term) => {
  return http.get(`api/v1/videos/search-by-user?term=${term}`);
};

// Get streamer details for the channel page
export const getstreamerDetails = async (streamerId, pageParam = 0) => {
  const res = await http.get(
    `api/v1/videos/streamer-detail/${streamerId}?page=${pageParam}&size=10`
  );
  return res.data;
};

// Get streams by category
export const getByCategories = (term, pageParam = 0) => {
  return http.get(
    `api/v1/videos/category?term=${term}&page=${pageParam}&size=15`
  );
};

// Get streams by Tag
export const getByTags = (term) => {
  return http.get(`api/v1/videos/tag?term=${term}`);
};

// Generate stream key
export const generateKey = () => {
  return http.get("/api/stream-key");
};

// Start the stream
export const startStream = (formData) => {
  return http.post("/api/stream/start", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Preview the stream and wait for OBS to connect
export const goLive = (streamKey) => {
  return http.post(`/api/stream/setup?streamKey=${streamKey}`);
};

export const streamStatus = (streamId) => {
  return http.get(`/api/stream/status?streamId=${streamId}`);
};
export const streamComplete = (streamKey) => {
  return http.post(`/api/stream/complete?name=${streamKey}`);
};

// Get all the top streamers
export const topStreamers = (pageParam = 0) => {
  return http.get(`/api/v1/videos/top-streamers?page=${pageParam}&size=15`);
};
