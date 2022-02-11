import http from 'services/http.service';
import {CUSTOMERS} from 'configs/url.config';

// export function getSlider() {
//   return new Promise((resolve, reject) => {
//     axios.get('/slider')
//       .then(response => resolve(response))
//       .catch(error => reject(error))
//   });
// }

export async function getCustomers() {
    try {
        const response = await http.get(`${CUSTOMERS}`);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function deleteCustomer(id) {
    try {
        const response = await http.delete(`/${CUSTOMERS}/${id}`);
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function getCustomer(id) {
    try {
        const response = await http.get(`/${CUSTOMERS}/${id}`);
        return response.data;
    } catch (e) {
        return e;
    }
}

