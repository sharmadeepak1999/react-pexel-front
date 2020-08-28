import axios from '../../axios-pexel';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        username
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (username, email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        let authData = {
            identifier: email,
            password
        };

        let url = 'auth/local/';

        if(isSignup) {
            url = 'auth/local/register';
            authData = {
                username,
                email,
                password
            }
        }

        axios.post(url, authData)
            .then(response => {
                if(!response) {
                    dispatch(authFail());
                    return
                }
                localStorage.setItem('token', response.data.jwt);
                localStorage.setItem('username', response.data.user.username);
                dispatch(authSuccess(response.data.jwt, response.data.user.username));
            }).catch(e => {
                dispatch(authFail());
            })
    };
};


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (!token) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token, username));
        }
    };
};