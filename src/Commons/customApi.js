import axios from "axios";
import { API } from "../contains/api";

const getAccessToken = async () => {
  if (sessionStorage.getItem("accessToken"))
    return JSON.parse(sessionStorage.getItem("accessToken"));

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(null);
      console.log("reject timeout");
    }, 10000);

    const token = JSON.parse(sessionStorage.getItem("accessToken"));
    resolve(token);

    clearTimeout(timeout);
  });
};

const axiosClient = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    let token;
    await getAccessToken().then((tokens) => {
      token = tokens;
    });
    if (token) {
      console.log("token đã gắn");
      config.headers.Authorization = token;
    }
    return config;
  },

  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // const res = ;
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
