import React, {useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';

//third party
import axios from '../../supports/Axios';
//components
import Input from '../_components/Input/Input';
// helpers
import * as Helpers from '../../supports/Helpers';

const formUser = props => {
    const nameRoute = '/user';
    const history = useHistory();
    const { register, handleSubmit, watch, errors, setValue } = useForm();

    const [data, setData] = useState({});

    const handleError = (name, tag) => Helpers.handleError(name, tag, errors, null);
    const messageError = (name, label) => Helpers.messageError(name, label, errors, null);

    useEffect(() => {
       if(props.location.state != undefined){
           let data = props.location.state;

           setValue('name', data.name);
           setValue('password', data.code);
       }
    }, []);

    const setUrl = () => {
        if(props.location.state != undefined){
            return nameRoute+'/update/'+data.id;
        }else{
            return nameRoute+'/store';
        }
    }

    const handleSend = data => {
        const url = setUrl();

        axios({
            method: 'post',
            url: url,
            data: data,
        }).then(res => {
            let result = res.data;

            let alert = Helpers.alert(result);

            if(alert == 200){
                history.push(nameRoute);
            }
        }).catch(function (response) {
            let result = {
                data: 'Maaf, Ada Kesalahan Sistem',
                status: 500,
            }

            Helpers.alert(result);
        });
    }

    const importantFunction = {
        // start from useForm
        watch: watch,
        errors: errors,
        register:value => register(value),
        setValue:value => setValue(value),
        handleSubmit:value => handleSubmit(value),
        // end from useForm
        handleSend:value => handleSend(value),
        handleError:(name, tag) => handleError(name, tag),
        messageError:(name, label) => messageError(name, label),
    }

    return(
        <div>
            <div className="page-header">
                <div className="row">
                    <div className="col-md-10">
                        <div className="page-header-title">
                            <div className="d-inline">
                                <h4>Form Kegiatan</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        
                    </div>
                </div>
            </div>
            <div className="page-body">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-block">
                                <Link to={nameRoute} title="Back" className="btn btn-md btn-info" >
                                    <span>Kembali</span>
                                </Link>
                                <hr />
                                <form onSubmit={handleSubmit(handleSend)}>
                                <div className="form-group row">
                                    <div className="col-sm-12 col-md-12">
                                        <Input
                                            {...importantFunction}
                                            required
                                            name="name"
                                            label="Nama"
                                            placeholder="Nama"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12 col-md-12">
                                        <Input
                                            {...importantFunction}
                                            required
                                            type="password"
                                            name="password"
                                            label="Password"
                                        />
                                    </div>
                                </div>
                                &nbsp; 
                                <button className="btn btn-md btn-success">
                                    <span>Kirim</span>
                                </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default formUser;