import axios from "axios";
import { getValueFromLocalStorage } from "../helper/token";
import { saveValueInLocalStorage } from "../helper/token";
import { protectedRoutes } from "../routes/protected";

export const request = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    const token = getValueFromLocalStorage("accessToken");
    if (token) config.headers = { Authorization: `bearer ${token}` };

    // Do something before request is sent

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    return Promise.reject(error);

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
  }
);
