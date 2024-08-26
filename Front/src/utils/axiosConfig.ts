import axios from "axios";

// הגדרת ה-baseURL אם יש צורך
axios.defaults.baseURL = "http://localhost:4000";

// הוספת ה-interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token found:", token);

      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// אופציונלי: הוספת interceptor לתגובות
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // טיפול בשגיאת אימות, למשל ניתוב לדף התחברות
      console.log("Authentication error");
      // הוסף כאן לוגיקה נוספת אם נדרש
    }
    return Promise.reject(error);
  }
);

export default axios;
