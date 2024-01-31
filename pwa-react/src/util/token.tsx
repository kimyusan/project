import axios from "axios";
import useAuthStore from "../stores/AuthStore";

export const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const token = useAuthStore.getState().token;
const PATH = useAuthStore.getState().PATH;

export const axiosAuth = axios.create({
  baseURL: `${PATH}`,
});

export const setClientHeaders = (authToken: string) => {
  axiosAuth.interceptors.request.use((config) => {
    config.headers["Authorization"] = authToken;
    return config;
  });
};

axiosAuth.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 403) {
      console.log("토큰없음");

      error.config.headers = {
        Authorization: token,
      };

      // const response = await axiosAuth.request(error.config);
      // return response;
    } else {
      return error;
    }
  }
);
