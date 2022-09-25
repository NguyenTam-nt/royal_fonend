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

    const token = JSON.parse(localStorage.getItem("accessToken"));
    resolve(token);

    clearTimeout(timeout);
  });
};

const getRefreshToken = () => {
  return JSON.parse(localStorage.getItem("refreshToken"));
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
  async (response) => {
    const config = response.config;
    if (
      config.url.indexOf("/users/login-user") >= 0 ||
      config.url.indexOf("/add-user") >= 0
    ) {
      return response;
    }

    const { status, msg } = response.data;

    if (status && status === 401) {
      if (msg && msg === "jwt expired") {
        const { accessToken } = await refreshToken();
        console.log("refresh Token");
        const tk = "Bearer " + accessToken;
        config.headers.Authorization = tk;
        sessionStorage.setItem("accessToken", JSON.stringify(tk));
        return axiosClient(config);
      }
    }

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  return (
    await axiosClient.post("/users/refresh-token", {
      refreshToken: await getRefreshToken(),
    })
  ).data;
};
export default axiosClient;
