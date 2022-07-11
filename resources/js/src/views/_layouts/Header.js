import React from 'react';

const styled = {
    spaceTitle: {
        marginTop: 20,
    },
    title: {
        marginLeft: 10,
        marginBottom: 0,
        fontSize: 15,
    },
    subTitle: {
        fontSize: 7,
        marginLeft: 10,

    }
}

const header = () => (
    <nav className="navbar header-navbar pcoded-header">
        <div className="navbar-wrapper">
            <div className="navbar-logo">
                <a className="mobile-menu" id="mobile-collapse">
                    <i className="feather icon-menu" />
                </a>
                <a style={styled.spaceTitle}>
                    <span style={styled.title}>SI Disdik Samarinda</span>
                    <p></p>
                    {/* <p style={styled.subTitle}>Sistem Informasi Dinas Pendidikan</p> */}
                </a>
                <a className="mobile-options">
                    <i className="feather icon-more-horizontal" />
                </a>
            </div>
            <div className="navbar-container container-fluid">
                <ul className="nav-right">
                    <li className="header-notification">
                        <div className="dropdown-primary dropdown">
                            {/* <div className="dropdown-toggle" data-toggle="dropdown">
                                <i className="feather icon-bell"></i>
                                <span className="badge bg-c-pink">0</span>
                            </div>
                            <ul className="show-notification notification-view dropdown-menu" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
                                <li>
                                    <h6>Notifikasi</h6>
                                    <label className="label label-danger">New</label>
                                </li>
                                <li>
                                    <div className="media">
                                        <div className="media-body">
                                            <p>Belum Ada</p>
                                        </div>
                                    </div>
                                </li>
                            </ul> */}
                        </div>
                    </li>
                    <li className="user-profile header-notification">
                        {/* <div className="dropdown-primary dropdown">
                            <div className="dropdown-toggle" data-toggle="dropdown">
                                <span>Username</span>
                                <i className="feather icon-chevron-down"></i>
                            </div>
                            <ul className="show-notification profile-notification dropdown-menu" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
                                <li>
                                    <a href="#">
                                        <i className="feather icon-log-out"></i> Keluar
                                    </a>
                                </li>
                            </ul>
                        </div> */}
                    </li>
                </ul>
            </div>
        </div>
    </nav>
)

export default header;