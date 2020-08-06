import React from 'react';

export function Input({type="text", identifiant, valeur, onChange, children, placeholder}) {
    return (
        <div className={'form-group' + (valeur.error ? " form-group-error" : "")}>
            <label htmlFor={identifiant}>{children}</label>
            <input type={type} name={identifiant} id={identifiant} placeholder={placeholder} value={valeur.value} onChange={onChange}/>
            <div className="error">{valeur.error ? <>{valeur.error}<span className='icon-warning'></span></> : null}</div>
        </div>
    );
}

export function Checkbox({items, name, valeur, onChange, children}) {

    let itemsInputs = items.map(elem => {
        return <label htmlFor={elem.id} key={elem.value}>
            {elem.label}
            <input type="checkbox" name={name} id={elem.id} value={elem.role} checked={elem.checked ? 'checked' : ''} onChange={onChange}/>
        </label>
    })

    return (
        <div className={'form-group form-group-checbox' + (valeur.error ? " form-group-error" : "")}>
            <label>{children}</label>
            {itemsInputs}
            <div className="error">{valeur.error ? <>{valeur.error}<span className='icon-warning'></span></> : null}</div>
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