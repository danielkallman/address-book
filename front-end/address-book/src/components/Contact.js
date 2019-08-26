import React, { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import { Api } from '../services/Api';
import { User } from '../services/User';

const Contact = () => {
    const [items, setItems] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(2);
    const [totalItemsCount, setTotalItemsCount] = useState(null);
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(null);

    const [user, setUser] = useState(false);

    const getContacts = () => {
        fetch('http://localhost/api/addressbook', Api.getOptions('GET'))
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(json => {
                setItems(json.data);
                setItemsCountPerPage(json.per_page);
                setTotalItemsCount(json.total);
                setPageRangeDisplayed(json.last_page);
                setIsLoaded(true);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handlePageChange = (pageNumber) => {
        setIsLoaded(false);
        fetch('http://localhost/api/addressbook?page=' + pageNumber, Api.getOptions('GET'))
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(json => {
                setItems(Object.values(json.data)); //FIX ME
                setActivePage(pageNumber);
                setItemsCountPerPage(json.per_page);
                setTotalItemsCount(json.total);
                setIsLoaded(true);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        getContacts();

        User.getUser()
            .then(response => {
                setUser(response);
            });
    }, []);


    const UpdateButton = (param) => {
        return (
            <div>
                <Link
                    to={'/edit/' + param.itemId}
                    className="btn btn-primary btn-sm">
                    Redigera
                    </Link>
            </div>
        );
    }

    const DeleteButton = (param) => {
        return (
            <div className="mt-1">
                <Link
                    to={'/delete/' + param.itemId}
                    className="btn btn-primary btn-sm">
                    Ta bort
                    </Link>
            </div>
        );
    }

    const TableRows = () => {
        return items.map((item) =>
            <tr key={item.id}>
                <td><img className="img-fluid" src={item.pathToImage} alt="" /></td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.socialId}</td>
                {user.role === 2 &&
                    <td className="text-right">
                        <UpdateButton itemId={item.id} />
                        <DeleteButton itemId={item.id} />
                    </td>
                }
            </tr>
        );
    }

    const Table = () => {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Namn</th>
                        <th scope="col">E-post</th>
                        <th scope="col">Personnummer</th>
                        {user.role === 2 &&
                            <th scope="col"></th>
                        }
                    </tr>
                </thead>
                <tbody>
                    <TableRows />
                </tbody>
            </table>
        );
    }

    if (!isLoaded) {
        return null;
    }

    return (
        <div>
            <Table />
            <div className="d-flex justify-content-center mt-2">
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={pageRangeDisplayed}
                    onChange={handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            </div>
        </div>
    );
}

export default Contact;