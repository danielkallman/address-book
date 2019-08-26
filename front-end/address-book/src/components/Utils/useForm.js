import { useState } from 'react';

const useForm = (callback) => {

    const [values, setValues] = useState({});
    const [file, setFile] = useState(null);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        callback();
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));

        if (event.target.files && event.target.files[0] !== null) {
            getBase64(event.target.files[0], (result) => {
                setFile(result);
            });       
        }        
    };

    const getBase64 = (file, callback) => {
        let document = "";
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };

        return document;
    }

    return {
        handleChange,
        handleSubmit,
        values,
        file,
    }
};

export default useForm;