import React, {Component} from 'react';

import Auth from './views/_auth';
import Route from './route/Web';

class Main extends Component {
    render(){
        return(
            <Auth>
                <Route />
            </Auth>
        )
    }
}

export default Main;