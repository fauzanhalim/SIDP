import React, {
  useContext, useEffect, useRef,
  useState
} from 'react';
import { Link, useHistory } from "react-router-dom";
import {AuthContext} from './index';

// helpers
import axios from '../../supports/Axios';
import * as Helpers from '../../supports/Helpers';

const login = props => {
  const history               = useHistory();
  const initialAuth           = {name: null, password: null};
  const [auth, setAuth]       = useState(initialAuth);
  const {handleLogin, state}  = useContext(AuthContext);
  
  // useEffect(() => {
  // console.log(auth);  
  // }, [auth])
  
  const insert = e => {
    let input = e.target;
    
    setAuth(prev => {
      return{...prev, [input.name]: input.value}
    });
  }
  
  const send = () => {
    axios({
      method: 'post',
      url: 'auth/login',
      data: {name: auth.name, password: auth.password},
    }).then(res => {
      let result  = res.data;
      
      Helpers.alert(result);
      if(result.status === 200){
        setTimeout(() => {
          handleLogin(result.auth);
          history.push('/');
        }, 1000)
      }
    }).catch(function (response) {
      let result = {
        data: 'Maaf, Ada Kesalahan Sistem',
        status: 500,
      }
      
      Helpers.alert(result);
    });      
  }
  
  return(
    <div>
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <form className="md-float-material form-material" action="#" method="post">
                        <div className="text-center">
                        </div>
                        <div className="auth-box card">
                            <div className="card-block">
                                <div className="row m-b-20">
                                    <div className="col-md-12">
                                        <h3 className="text-center">Login</h3>
                                    </div>
                                </div>
                                <hr/>
                                <div className="form-group form-primary">
                                    <input type="text" name="name" defaultValue={auth.name} onChange={insert} id="name" className="form-control" placeholder="masukan nama" />
                                    <span className="form-bar"></span>
                                </div>
                                <div className="form-group form-primary">
                                    <input type="password" name="password" defaultValue={auth.password} onChange={insert} id="password" className="form-control" placeholder="Password" />
                                    <span className="form-bar"></span>
                                </div>
                                <div className="row m-t-25 text-left">
                                    <div className="col-12">
                                        
                                    </div>
                                </div>
                                <div className="row m-t-30">
                                    <div className="col-md-12">
                                        <button type="button" onClick={() => send()} className="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20" >Sign in</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
  
  export default login;