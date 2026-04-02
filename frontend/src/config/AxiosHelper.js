import axio from "axios";
export const baseURL = "http://localhost:8080";
export const streamURL = "http://localhost:8000";
export const axios = axio.create({
  baseURL: baseURL,
});
export const axiosLive = axio.create({
  streamURL: streamURL,
});
