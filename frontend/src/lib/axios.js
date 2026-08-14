import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const aToken = localStorage.getItem("aToken");

        if (aToken) {
            config.headers.Authorization = `Bearer ${aToken}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);


// Response Interceptor
api.interceptors.response.use(
    (response) => response,

    (error) => {
        const status = error.response?.status;

        // Network / server unreachable
        if (!error.response) {
            if (error.code === "ECONNABORTED") {
                console.log("Request timed out");
            } else {
                console.log("Network error / server unreachable");
            }

            return Promise.reject(error);
        }

        // HTTP errors
        switch (status) {
            case 401:
                console.log("Unauthorized");
                // logout / refresh token later
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