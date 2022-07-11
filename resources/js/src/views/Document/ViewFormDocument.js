import React from 'react';
import { Link } from "react-router-dom";

//components
import Select from '../_components/Select';
import Input from '../_components/Input/Input';
import Textarea from '../_components/Textarea';

// styling
import './ViewFormDocument.scss';

//sub view
import ViewFormPersonInCharge from './Partials/ViewFormPersonInCharge';

const viewFormDocument = (props) => {
    const handleDisabledSend = () => {
        document.getElementsByClassName("mySubmit").disabled = true;
        return props.disabledSend ? 'disabled' : '';
    }

    return(
        <div>
            <div className="page-header">
                <div className="row">
                    <div className="col-md-10">
                        <div className="page-header-title">
                            <div className="d-inline">
                                <h4>Document</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        
                    </div>
                </div>
            </div>
            <div className="page-body">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-block">
                                <h3 className="sub-title">Form Document</h3>
                                <Link to="/document" title="Back" className="btn btn-md btn-info" >
                                    <span>Kembali</span>
                                </Link>
                                <hr />
                                {/* start FORM */}
                                <form onSubmit={props.handleSubmit(props.handleSend)}>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <label>Jumlah Orang yang Bertanda Tangan</label>
                                        <div className="form-radio">
                                            <div className="radio radio-inline">
                                                <label>
                                                    <input type="radio" name="person" ref={props.register} defaultValue="1" onChange={e => props.handleFormPerson(1)} defaultChecked />
                                                    <i className="helper" />1 Orang
                                                </label>
                                            </div>
                                            <div className="radio radio-inline">
                                                <label>
                                                    <input type="radio" name="person" ref={props.register} defaultValue="3" onChange={e => props.handleFormPerson(3)} checked={props.morePerson} />
                                                    <i className="helper" />3 Orang
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* pilihan penanggung jawab */}
                                <ViewFormPersonInCharge 
                                    {...props}
                                />
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <Input
                                            {...props}
                                            // required
                                            label="Nomor Surat"
                                            name="number_letter"
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <Input
                                            {...props}
                                            // required
                                            type="date"
                                            name="time_in_charge"
                                            label="Tanggal Pemeriksaan"
                                            defaultValue={props.timeInCharge}
                                            onChange={e => props.handleSetTimeInCharge(e)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-2">
                                        <Select 
                                            {...props}
                                            required
                                            name="code_activity"
                                            label="Kode Kegiatan"
                                            url={props.fetchActivities}
                                            onChange={e => props.handleSetActivity(e)}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <Input
                                            {...props}
                                            // required
                                            readonly
                                            name="number_dpa"
                                            label="Nomor DPA-SKPD"
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <Textarea
                                            {...props}
                                            // required
                                            readonly
                                            label="Nama Kegiatan"
                                            name="name_activity"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <Select 
                                            {...props}
                                            required
                                            name="rek_code"
                                            label="Kode Rekening Belanja"
                                            url={props.fetchWork}
                                            onChange={e => props.handleSetJob(e)}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <Input
                                            {...props}
                                            required
                                            label="Niai Kontrak"
                                            name="contract_value"
                                            placeholder="10.000.000"
                                            onChange={e => props.handleSetContractValue(e)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <Textarea
                                            {...props}
                                            // required
                                            readonly
                                            name="name_work"
                                            label="Nama Pekerjaan"
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <Textarea
                                            {...props}
                                            name="information"
                                            label="Keterangan"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <Input
                                            {...props}
                                            required
                                            name="number_agreement_letter"
                                            label="Nomor Surat Perjanjian/SPK/SPB"
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <Input
                                            {...props}
                                            // required
                                            type="date"
                                            name="date_agreement_letter"
                                            defaultValue={props.dateAgreement}
                                            label="Tanggal Surat Perjanjian/SPK/SPB"
                                            onChange={e => props.handleSetDateAgreement(e)}
                                        />
                                    </div>
                                </div>
                                &nbsp; 
                                    <input 
                                        value="kirim" 
                                        type="submit" 
                                        disabled={props.disabledSend} 
                                        className={`btn btn-md btn-success btn-send ${handleDisabledSend()}`} 
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default viewFormDocument;