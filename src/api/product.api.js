import http from 'services/http.service';
import {PRODUCTS} from 'configs/url.config';
import axios from 'axios';


// export function getSlider() {
//   return new Promise((resolve, reject) => {
//     axios.get('/slider')
//       .then(response => resolve(response))
//       .catch(error => reject(error))
//   });
// }

// export async function getProducts() {
//     try {
//         const response = await http.get(`${PRODUCTS}`);
//         return response.data;
//     } catch (e) {
//         return Promise.reject(e);
//     }
// }
//
// export async function deleteProduct(id) {
//     try {
//         const response = await http.delete(`${PRODUCTS}/${id}`);
//         return response.data;
//     } catch (e) {
//         return e;
//     }
// }
//
// export async function getProduct(id) {
//     try {
//         const response = await http.get(`${PRODUCTS}/${id}`);
//         return response.data;
//     } catch (e) {
//         return e;
//     }
// }
//
// export async function changeProduct(id, data) {
//     try {
//         const response = await http.post(`${PRODUCTS}/${id}`, data);
//         return response.data;
//     } catch (e) {
//         return Promise.reject(e);
//     }
// }

export async function getProducts() {
    try {
        const response = await axios.get(`${PRODUCTS}`);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function deleteProduct(id) {
    try {
        const response = await axios.delete(`${PRODUCTS}/${id}`);
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function getProduct(id) {
    try {
        const response = await axios.get(`${PRODUCTS}/${id}`);
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function changeProduct(id, data) {
    try {
        const response = await axios.post(`${PRODUCTS}/${id}`, data);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

