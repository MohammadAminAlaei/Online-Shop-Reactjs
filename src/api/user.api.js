import {LOGIN, REFRESH_TOKEN, WHOAMI} from 'configs/url.config';
import http from 'services/http.service';

export async function login(data) {
    try {
        const response = await http.post(LOGIN, data);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function refreshToken() {
    try {
        const response = await http.post(REFRESH_TOKEN);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function whoami() {
    try {
        const response = await http.get(WHOAMI);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}