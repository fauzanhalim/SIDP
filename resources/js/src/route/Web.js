import React, {useContext} from 'react';
import {
    Route,
    Switch,
    Redirect,
    HashRouter,
    BrowserRouter as Router,
} from "react-router-dom";
import {AuthContext}  from '../views/_auth';

import MainLayout from '../views/_layouts/MainLayout';

// pages
import Empty from '../views/Empty/Empty';
import Login from '../views/_auth/Login';
import Dashboard from '../views/Dashboard/Dashboard';
// documents
import Document from '../views/Document/Document';
import FormDocument from '../views/Document/FormDocument';
// person in charge
import PersonInCharge from '../views/PersonInCharge/PersonInCharge';
import FormPersonInCharge from '../views/PersonInCharge/FormPersonInCharge';
// jobs
import Job from '../views/Job/Job';
import FormJob from '../views/Job/FormJob';
// jobs
import Activity from '../views/Activity/Activity';
import FormActivity from '../views/Activity/FormActivity';
// users
import User from '../views/User/User';
import FormUser from '../views/User/FormUser';

function PrivateRoute({ children, ...rest }) {
    const {state} = useContext(AuthContext);

    return (
      state.login ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location }
          }}
        />
      )
    );
}

const web = props => {
    const {state} = useContext(AuthContext);

    return(
        <Router>
            <HashRouter>
                <Switch>
                    <MainLayout>
                        <Route path="/login" component={Login} />
                        <Route path="/empty" component={Empty} />
                        <Route exact path="/">
                            {state.login ? <Redirect exact to="/dashboard" /> : <Login exact />}
                        </Route>
                        <PrivateRoute path="/protected">
                            <Route path="/dashboard" exact component={Dashboard} />
                            {/* route document */}
                            <Route path="/document" exact component={Document} />                  
                            <Route path="/document/form" component={FormDocument} /> 
                            {/* route person in charge  */}
                            <Route path="/person-in-charge" exact component={PersonInCharge}/>
                            <Route path="/person-in-charge/form" component={FormPersonInCharge} />
                            {/* route jobs */}
                            <Route path="/job" exact component={Job} /> 
                            <Route path="/job/form" component={FormJob} />
                            {/* route activities */}
                            <Route path="/activity" exact component={Activity} /> 
                            <Route path="/activity/form" component={FormActivity} />
                            {/* route user */}
                            <Route path="/user" exact component={User} /> 
                            <Route path="/user/form" component={FormUser} /> 
                        </PrivateRoute>
                    </MainLayout>
                </Switch>                 
            </HashRouter>
        </Router>
    )
}

export default web;