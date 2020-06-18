import React, {Components} from 'react';

function Input({type, name, id, value, onChange, error, children}) {
    return (
        <div className={'form-group' + (error ? " form-group-error" : "")}>
            <label htmlFor={id}>{children}</label>
            <input type={type} name={name} id={id} value={value} onChange={onChange}/>
            <div className="error">{error ? error : null}</div>
        </div>
    );
}

export default Input;