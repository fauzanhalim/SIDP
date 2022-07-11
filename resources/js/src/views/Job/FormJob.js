import React, {useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';

//third party
import axios from '../../supports/Axios';
//components
import Select from '../_components/Select';
import Input from '../_components/Input/Input';
// helpers
import * as Helpers from '../../supports/Helpers';

const formPersonInCharge = props => {
    const history = useHistory();
    const { register, handleSubmit, watch, errors, setValue, getValues } = useForm();

    const routeName                     = '/job';
    const [data, setData]               = useState({});
    const [editTypeRec, setEditTypeRec] = useState();
    const [codeShopRec, setCodeShopRec] = useState('');
    const [subCode, setSubCode]         = useState(''); // code after "jenis rekening"
    const [dataTypeRec] = useState([
        {value: 1, label: '5.2.2'},
        {value: 2, label: '5.2.3'},
    ]);

    useEffect(() => {
        // mendapatkan data dari passing url
       if(props.location.state != undefined){
            let data = props.location.state;

            setData(data);
            setCodeShopRec(data.code);
       }
    }, []);

    useEffect(() => {
        handleName();
        handleSubCode();
        handleEditTypeRec();
    }, []);

    const handleName = () => {
        if(props.location.state != undefined){
            let data    = props.location.state;

            setValue('name', data.name);
        }
    }

    const handleSubCode = () => {
        if(props.location.state != undefined){
            let data    = props.location.state;
            let subCode = Helpers.wordLimit(data.code, 6, 'back');
            setSubCode(subCode);
            setValue('code_shop_rek', data.code);
        }
    }

    const handleEditTypeRec = () => {
        if(props.location.state != undefined){
            let data    = props.location.state;
            let code    = Helpers.wordLimit(data.code, 5, 'front');
            let value   = {value: 0, label: code};

            setValue('type_rec', value);
        }
    }

    const handleTypeRec = e => {
        setValue('code_shop_rek', `${e.label}.${subCode}`);
        errors['code_shop_rek'] = false;
    }

    const setUrl = () => {
        if(props.location.state != undefined){
            return routeName+'/update/'+data.id;
        }else{
            return routeName+'/store';
        }
    }

    const handleSend = data => {
        const url       = setUrl();
        let sendData    = {
            ...data,
            code: data.code_shop_rek,
        }

        axios({
            method: 'post',
            url: url,
            data: sendData,
        }).then(res => {
            let result  = res.data;

            let alert   = Helpers.alert(result);

            if(alert == 200){
                history.push(routeName);
            }
        }).catch(function (response) {
            let result = {
                data: 'Maaf, Ada Kesalahan Sistem',
                status: 500,
            }

            Helpers.alert(result);
        });
    }

    const handleError = (name, tag) => Helpers.handleError(name, tag, errors, null);
    const messageError = (name, label) => Helpers.messageError(name, label, errors, null);

    const importantFunction = {
        // start from useForm
        errors: errors,
        watch: watch,
        setValue:value => setValue(value),
        register:value => register(value),
        setValue: value => setValue(value),
        // end from useForm
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
                                <h4>Form Kode Rekening Belanja</h4>
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
                                <Link to={routeName} title="Back" className="btn btn-md btn-info" >
                                    <span>Kembali</span>
                                </Link>
                                <hr />
                                <form onSubmit={handleSubmit(handleSend)}>
                                <div className="form-group row">
                                    <div className="col-sm-12 col-md-6">
                                        <Select 
                                            {...importantFunction}
                                            required
                                            name="type_rec"
                                            data={dataTypeRec}
                                            label="Jenis Rekening"
                                            // defaultValue={handleEditTypeRec()}
                                            onChange={e => handleTypeRec(e)}
                                        />
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <Input
                                            {...importantFunction}
                                            required
                                            name="code_shop_rek"
                                            // defaultValue={}
                                            label="Kode Rekening Belanja"
                                            // placeholder="Kode "
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12 col-md-12">
                                        <Input
                                            {...importantFunction}
                                            required
                                            name="name"
                                            label="Nama"
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

export default formPersonInCharge;