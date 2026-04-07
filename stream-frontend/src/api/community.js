import { http } from "./axios";

export const getChannelChats = (channelId, pageParam = 0) => {
  return http.get(
    `/api/v1/community/${channelId}/messages?page=${pageParam}&size=30`,
  );
};

export const createCommunity = (communityDetails) => {
  return http.post("/api/v1/community/create", communityDetails, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const joinCommunity = (communityId) => {
  return http.post(`/api/v1/community/join/${communityId}`);
};

export const communityDetails = () => {
  return http.get("/api/v1/community/details");
};

export const channelDetail = (channelId) => {
  return http.get(`/api/v1/community/channel/${channelId}`);
};

export const channelMembers = (channelId) => {
  return http.get(`/api/v1/community/channel/members/${channelId}`);
};

export const createChannel = (channelDetails) => {
  return http.post("/api/v1/community/create/channel", channelDetails, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
