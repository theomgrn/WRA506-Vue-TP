// config.js

import axios from "axios";
import {useToast} from 'vue-toast-notification';
import {resolveDirective} from "vue";

let baseURL = import.meta.env.VITE_API_URI;
let baseURLimg = import.meta.env.VITE_UPLOADS_URI;

// Fonction pour récupérer le token JWT du stockage local
const getToken = () => {
    return localStorage.getItem('userToken');
};

const axiosConfig = {
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
};

axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('userToken');
            localStorage.removeItem('userMail');
            window.location.replace('/login');
        }
        return Promise.reject(error);
    }
);


export { baseURL, baseURLimg, axiosConfig };