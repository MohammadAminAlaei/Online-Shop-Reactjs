import {getProducts} from 'api/product.api';

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

