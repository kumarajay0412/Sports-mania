import React from 'react'
import {Container} from "reactstrap";
import "./Jumbrotron.scss";
function Jumbotron(props) {
    return (
    <>
            <div className="jumbotron-container">
                <h1>{props.heading}</h1>
            </div>
            <div className="position-relative semi">
                <div className="shape overflow-hidden text-white">
                <svg
                    viewBox="0 0 2880 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M0 50H1437.2H2880V1000H2880C1500 1000 720 0 720 0H0V64Z"
                    
                    fill="#fff"
                    ></path>
                </svg>
                </div>
            </div>
    </>
    )
}

export default Jumbotron
