import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { User } from '../services/User';
import { Authentication } from '../services/Authentication';

const AuthProvider = (props) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isAuthenticated, setIsAutheticated] = useState(false);
    const [user, setUser] = useState({});

    const getUser = () => {
        User.getUser()
            .then(response => {
                if (response) {
                    setUser(response);
                } else {
                    setUser({});
                }
            });
    };

    const refresh = () => {
        Authentication.refresh()
            .then(response => {
                if (response) {
                    setIsAutheticated(true);
                } else {
                    setIsAutheticated(false);
                }
                setIsMounted(true);
            });
    }

    useEffect(() => {
        getUser();
        refresh();
    }, []);

    const login = (props) => {
        Authentication.login(props)
            .then(response => {
                if (response) {
                    setIsAutheticated(true);

                } else {
                    setIsAutheticated(false);
                }
            });
    };

    if (isMounted) {
        return (
            <AuthContext.Provider
                value={{
                    isAuthenticated: isAuthenticated,
                    user: user,
                    login: login
                }}
            >
                {props.children}
            </AuthContext.Provider>
        )
    } else {
        return null;
    }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer };