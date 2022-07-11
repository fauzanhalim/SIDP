import React from 'react';
import Select from '../../_components/Select';

const viewFormPersonInCharge = (props) => {

    const dataMorePerson = [
        { name: 'person_in_charge_two', label: 'Pejabat PaHP 2'},
        { name: 'person_in_charge_three', label: 'Pejabat PaHP 3'},
    ]

    const showFormPerson = () => (
        dataMorePerson.map((item, index) => 
            <div className="col-sm-4" key={index}>
                <Select 
                    {...props}
                    required={props.morePerson}
                    url={props.fetchPersonInCharge}
                    name={item.name}
                    label={item.label}
                    onChange={e => props.handleChoosePerson(e, item.name)}
                />
            </div>    
        )
    )

    return (
        <div className="form-group row">
            <div className="col-sm-4">
                <Select 
                    {...props}
                    required
                    label="Pejabat PaHP 1"
                    name="person_in_charge_one"
                    url={props.fetchPersonInCharge}
                    onChange={e => props.handleChoosePerson(e, 'person_in_charge_one')}
                />
            </div>
            {
                props.morePerson && showFormPerson()
            }
        </div>
    )
}

export default viewFormPersonInCharge;