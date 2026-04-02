import { http } from "./axios";

// Get videos that are live
export const getLiveStreams = (pageParam = 0) => {
  return http.get(`/api/v1/search/live?page=${pageParam}&size=15`);
};

// Get all the ended streams
export const getAllStreams = (pageParam = 0) => {
  return http.get(`/api/v1/search/streams?page=${pageParam}&size=15`);
};

// Get video details like title, desc, streamer, etc
export const getStream = (streamId) => {
  return http.get(`/api/v1/search/${streamId}`);
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
  return http.get(`/api/v1/search/description?term=${term}`);
};

// Search videos by title
export const searchVideoInTitle = (term) => {
  return http.get(`/api/v1/search/title?term=${term}`);
};

// search autocomplete
export const autocomplete = (term) => {
  return http.get(`/api/v1/search/autocomplete?q=${term}`);
};

// Search streamer by streamer name
export const searchByUserName = (term) => {
  return http.get(`api/v1/search/streamer?term=${term}`);
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
    `api/v1/search/category?term=${term}&page=${pageParam}&size=15`
  );
};

// Get streams by Tag
export const getByTags = (term, pageParam = 0) => {
  return http.get(`api/v1/search/tag?term=${term}&page=${pageParam}&size=15`);
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

export const streamStatus = (streamKey) => {
  return http.get(`/api/stream/status?streamKey=${streamKey}`);
};
export const streamComplete = (streamKey) => {
  return http.post(`/api/stream/complete?name=${streamKey}`);
};

// Get all the top streamers
export const topStreamers = (pageParam = 0) => {
  return http.get(`/api/v1/search/top-streamers?page=${pageParam}&size=15`);
};
