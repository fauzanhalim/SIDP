import React, {useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';

//third party
import axios from '../../supports/Axios';
//components
import Input from '../_components/Input/Input';
// helpers
import * as Helpers from '../../supports/Helpers';

const formPersonInCharge = props => {
    const history = useHistory();
    const { register, handleSubmit, watch, errors, setValue } = useForm();

    const [data, setData] = useState({});

    const handleError = (name, tag) => Helpers.handleError(name, tag, errors, null);
    const messageError = (name, label) => Helpers.messageError(name, label, errors, null);

    useEffect(() => {
       if(props.location.state != undefined){
           let data = props.location.state;
           
           setValue('name', data.name);
           setValue('nip', data.nip);
       }
    }, []);

    const setUrl = () => {
        if(props.location.state != undefined){
            return '/person-in-charge/update/'+data.id;
        }else{
            return '/person-in-charge/store';
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
                history.push("/person-in-charge");
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
                                <h4>Form Pejabat PaHP</h4>
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
                                <Link to="/person-in-charge" title="Back" className="btn btn-md btn-info" >
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
                                    {/* <label className="col-sm-1 col-form-label" htmlFor="name">Nama</label>
                                    <div className="col-sm-11">
                                        <input type="text" className="form-control" name="name" id="name" placeholder="Nama Penanggung Jawab" />
                                    </div> */}
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12 col-md-12">
                                        <Input
                                            {...importantFunction}
                                            required
                                            name="nip"
                                            label="NIP"
                                            placeholder="Nomor Induk Pegawai"
                                            // defaultValue="19700417 198903 1003"
                                        />
                                    </div>
                                    {/* <label className="col-sm-1 col-form-label" htmlFor="name">NIP</label>
                                    <div className="col-sm-11">
                                        <input type="text" className="form-control" name="name" id="name" placeholder="Nomor Induk Pegawai" />
                                    </div> */}
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

export default formPersonInCharge;