import {getProducts} from 'api/product.api';
import {FILTERS} from 'configs/url.config';

export const getProduc = (data) => ({type: 'PRODUCTS_SET_PRODUCT', payload: data});

export const getProduct = () => {
    return (dispatch, getState) => {
        return getProducts()
            .then(response => {
                dispatch(getProduc(response));
                return response;
            })
            .catch(error => {
                console.log('get Product error: 2', error);
                // throw new Error('error')
                return Promise.reject(error);
            });
    }
};

export const getMobile = (data) => ({type: 'PRODUCTS_GET_MOBILES', payload: data});

export const getMobiles = () => {
    return (dispatch, getState) => {
        return getProducts(FILTERS.MOBILES)
            .then(response => {

                dispatch(getMobile(response));
                return response;
            })
            .catch(error => {
                console.log('get Product error: 2', error);
                // throw new Error('error')
                return Promise.reject(error);
            });
    }
};

export const getLaptop = (data) => ({type: 'PRODUCTS_GET_LAPTOP', payload: data});

export const getLaptopes = () => {
    return (dispatch, getState) => {
        return getProducts(FILTERS.LAPTOPS)
            .then(response => {

                dispatch(getLaptop(response));
                return response;
            })
            .catch(error => {
                console.log('get Product error: 2', error);
                // throw new Error('error')
                return Promise.reject(error);
            });
    }
};

export const getComputer = (data) => ({type: 'PRODUCTS_GET_COMPUTERS', payload: data});

export const getComputers = () => {
    return (dispatch, getState) => {
        return getProducts(FILTERS.COMPUTERS)
            .then(response => {

                dispatch(getComputer(response));
                return response;
            })
            .catch(error => {
                console.log('get Product error: 2', error);
                // throw new Error('error')
                return Promise.reject(error);
            });
    }
};

export const getHeadPhone = (data) => ({type: 'PRODUCTS_GET_HEAD_PHONES', payload: data});

export const getHeadPhones = () => {
    return (dispatch, getState) => {
        return getProducts(FILTERS.HEADPHONES)
            .then(response => {

                dispatch(getHeadPhone(response));
                return response;
            })
            .catch(error => {
                console.log('get Product error: 2', error);
                // throw new Error('error')
                return Promise.reject(error);
            });
    }
};

