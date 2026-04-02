import { http } from "./axios";

export const login = (user) => {
  return http.post(`/login`, {
    email: user.email,
    password: user.password,
  });
};

export const register = (data) => {
  return http.post("/register", data);
};

export const sendOtp = (email) => {
  return http.post(`/send-otp?email=${email}`);
};

export const verifyOtp = (email, otp) => {
  return http.post(`/verify-otp?email=${email}&otp=${otp}`);
};

// To get logged user details
export const loggedUser = () => {
  return http.get(`/api/v1/videos/me`);
};