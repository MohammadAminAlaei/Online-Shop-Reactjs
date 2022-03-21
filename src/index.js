import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {ToastContainer, toast} from 'react-toastify';
import './assets/styles/default.style.scss';
import {AppRoute} from './routes/App.route';
import {Provider} from 'react-redux';
import store from './redux/store';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App>
                <AppRoute/>
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </App>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
