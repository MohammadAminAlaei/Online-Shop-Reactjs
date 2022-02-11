import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {ProductsReducer} from './reducers/products.reducer';


const reducers = combineReducers({
    products: ProductsReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;