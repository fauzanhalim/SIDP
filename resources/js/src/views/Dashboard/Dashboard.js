import React, {useContext} from 'react';

import {AuthContext} from '../_auth';

const dashboard = () => {
    const {handleLogin, state}  = useContext(AuthContext);
    
    return(
        <div>
            {/* <h1>Selamat Datang</h1> <br /> */}
            <h1>Aplikasi Sistem Informasi Dinas Pendidikan Samarinda</h1>
        </div>
    )
}

export default dashboard;