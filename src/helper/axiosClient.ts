import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    accept: "aplication.json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (respons) => {
    if (respons && respons.data) {
      return respons.data;
    }
    return respons;
  },
  (error) => {
    console.error(error);
  }
);

export default axiosClient;