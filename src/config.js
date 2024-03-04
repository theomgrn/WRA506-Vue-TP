// config.js

import axios from "axios";

let baseURL = 'http://localhost:8888/WRA506-Symfony/public/index.php/api/';
let baseURLimg = 'http://localhost:8888/WRA506-Symfony/public/uploads/';

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

export { baseURL, baseURLimg, axiosConfig };