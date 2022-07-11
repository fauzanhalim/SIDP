import React, {useState} from 'react';
import { Link, withRouter } from "react-router-dom";

const menu = (props) => {

    const getActiveClass = (path) => {
        const subMenu   = ['/job', '/person-in-charge', '/activity'];
        const pathName  = props.location.pathname;
        let subMenuForm = [...subMenu];
        subMenuForm     = subMenuForm.map(item => item+'/form').indexOf(pathName);

        if( subMenu.indexOf(pathName) >= 0 || subMenuForm >= 0 ){
            if(path === '/settings'){
                return 'active pcoded-trigger';
            }
        }

        return pathName === path || pathName === path+'/form' ? 'active' : null;
    }

    return(
        <div>
            <nav className="pcoded-navbar">
                <div className="pcoded-inner-navbar main-menu">
                    <div className="pcoded-navigatio-lavel">Menus</div>
                    <ul className="pcoded-item pcoded-left-item">
                    <li className={getActiveClass('/')}>
                        <Link to="/">
                            <span className="pcoded-micon">
                                <i className="icofont icofont-dashboard-web" />
                            </span>
                            <span className="pcoded-mtext">Dashboard</span>
                        </Link>
                    </li>
                    <li className={`pcoded-hasmenu ${getActiveClass('/settings')}`} style={{"cursor":"pointer"}}>
                        <a >
                            <span className="pcoded-micon"><i className="ti-settings" /></span>
                            <span className="pcoded-mtext">Pengaturan</span>
                        </a>
                        <ul className="pcoded-submenu">
                            <li className={getActiveClass('/person-in-charge')}>
                                <Link to="/person-in-charge">
                                    <span className="pcoded-micon"><i className="feather icon-home" /></span>
                                    <span className="pcoded-mtext">Pejabat PaHP</span>
                                </Link>
                            </li>
                            <li className={getActiveClass('/job')}>
                                <Link to="/job">
                                    <span className="pcoded-micon"><i className="feather icon-home" /></span>
                                    <span className="pcoded-mtext">Kode Rekening Belanja</span>
                                </Link>
                            </li>
                            <li className={getActiveClass('/activity')}>
                                <Link to="/activity">
                                    <span className="pcoded-micon"><i className="feather icon-home" /></span>
                                    <span className="pcoded-mtext">Kegiatan</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={getActiveClass('/document')}>
                        <Link to="/document">
                            <span className="pcoded-micon">
                                <i className="ti-write"></i>
                            </span>
                            <span className="pcoded-mtext">Document</span>
                        </Link>
                    </li>
                    {/* <li >
                        <Link to="/empty" onClick={e => setActiveMenu(e)}>
                            <span className="pcoded-micon">
                                <i className="fa fa-location-arrow"></i>
                            </span>
                            <span className="pcoded-mtext">Rekapan</span>
                        </Link>
                    </li>
                    <li >
                        <Link to="/logout" onClick={e => setActiveMenu(e)}>
                            <span className="pcoded-micon">
                                <i className="feather icon-log-out" />
                            </span>
                            <span className="pcoded-mtext">Keluar</span>
                        </Link>
                    </li> */}
                    
                    </ul>
                </div>
            </nav>
            {props.children}
        </div>
    )
}

export default withRouter(menu);