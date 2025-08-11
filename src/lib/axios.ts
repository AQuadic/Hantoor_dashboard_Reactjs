import Axios from "axios";
import Cookies from "js-cookie";

// Type fallback for AxiosRequestConfig

// TODO: Add proper AxiosRequestConfig type if available in your axios version
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function authRequestInterceptor(config: any) {
  const token = Cookies.get("hantoor_token");
  const language =
    typeof window !== "undefined"
      ? localStorage.getItem("language") || "en"
      : "en";
  config.headers["Accept-Language"] = language;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  config.headers["Accept"] = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: "https://api.hantoor.co/api",
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response) => {
    // Save session ID from header if it exists (for guest users)
    if (response.headers["x-session-id"]) {
      if (typeof window !== "undefined") {
        localStorage.setItem("session_id", response.headers["x-session-id"]);
      }
    }
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      typeof window !== "undefined" &&
      !window.location.href.includes("login")
    ) {
      Cookies.remove("hantoor_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
