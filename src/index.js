import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import './assets/styles/default.module.scss';
import {AppRoute} from './routes/App.route';

ReactDOM.render(
    <React.StrictMode>
        <App>
            <AppRoute/>
        </App>
    </React.StrictMode>,
    document.getElementById('root')
);
