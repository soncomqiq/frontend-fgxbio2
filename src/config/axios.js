import axios from 'axios';
import { API_BASE_URL } from "./constants"
import localStorageService from '../services/LocalStorageService';
import { notification } from 'antd';

axios.defaults.baseURL = API_BASE_URL;

axios.interceptors.request.use(
    config => {
        if (config.url.includes("/signup") || config.url.includes("/signin")) return config;

        const token = localStorageService.getToken();

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    err => {
        Promise.reject(err);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        if (err.response?.status === 401) {
            localStorageService.removeToken();
            window.location.reload();
            notification.error({
                message: "กรุณาเข้าสู่ระบบใหม่"
            });
            return Promise.reject(err);
        }

        return Promise.reject(err);
    }
);

export default axios;