import axios from "axios";
import Cookies from "js-cookie";
axios.defaults.baseURL = "http://localhost:4000";

axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      console.log("Token being sent:", token.substring(0, 10) + "...");
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.log("No token found in localStorage");
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(
      `Response from ${response.config.url}:`,
      response.status,
      response.data
    );
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        `Error response from ${error.config.url}:`,
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axios;
