import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import './MainLayout.scss';

import Menu from './Menu';
import Header from './Header';


const mainLayout = (props) => {

    return (
        <div id="pcoded" className="pcoded">
            <div className="pcoded-overlay-box" > </div>
            <div className="pcoded-container navbar-wrapper">  
                <Header />
                <Menu />       
                <div className="pcoded-main-container">
                    <div className="pcoded-wrapper">
                        <div className="pcoded-content">
                            <div className="pcoded-inner-content">
                                <div className="main-body">
                                    <div className="page-wrapper">
                                        {props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default mainLayout;