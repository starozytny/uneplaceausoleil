import React from 'react';

export function Input({type, identifiant, value, onChange, error, children, placeholder}) {
    return (
        <div className={'form-group' + (error ? " form-group-error" : "")}>
            <label htmlFor={identifiant}>{children}</label>
            <input type={type} name={identifiant} id={identifiant} placeholder={placeholder} value={value} onChange={onChange}/>
            <div className="error">{error ? error : null}</div>
        </div>
    );
}

export function TextArea({name, identifiant, onChange, error, children}) {
    return (
        <div className={'form-group' + (error ? " form-group-error" : "")}>
            <label htmlFor={identifiant}>{children}</label>
            <textarea name={identifiant} id={identifiant} value={value} onChange={onChange}/>
            <div className="error">{error ? error : null}</div>
        </div>
    );
}

export function Select({identifiant, value, onChange, error, children, items}) {
    let choices = items.map((item) => 
        <option key={item.value} value={item.value}>{item.libelle}</option>
    )
    return (
        <div className={'form-group' + (error ? " form-group-error" : "")}>
            <label>
                {children}
                <select value={value} id={identifiant} name={identifiant} onChange={onChange}>
                    {choices}
                </select>
            </label>
            <div className="error">{error ? error : null}</div>            
        </div>
    );
}