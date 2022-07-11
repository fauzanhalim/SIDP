import React, {useState, useEffect} from 'react';
import { RHFInput } from 'react-hook-form-input';
import Select from 'react-select';

//third party
import axios from '../../supports/Axios';

const select = (props) => {
    const [state, setState]             = useState([]);
    const [empty, setEmpty]             = useState(false);
    const [search, setSearch]           = useState();
    const [loading, setLoading]         = useState(false);
    const [placeholder, setPlaceholder] = useState('Loading...');

    useEffect(() => {
        if(props.data){
            setPlaceholder(`Pilih ${props.label}...`);
        }else if(props.url){
            setEmpty(false);
            setLoading(true);
            fetchDataActivities();
        }else{
            setEmpty(true);
            setLoading(false);
            setPlaceholder('Data Tidak Ada.');
        }
    }, [search]);

    const fetchDataActivities = async () => {
        await axios.get(props.url, {
                    params: {
                        search: search,
                    }
                })
                .then(response => {
                    let data = response.data;

                    if(Array.isArray(data) && data.length){
                        setState(data);
                        setLoading(false);
                        setPlaceholder(`Pilih ${props.label}...`);
                    }else{
                        setEmpty(true);
                        setLoading(false);
                        setPlaceholder(`Pilih ${props.label}...`);
                    }   
                })
                .catch(e => {
                    setLoading(true);
                    console.error(e);
                });
    }

    const options = () => {
        let dataEmpty = [{label: 'Data Tidak Ada.', value: 0}];
        if(props.data){
            if(props.data.length > 0){
                return props.data;
            }else{
                return dataEmpty;
            }
        }else if(props.url){
            let option      = [];
            let checkData   = state.length; 
            let dataLoading = [{label: 'Loading...', value: 0}];
            
            if(!checkData){
                return dataEmpty;
            }else if(loading){
                return dataLoading;
            }else{
                state.forEach(data => {
                    let role = {};
                    role.value = data.id;
                    role.label = data.label;
                    role.otherData = data;
                    option.push(role);
                });
                
                return option;
            }
            
        }
    }

    const onChange = e => {
        // remove error when choose choice.
        if(e !== null){
            props.errors[props.name] = false;
        }

        if(props.onChange){
            return props.onChange(e);
        }else{
            return null;
        }   
    }

    const selected = () => {
        return props.defaultValue ? props.defaultValue : null;
    }

    return(
        <div>
            <label 
                htmlFor={props.name} 
                style={props.handleError(props.name, 'label')}
            >
                {props.label}
            </label>
            <RHFInput
                name={props.name}
                //penting cuy.. jangan di hapus. untuk mendapatkan nilai dari selectnya
                setValue={() => null} 
                // defaultValue={selected()}
                rules={{ required: true }}
                onChange={e => onChange(e)}
                register={props.register({ required: props.required})}
                as={
                    <Select
                        name={props.name}
                        options={options()} 
                        placeholder={placeholder}
                        onInputChange={e => setSearch(e)}
                        isClearable={props.required ? false : true}
                        className={`${props.handleError(props.name, 'select')}`}
                        styles={{
                            control: base => ({
                                ...base,
                                boxShadow: props.handleError(props.name, 'select') ? '0 0 0 0.1rem red !important' : null,
                            })
                        }} 
                    />
                }
            />
            {props.messageError(props.name, props.label)}
        </div>
    )
}

export default select;