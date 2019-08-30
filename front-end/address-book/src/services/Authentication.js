import { Api } from '../services/Api';

export const Authentication = {
    login,
    logout,
    refresh,
    isAuthenticated,
    getAccessToken
};

async function login(values, callback) {
    return await fetch('http://address-book.local/api/auth/login', Api.getOptions('POST', values))
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            return data;
        })
        .catch(error => {
            console.log('Error', error);
        });
}

async function refresh() {
    if (localStorage.getItem('token') !== null) {
        return await fetch('http://address-book.local/api/auth/refresh', Api.getOptions('GET'))
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('token', data.token);
                return data;
            })
            .catch(error => {
                console.log('Error', error);
            });
    }
}

function logout()
{
    localStorage.removeItem('token', null);
}

function isAuthenticated() {
    if (localStorage.getItem('token') !== null) {
        return true;
    }
    return false;
}

function getAccessToken() {
    return localStorage.getItem('token');
}
