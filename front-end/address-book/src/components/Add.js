import React, { useEffect, useState } from 'react';
import useForm from "./Utils/useForm";
import { Api } from '../services/Api';

const Add = (props) => {
    const { values, file, handleChange, handleSubmit } = useForm(post);
    const [isValid, setValid] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    function post() {
        setValid(true);
    }

    useEffect(() => {
        if (file !== null) {
            setImageSrc(file);

            if (isValid ) {
                values.pathToImage = file;
                fetch('http://address-book/api/addressbook', Api.getOptions('POST', values))
                    .then(response => {
                        if (response.status !== 201) {
                            throw new Error(response.status);
                        }
                        props.history.push('/list');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }, [file, isValid, values, props.history]);

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
                            value={values.name || ''}
                            onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>E-post</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={values.email || ''}
                            onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Personummer</label>
                        <input
                            type="socialId"
                            name="socialId"
                            className="form-control"
                            value={values.socialId || ''}
                            onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <img alt="" src={imageSrc || ''} />
                        <input
                            type="file"
                            name="pathToImage"
                            className="form-control-file"
                            value={values.pathToImage || ''}
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

export default Add;