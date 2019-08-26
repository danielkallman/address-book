import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginForm from './LoginForm.js';
import List from './List.js';
import Add from './Add.js';
import Edit from './Edit';
import Delete from './Delete';
import { AuthContext } from '../context/AuthContext';

const Routing = () => {
    const context = useContext(AuthContext);

    const ProtectedAdminRoute = ({ component: Component, ...rest }) => (
        <Route
            render={props =>
                context.isAuthenticated && context.user.role === 2 ? <Component {...props} /> : <Redirect to="/" />
            }
            {...rest}
        />
    )

    const ProtectedRoute = ({ component: Component, ...rest }) => (
        <Route
            render={props =>
                context.isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
            }
            {...rest}
        />
    )

    return (
        <Router>
            <div className="container justify-content-center">
                <nav className="navbar navbar-expand-lg navbar-dark bg-light static-top">
                    <div>
                        <h1>Address book</h1>
                    </div>
                </nav>
                <Route exact path="/" render={props => <LoginForm {...props} />} />
                <ProtectedRoute path="/list" component={List} />
                <ProtectedRoute path="/add" component={Add} />
                <ProtectedAdminRoute path="/edit/:id" component={Edit} />
                <ProtectedAdminRoute path="/delete/:id" component={Delete} />
            </div>
        </Router>
    )
}

export default Routing;
