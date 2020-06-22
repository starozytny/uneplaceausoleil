import React, {Components} from 'react';

export function Input({type, name, id, value, onChange, error, children}) {
    return (
        <div className={'form-group' + (error ? " form-group-error" : "")}>
            <label htmlFor={id}>{children}</label>
            <input type={type} name={name} id={id} value={value} onChange={onChange}/>
            <div className="error">{error ? error : null}</div>
        </div>
    );
}

export function TextArea({name, id, value, onChange, error, children}) {
    return (
        <div className={'form-group' + (error ? " form-group-error" : "")}>
            <label htmlFor={id}>{children}</label>
            <textarea name={name} id={id} value={value} onChange={onChange}/>
            <div className="error">{error ? error : null}</div>
        </div>
    );
}

export function Select({name, id, value, onChange, error, children, items}) {

    let test = items.map((item) => 
        <option value={item.value}>{item.libelle}</option>
    )


    return (
        <div className={'form-group' + (error ? " form-group-error" : "")}>
            <label>
                {children}
                <select value={value} id={id} name={name} onChange={onChange}>
                    {test}
                </select>
            </label>
            <div className="error">{error ? error : null}</div>            
        </div>
    );
}