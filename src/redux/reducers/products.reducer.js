const initialState = {
    product: []
};

const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCTS_SET_PRODUCT':

            return {...state, product: action.payload};
        default:
            return state;
    }
};

export {ProductsReducer};