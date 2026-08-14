import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 5000,

  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================================
// REQUEST INTERCEPTOR
// ==========================================================

api.interceptors.request.use(
  (config) => {
    // ======================================================
    // USER AUTHENTICATION
    //
    // User JWT is stored using:
    //
    // localStorage.setItem("token", data.token)
    //
    // Admin uses a separate "aToken".
    // ======================================================

    const token = localStorage.getItem("token");

    // ======================================================
    // Attach JWT only if user is authenticated
    // ======================================================

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================================
// RESPONSE INTERCEPTOR
// ==========================================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const status = error.response?.status;

    // ======================================================
    // Network / server unreachable
    // ======================================================

    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        console.log("Request timed out");
      } else {
        console.log("Network error / server unreachable");
      }

      return Promise.reject(error);
    }

    // ======================================================
    // HTTP Errors
    // ======================================================

    switch (status) {
      case 401:
        console.log("Unauthorized");

        // FUTURE:
        //
        // User token is invalid/expired.
        //
        // localStorage.removeItem("token");
        //
        // Later you can handle logout globally.
        //

        break;

      case 403:
        console.log("Forbidden");
        break;

      case 500:
        console.log("Internal server error");
        break;

      default:
        console.log(`HTTP Error: ${status}`);
    }

    return Promise.reject(error);
  }
);

export default api;