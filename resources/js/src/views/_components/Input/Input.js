import React, {useEffect, useState} from 'react';
import { RHFInput } from 'react-hook-form-input';

//third party
import DatePicker, {registerLocale} from "react-datepicker";
 
import './Input.scss';
import "react-datepicker/dist/react-datepicker.css";

import id from 'date-fns/locale/id';
registerLocale('id', id)

// example use tag input
{/* <Input
    // start props
        // start from useForm
        register:value => register(value),
        // end from useForm
        // start important function 
        handleError:(name, tag) => handleError(name, tag),
        messageError:(name, label) => messageError(name, label),
        // end important function
    // end props
    required
    readonly
    name="number_dpa"
    label="Nomor DPA-SKPD"
    placeholder="1.XX.XX.XX.XXX.X.X"
    defaultValue="1.01.01.22.266.5.2"
/> */}

const input = (props) => {
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);

    useEffect(() => {
        if(props.type === 'date' && props.defaultValue){
            setTimeout(() => {
                setShowDate(true);
            }, 1000);
        }
    }, [props.defaultValue]);   

    useEffect(() => {
        // remove error when choose choice.
        props.errors[props.name] = false;
    }, [props.watch(props.name)]);

    const onChange = e => {
        if(props.watch(props.name) !== undefined && props.watch(props.name).length > 0){
            props.errors[props.name] = false;
        }

        if(props.type === 'date'){
            setDate(e);
        }

        if(props.onChange){
            return props.onChange(e);
        }else{
            return null;
        }   
    }

    const handleUploadFileClass = () => {
        if(props.type === 'file'){
            return 'custom-file-input';
        }else{
            return null;
        }
    }

    const allAttribute = {
        id:props.name, 
        name:props.name,
        onChange:e => onChange(e), 
        type:props.type ? props.type : 'input',
        readOnly:props.readonly ? true : false,
        placeholder:props.placeholder ? props.placeholder : null,
        className:`form-control ${props.handleError(props.name, 'input')} ${handleUploadFileClass()}`,
        //default value di gantikan dengan setValue react-hook-form
        // jika TIDAK pakai key, maka default value tidak bekerja
        /// jika pakai key, maka errors tidak bekerja
        // key={`${Math.floor((Math.random() * 1000))}-min`}
    }

    return(
        <div>
            <label 
                htmlFor={props.name}
                style={props.handleError(props.name, 'label')}
            >{props.label}</label>
            {
                props.type === 'date'
                ?   <div>
                        {
                            showDate 
                            ?   <DatePicker 
                                    {...allAttribute}  
                                    
                                    locale="id"
                                    selected={props.defaultValue}
                                />
                            :   <DatePicker 
                                    {...allAttribute}  
                                    
                                    locale="id"
                                    selected={date}
                                /> 
                        }
                    </div>
                :   <input 
                        ref={props.register({required: props.required})}
                        {...allAttribute}
                    />
            }
            {props.messageError(props.name, props.label)}
        </div>
        
    )
}

export default input;