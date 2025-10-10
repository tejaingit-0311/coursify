import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true //send the cookies automatically by the client.
});

axiosInstance.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("authUser");
  if (storedUser) {
    const { token } = JSON.parse(storedUser);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;