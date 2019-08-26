import { Api } from '../services/Api';

export const User = {
    getUser
};

async function getUser() {
    return await fetch('http://localhost/api/user', Api.getOptions('GET'))
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log('Error, could not get user', error);
        });
}