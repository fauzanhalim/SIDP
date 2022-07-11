import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import {AuthContext} from '../_auth';


//helpers
import * as Helpers from '../../supports/Helpers';
//third party
import axios from '../../supports/Axios';
import moment from 'moment';
import Swal from 'sweetalert2';

// views
import ViewFormDocument from './ViewFormDocument';

const formDocument = (props) => {
    const {handleLogin, state}  = useContext(AuthContext);
    const history = useHistory();
    const { register, handleSubmit, watch, errors, setValue } = useForm({
        mode: "onChange",
        defaultValues:{
            contract_value: "Rp. 20.000.000",
            number_agreement_letter: 'Perjanjian/SPK/SPB 010/SPK/SMP/6/2019',
        }
    });
    const [job, setJob]                         = useState({});
    const [activity, setActivity]               = useState({});
    const [formatDate, setFormatDate]           = useState('YYYY-MM-DD');
    const [morePerson, setMorePerson]           = useState(false);
    const [numberLetter, setNumberLetter]       = useState('');
    const [changeLetter, setChangeLetter]       = useState(false);
    const [timeInCharge, setTimeInCharge]       = useState();
    const [disabledSend, setDisabledSend]       = useState(false);
    const [dateAgreement, setDateAgreement]     = useState('');
    const [contractValue, setContractValue]     = useState();
    const [sequenceLetter, setSequenceLetter]   = useState(1);
    const [personInCharge, setPersonInCharge]   = useState({
        person_in_charge_one: null,
        person_in_charge_two: null,
        person_in_charge_three: null,
    });

    useEffect(() => {
        if(props.location.state === undefined){
            setChangeLetter(true);
        }

        handleFormEdit();
        setTimeInCharge(new Date());
        setDateAgreement(new Date());
    }, []);

    const handleFormEdit = async () => {
        if(props.location.state !== undefined){
            let data = props.location.state;

            await axios({
                method: 'get',
                url: '/document/edit/'+data.id,
            }).then(response => {
                let data = response.data;

                if(data === undefined){
                    let result = {
                        data: 'Maaf, Ada Kesalahan Sistem',
                        status: 500,
                    }
        
                    Helpers.alert(result);
                    setDisabledSend(true);
                    console.log('data is undefined');
                }else{
                    insertFormEdit(data);
                }
            }).catch(function (response) {
                let result = {
                    data: 'Maaf, Ada Kesalahan Sistem',
                    status: 500,
                }
    
                Helpers.alert(result);
                setDisabledSend(true);
                console.log(response);
            });
        }
    }

    const insertFormEdit = data => {
        // console.log(data);
        const personOne         = data.person_charge_one;
        const personTwo         = data.person_charge_two;
        const personThree       = data.person_charge_three;
        const dataTimeInCharge  = data.time_in_charge;

        const dataJob       = {
                                value: data.job.id, label: data.job.label, 
                                lastCode: Helpers.wordLimit(data.job.label, 6, 'back'), otherData: data.job
                            }
        const dataActivity  = {value: data.activity.id, label: data.activity.label, otherData: data.activity};

        // pilih pilihan 1 orang / 3 orang
        if(data.person_in_charge_two !== 0){
            setMorePerson(true);
        }

        // pejabat PaHP 1, 2, dan 3.
        setValue('person_in_charge_one', {value: personOne.id, label: personOne.name, otherData: personOne});
        if(personTwo && personThree){
            setValue('person_in_charge_two', {value: personTwo.id, label: personTwo.name, otherData: personTwo});
            setValue('person_in_charge_three', {value: personThree.id, label: personThree.name, otherData: personThree});
        }

        // nomor surat
        setValue('number_letter', data.number_letter);

        // tanggal pemeriksaan
        setTimeInCharge(new Date(dataTimeInCharge));

        // kode kegiatan
        setActivity(dataActivity)
        setValue('code_activity', dataActivity);
        // nomor DPA-SKPD
        setValue('number_dpa', '1.01.01.'+data.activity.label);
        // nama kegiatan
        setValue('name_activity', data.activity.name);

        // kode rekening belanja
        setJob(dataJob);
        setValue('rek_code', {value: data.job.id, label: data.job.code});
        // nama pekerjaan
        setValue('name_work', data.job.name);

        // nilai kontrak
        setValue('contract_value', data.set_contract_value);

        // keterangan
        setValue('keterangan', data.information);

        // nomor surat perjanjian
        setValue('number_agreement_letter', data.number_agreement_letter);
        // tanggal surat perjanjian
        setDateAgreement(new Date(data.date_agreement_letter));

        // urutan surat
        setSequenceLetter(data.sequenceLetter);
    }

    useEffect(() => {
        handleNumberLetter();
    }, [timeInCharge, activity, numberLetter, sequenceLetter, job]);

    const handleNumberLetter = () => {
        let year            = moment(timeInCharge).format('YY');
        let day             = moment(timeInCharge).format('DD');
        let month           = moment(timeInCharge).format('MM');
        let codeActivity    = activity.otherData !== undefined 
                                ? activity.otherData.code 
                                : '00.00';
        let codeJob         = job.lastCode !== undefined 
                                ? job.lastCode
                                : '00.00';

        let resultNumberLetter = 'No.'+month+day+sequenceLetter;
        resultNumberLetter    += '/BA-PPHP/DP/'+codeJob+'/'+codeActivity;
        resultNumberLetter    += '/'+month+'/'+year;

        if(changeLetter){
            setValue('number_letter', resultNumberLetter);
        }
    }

    const handleSetActivity = e => {
        setChangeLetter(true);
        if(e !== null){
            setActivity(e);
            setValue('name_activity', e.otherData.name);
            setValue('number_dpa', '1.01.01.'+e.otherData.code);
        }else{
            setActivity({});
            setValue('name_activity', null);
            setValue('number_dpa', null);
        }
    }

    const handleSetTimeInCharge = e => {
        setChangeLetter(true);
        if(e !== null){
            setTimeInCharge(e);
        }
    }
    
    const handleSetJob = e => {
        setChangeLetter(true);
        e.lastCode = Helpers.wordLimit(e.label, 6, 'back');
        if(e !== null){
            setJob(e);
            setValue('name_work', e.otherData.name);
        }else{
            setJob({});
        }
    }

    const handleChoosePerson = (selected, name) => {
        // kadang suka pakai select biasa tau react-select
        // const value = selected.value ? selected.value : selected.target.value;
        let value = selected.value;

        setPersonInCharge({
            ...personInCharge,
            [name]: value,
        });
    }   

    const handleFormPerson = e => {
        setPersonInCharge({
            // person_in_charge_one: null,
            person_in_charge_two: null,
            person_in_charge_three: null,
        });

        setMorePerson(!morePerson);
    }

    const handleSetContractValue = e => {
        let formatRupiah = Helpers.formatRupiah;
        let number = formatRupiah(e.target.value, 'Rp. ');
        e.target.value = number;
    }

    useEffect(() => {
        fetchSequenceLetter();
    }, [timeInCharge]);

    const fetchSequenceLetter = async () => {
        let id = 0;
        let dataTimeInCharge = moment(timeInCharge).format(formatDate);
        if(props.location.state !== undefined){
            let data = props.location.state;
            id = data.id;
        }

        await axios({
            method: 'get',
            url: '/document/sequence-letter',
            params:{time_in_charge: dataTimeInCharge, id: id},
        }).then(res => {
            setSequenceLetter(res.data);
        }).catch(function (response) {
            let result = {
                data: 'Maaf, Ada Kesalahan Sistem',
                status: 500,
            }

            Helpers.alert(result);
            console.log(response);
        });
    }

    const handleSetDateAgreement = e => {
        if(e !== null){
            setDateAgreement(e);
        }
    }
    
    const handleUrl = () => {
        if(props.location.state != undefined){
            let data = props.location.state;

            return 'document/update/'+data.id;
        }else{
            return 'document/store'
        }
    }

    const handleSend = data => {
        // console.log(data);
        data.user_id                = state.user.id;
        data.time_in_charge         = moment(timeInCharge).format(formatDate);
        data.contract_value         = Helpers.removeFormatRupiah(data.contract_value);
        data.sequence_letter        = sequenceLetter;
        data.date_agreement_letter  = moment(dateAgreement).format(formatDate);

        const sameChoice = Object.keys(data)
                                .some(item => {
                                    return Helpers.sameChoice(item, personInCharge);
                                });

        if(!sameChoice){
            axios({
                method: 'post',
                url: handleUrl(),
                params: data,
            }).then(res => {
                // console.log(res);
                let result = res.data;

                let alert = Helpers.alert(result);

                if(alert == 200){
                    window.open(result.file, '_blank');
                    
                    history.push("/document");
                }
            }).catch(function (response) {
                let result = {
                    data: 'Maaf, Ada Kesalahan Sistem',
                    status: 500,
                }
    
                Helpers.alert(result);
                console.log(response);
            });
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Pilihan penanggung jawab ada yang sama.',
            });
        }       
    }

    const handleError = (name, tag) => Helpers.handleError(name, tag, errors, {...personInCharge});

    const messageError = (name, label) => Helpers.messageError(name, label, errors, {...personInCharge});

    const passing = {
        // start from useForm
        watch: watch,
        errors: errors,
        register:value => register(value),
        setValue: value => setValue(value),
        handleSubmit:value => handleSubmit(value),
        // end from useForm
        // start important function 
        handleError:(name, tag) => handleError(name, tag),
        messageError:(name, label) => messageError(name, label),
        // end important function
        handleSend:value => handleSend(value),
        handleFormPerson:value => handleFormPerson(value),
        handleContractValue: value => handleContractValue(value),
        handleChoosePerson:(value, name) => handleChoosePerson(value, name),
        // another state all
        morePerson: morePerson,
        numberLetter: numberLetter,
        timeInCharge: timeInCharge,
        disabledSend: disabledSend,
        dateAgreement: dateAgreement,
        contractValue: contractValue,
        personInCharge: personInCharge,
        handleSetJob: e => handleSetJob(e),
        handleSetActivity: e => handleSetActivity(e),
        handleSetTimeInCharge: e => handleSetTimeInCharge(e),
        handleSetContractValue: e => handleSetContractValue(e),
        handleSetDateAgreement: e => handleSetDateAgreement(e),
        // get data from another table
        fetchWork: '/job/fetch-data',
        fetchActivities: '/activity/fetch-data',
        fetchPersonInCharge: '/person-in-charge/fetch-data',
    }

    return(
        <ViewFormDocument 
            {...passing}
        />
    )
}

export default formDocument;