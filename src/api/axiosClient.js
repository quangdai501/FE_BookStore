import axios from 'axios';
const axiosClient = axios.create({
    // baseURL: process.env.REACT_APP_API_URL, //URL ROOT BACK END 
    baseURL: 'http://localhost:5000/api', //URL ROOT BACK END 
    headers: {
        "content-type": "application/json"
    },
});

axiosClient.interceptors.request.use(async (config) => {
    //handle token here
    return config;
});
axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log(error)
});

export default axiosClient;