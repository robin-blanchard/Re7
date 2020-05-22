import Axios from "axios";

const axiosInstanceNoAuth = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

const axiosInstanceAuth = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 5000,
  headers: {
    Authorization: "JWT " + localStorage.getItem("access_token"),
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstanceAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refresh_token = localStorage.getItem("refresh_token");
      console.log("Trying to refresh token...");

      return axiosInstanceAuth
        .post("auth/token/refresh/", { refresh: refresh_token })
        .then((response) => {
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);

          axiosInstanceAuth.defaults.headers["Authorization"] =
            "JWT " + response.data.access;
          originalRequest.headers["Authorization"] =
            "JWT " + response.data.access;

          return axiosInstanceAuth(originalRequest);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return Promise.reject(error);
  }
);

export { axiosInstanceNoAuth, axiosInstanceAuth };
