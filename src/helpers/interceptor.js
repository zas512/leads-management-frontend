import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://leads-management-backend.vercel.app",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) =>
    Promise.reject(error instanceof Error ? error : new Error(String(error)))
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(
      error instanceof Error ? error : new Error(String(error))
    );
  }
);

export default axiosInstance;
