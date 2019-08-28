import { useEffect } from 'react';
import { Api } from '../services/Api';

const Delete = (props) => {
    useEffect(() => {
        fetch('http://address-book/api/addressbook/' + props.match.params.id, Api.getOptions('DELETE'))
            .then(response => {
                if (response.status !== 204) {
                    throw new Error(response.status);
                }
                props.history.push('/list');
            })
            .catch(error => {
                console.log(error);
            });
    });
    return null;
};

export default Delete;