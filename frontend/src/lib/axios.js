import axios from "axios";

const api = axios.create({
    // Backend URL
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});



// Request Interceptor
// Automatically Adds Token
api.interceptors.request.use(

    //on success
    (config) => {
        // Future

        // const token=localStorage.getItem("token");
        // if(token){
        // config.headers.Authorization=`Bearer ${token}`
        // }

        return config;
    },

    // on error
    (error) => Promise.reject(error)
);




// Response Interceptor
// Response Interceptor
api.interceptors.response.use(
    //on success
    (response) => response,

    //on error
    (error) => {

        // Future
        // 401
        // Refresh Token
        // Logout User

        return Promise.reject(error);
    }
);

export default api;