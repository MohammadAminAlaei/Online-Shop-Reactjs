import axios from 'axios';
import {PATHS} from 'configs/routes.config';
import {LOGIN} from 'configs/url.config';
import {ACCESS_TOKEN, BASE_URL, IS_LOGGED_IN} from 'configs/variables.config';
import {toast} from 'react-toastify';

class HttpService {
    constructor() {
        axios.defaults.baseURL = BASE_URL;

        axios.interceptors.request.use((config) => {
            // console.log('CONFIG: ', config);
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (config.url !== LOGIN) {
                config.headers['Authorization'] = `${token}`
            }

            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        axios.interceptors.response.use((response) => {
                // console.log('Interceptor response success', response);
                return response;
            },
            (error) => {
                console.log('Interceptor response error', error.response && (error.response.data === 'Token Expired!' || error.response.data === 'Invalid Token!'));
                if (error.response && (error.response.data === 'Token Expired!' || error.response.data === 'Invalid Token!')) {
                    localStorage.setItem(IS_LOGGED_IN, false.toString());
                    // window.location.href = 'http://localhost:3000' + PATHS.SIGN_IN;
                } else {
                    toast.error(error.response.data === 'No user with those credentials!' ? 'نام کاربری یا رمز عبور اشتباه است' : error.response.data);
                }
                return Promise.reject(error);
            })
    }

    get(url, config) {
        return axios.get(url, config);
    }

    post(url, data, config) {
        return axios.post(url, data, config);
    }

    put(url, data, config) {
        return axios.put(url, data, config);
    }

    patch(url, data, config) {
        return axios.patch(url, data, config);
    }

    delete(url, config) {
        return axios.delete(url, config);
    }
}

export default new HttpService();