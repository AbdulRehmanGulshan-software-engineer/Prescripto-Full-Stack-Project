import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Axios interceptors are special functions that let you run custom code or make changes to your HTTP requests and responses globally, before a request is sent to the server or after a response arrives back at your app.
api.interceptors.request.use(
    (config) => {
        const aToken = localStorage.getItem("aToken")

        if (aToken) {
            config.headers.aToken = aToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;