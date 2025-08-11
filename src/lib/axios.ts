import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://api.hantoor.co/";

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding authentication token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("hantoor_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors and token refresh
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject(
        new Error("Network error occurred. Please check your connection.")
      );
    }

    const { status, data } = error.response;

    switch (status) {
      case 401:
        // Unauthorized - redirect to login
        console.warn("Unauthorized access - redirecting to login");
        Cookies.remove("hantoor_token");
        window.location.href = "/login";
        break;

      case 403:
        // Forbidden
        console.warn("Access forbidden");
        break;

      case 404:
        // Not found
        console.warn("Resource not found");
        break;

      case 422:
        // Validation error
        console.warn("Validation error:", data);
        break;

      case 429:
        // Rate limit exceeded
        console.warn("Rate limit exceeded. Please try again later.");
        break;

      case 500:
      case 502:
      case 503:
      case 504:
        // Server errors
        console.error("Server error:", status);
        break;

      default:
        console.error("Unhandled error status:", status);
    }

    return Promise.reject(error);
  }
);

// Optional: Add request/response logging in development
if (process.env.NODE_ENV === "development") {
  api.interceptors.request.use((config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      console.log(
        `✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${
          response.status
        }`
      );
      return response;
    },
    (error) => {
      if (error.response) {
        console.log(
          `❌ ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${
            error.response.status
          }`
        );
      }
      return Promise.reject(error);
    }
  );
}

export default api;
