import axios from "axios";

export const baseURL = "http://localhost:8080";
export const streamURL = "http://localhost:8000";

export const http = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Attach JWT token automatically
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
    return config;
  } else {
    window.location.href = "/auth";
  }
});

export const axiosLive = axios.create({
  streamURL: streamURL,
});
