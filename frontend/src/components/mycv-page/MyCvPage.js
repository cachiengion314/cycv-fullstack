import React from 'react';
import HomePage from "../home-page";

const MyCvPage = ({ width, dispatch, className }) => {

    return (
        <div className="root-container">
            <div className="left-container"></div>
            <div className="center-container d-block">
                <HomePage width="100%" className="mb-3" />
            </div>
            <div className="right-container"></div>
        </div>
    )
}

export default MyCvPage;