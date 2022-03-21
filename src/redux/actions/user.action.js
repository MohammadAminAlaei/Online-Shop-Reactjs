import * as api from 'api/user.api';
import {ACCESS_TOKEN, REFRESH_TOKEN, IS_LOGGED_IN} from 'configs/variables.config';

export const login = (data) => {
    return (dispatch, getState) => {
        return api.login(data)
            .then(response => {
                console.log('login response: 2', response);
                localStorage.setItem(ACCESS_TOKEN, response.token);
                localStorage.setItem(REFRESH_TOKEN, response.token);
                localStorage.setItem(IS_LOGGED_IN, true.toString());
                return response;
            })
            .catch(error => {
                console.log('login error: 2', error);
                // throw new Error('error')
                return Promise.reject(error);
            });
    }
};

export const refreshToken = () => {
    return () => {
        return api.refreshToken()
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.token);
                localStorage.setItem(REFRESH_TOKEN, response.token);
                localStorage.setItem(IS_LOGGED_IN, true.toString());
                return response;
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
};

export const whoami = () => {
    return (dispatch, getState) => {
        return api.whoami()
            .then(response => {
                // console.log('whoami response: 2', response);
                localStorage.setItem(IS_LOGGED_IN, true.toString());
                return response;
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
};