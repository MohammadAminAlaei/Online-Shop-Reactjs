let storage = JSON.parse(localStorage.getItem('orders'));
storage === null ? storage = [] : storage = JSON.parse(localStorage.getItem('orders'));

let initialState = storage.length;

const OrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ORDERS_INCREMENT':
            return state + 1;
        case 'ORDERS_DECREMENT':
            return state - 1;
        case 'ORDERS_ZERO':
            return state = 0;
        default:
            return state;
    }
};

export {OrdersReducer};