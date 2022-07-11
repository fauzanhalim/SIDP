import React from 'react';

const textarea = (props) => {

    return(
        <div>
            <label 
                htmlFor={props.name}
                style={props.handleError(props.name, 'label')}
            >{props.label}</label>
            <textarea 
                id={props.name} 
                rows={props.row} 
                cols={props.col}
                name={props.name} 
                style={{resize:"none"}}
                placeholder={props.placeholder}
                readOnly={props.readonly ? true : false}
                type={props.type ? props.type : 'input'}
                ref={props.register({required: props.required})}
                // key={`${Math.floor((Math.random() * 1000))}-min`}
                onChange={e => props.onChange ? props.onChange(e) : null}
                className={`form-control ${props.handleError(props.name, 'input')}`}
            />
            {props.messageError(props.name, props.label)}
        </div>
        
    )
}

export default textarea;