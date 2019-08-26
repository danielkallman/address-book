import React from 'react';
import Contact from './Contact.js';
import { Link } from "react-router-dom";

const List = () => {
    return (
        <div>
            <div className="row justify-content-center mb-2 mt-2">
                <div className="col-12 text-right">
                    <Link
                        to={'/add'}
                        className="btn btn-primary">
                        Lägg till ny kontakt
                                 </Link>
                </div>
            </div>
            <div className="row justify-content-center mb-2">
                <div className="col-12">
                    <Contact />
                </div>
            </div>
        </div>
    );
}

export default List;