import React, { useEffect, useState } from 'react';
import useForm from "./Utils/useForm";
import { Api } from '../services/Api';

const Edit = (props) => {
    const { values, file, handleChange, handleSubmit } = useForm(post);
    const [isValid, setValid] = useState(false);
    const [initValues, setInitValues] = useState(false);

    const [imageSrc, setImageSrc] = useState('');

    function post() {
        setValid(true);
    }

    const getItem = () => {
        fetch('http://address-book.local/api/addressbook/' + props.match.params.id, Api.getOptions())
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(json => {
                setInitValues(json);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const updateItem = () => {
        if (file !== null) {
            setImageSrc(file);
        }

        if (isValid) {
            if (file !== null) {
                values.pathToImage = file;
            }
            
            const id = props.match.params.id;
            fetch('http://address-book.local/api/addressbook/' + id, Api.getOptions('PUT', values))
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error(response.status);
                    }
                    props.history.push('/list');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        if (!initValues) {
            getItem();
        }
        updateItem();
    });


    if (!initValues) {
        return null;
    }
    return (
        <div className="row justify-content-center mb-2">
            <div className="col-6">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Namn</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={values.name || initValues.name}
                            onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>E-post</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={values.email || initValues.email}
                            onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Personnummer</label>
                        <input
                            type="socialId"
                            name="socialId"
                            className="form-control"
                            value={values.socialId || initValues.socialId}
                            onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <img alt="" src={imageSrc || initValues.pathToImage} />
                        <input
                            type="file"
                            name="pathToImage"
                            className="form-control-file"
                            value={values.pathToImage || imageSrc}
                            onChange={handleChange} />
                    </div>
                    <div className="text-right">
                        <button type="submit" className="btn btn-primary">Spara</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;