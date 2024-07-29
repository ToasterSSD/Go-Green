import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

// Add a request interceptor to set the 'Content-Type' header for multipart/form-data when a FormData object is being sent
instance.interceptors.request.use((config) => {
    if (config.data && config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance;


