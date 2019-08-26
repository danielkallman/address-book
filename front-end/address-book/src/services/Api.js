import { Authentication } from '../services/Authentication';

export const Api = {
    getOptions
};

function getOptions(method, values = null, token = null) {
    const headers = getHeaders(token);
    let options = null;

    if (values === null) {
        options = {
            method: method,
            headers: headers
        };
    
    } else {
        options = {
            method: method,
            headers: headers,
            body: JSON.stringify(values)
        };
    }
    return options;
}

function getHeaders(token)
{
    let headers = null;
    if (getToken(token) === null) {
        headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    } else {
        headers = new Headers({
            'Authorization': 'Bearer' + getToken(token),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    }
    return headers;
}

function getToken(token) {
    if (token === null)  {
        token = Authentication.getAccessToken();
    }
    return token;
}