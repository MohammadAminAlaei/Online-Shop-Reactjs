import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {ProductsReducer, OrdersReducer} from './reducers';


const reducers = combineReducers({
    products: ProductsReducer,
    ordersLength: OrdersReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;