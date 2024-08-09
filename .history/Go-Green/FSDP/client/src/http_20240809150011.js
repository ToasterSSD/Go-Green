import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
    // Attach the access token to every request if it exists
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    
    // Clean up the request data if necessary
    if (config.data && config.data.user) {
        delete config.data.user;
    }
    
    // Set the 'Content-Type' header for multipart/form-data when a FormData object is being sent
    if (config.data && config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    
    return config;
}, (error) => {
    // Handle request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
    // Handle successful responses (2xx status codes)
    return response;
}, (error) => {
    // Handle error responses
    if (error.response.status === 401 || error.response.status === 403) {
        localStorage.clear();  // Clear any stored credentials
        window.location = "/login";  // Redirect to login page
    }
    return Promise.reject(error);
});

export default instance;
