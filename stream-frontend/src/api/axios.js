import axios from "axios";

export const baseURL = "http://localhost:8080";

export const http = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
  'ngrok-skip-browser-warning': 'true',
  'Accept': 'application/json'
}
});

// Attach JWT token automatically
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // console.log(token);
  
   if (config.url.includes("/login") || config.url.includes("/register") || config.url.includes("?email")) {
    return config;
  }
  if (token) {
    config.headers.Authorization = `${token}`;
    return config;
  } else {
    // window.location.href = "/auth";
    return Promise.reject("No token");
  }
});

