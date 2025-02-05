import axios from "axios";
import EndPoints from "../endpoints";

const BASE_URL = process.env.BACKEND_URL;

export const normalInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const accessInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

normalInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

normalInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          // console.warn("Refresh token missing, logging out.");
          handleLogout();
          return Promise.reject(error);
        }

        const response = await accessInstance.post(EndPoints.refreshTokenURL, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return normalInstance(originalRequest);
      } catch (refreshError) {
        // console.error("Failed to refresh token:", refreshError);

        if (
          refreshError.response &&
          refreshError.response.data.code === "token_not_valid"
        ) {
          // console.warn("Refresh token is invalid or expired, logging out.");
          handleLogout();
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  window.location.href = "/";
};

export const handleError = (error) => {
  const errorMessage =
    error.response?.data?.data?.detail || error.response?.data?.data?.error;

  console.error("❌ API Error ❌: ", errorMessage);
  console.log(error);


  throw error;
};
