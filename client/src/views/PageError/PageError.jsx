import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import { useSelector } from "react-redux";
import './PageError.scss';
export default function PageError() {
    const authentication = useSelector(state => state.authentication);
    return (
        <Container>
        <div className="height-80 d-flex flex-column justify-content-center align-items-center pageError-container">
            <div className="title-text">404</div>
            <h1>Oops! Something went wrong...</h1>
            <p className="mt-4">
            Page not found. Please continue to our {authentication.user?<Link to="/">home page</Link>:<Link to="/login">login page</Link>}
            </p>
            <hr className="line mt-4" />
        </div>
        </Container>
    );
}