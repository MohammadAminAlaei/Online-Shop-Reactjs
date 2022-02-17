import http from 'services/http.service';
import {PRODUCTS} from 'configs/url.config';


export async function getProducts(URL = '') {
    try {
        const response = await http.get(`${PRODUCTS}${URL}`);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function deleteProduct(id) {
    try {
        const response = await http.delete(`${PRODUCTS}/${id}`);
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function getProduct(id) {
    try {
        const response = await http.get(`${PRODUCTS}/${id}`);
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function changeProduct(id, data) {
    try {
        const response = await http.post(`${PRODUCTS}/${id}`, data);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}


