import React, { useContext } from 'react';
import useForm from "./Utils/useForm";
import { AuthContext } from '../context/AuthContext';

const LoginForm = (props) => {
    const context = useContext(AuthContext);
    const { values, handleChange, handleSubmit } = useForm(login);

    function login() {
        context.login(values);
    }

    if (context.isAuthenticated) {
        props.history.push('/list');
    }
    
    return (
        <div>
            <div className="row justify-content-center mb-2">
                <div className="col-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={values.email || ''}
                                onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={values.password || ''}
                                onChange={handleChange} />
                        </div>
                        <div className="text-right">
                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;