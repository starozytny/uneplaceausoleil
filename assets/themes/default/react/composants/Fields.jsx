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
        return <div className={"checkbox-item " + (elem.checked ? 'checked' : '')} key={elem.value}>
            <label htmlFor={elem.id}>
                {elem.label}
                <input type="checkbox" name={name} id={elem.id} value={elem.role} checked={elem.checked ? 'checked' : ''} onChange={onChange}/>
            </label>
        </div>
    })

    return (
        <div className={'form-group form-group-checbox' + (valeur.error ? " form-group-error" : "")}>
            <label>{children}</label>
            <div className="checkbox-items">
                {itemsInputs}
            </div>
            <div className="error">{valeur.error ? <>{valeur.error}<span className='icon-warning'></span></> : null}</div>
        </div>
    );
}

export function TextArea({identifiant, valeur, onChange, children}) {
    return (
        <div className={'form-group' + (valeur.error ? " form-group-error" : "")}>
            <label htmlFor={identifiant}>{children}</label>
            <textarea name={identifiant} id={identifiant} value={valeur.value} onChange={onChange}/>
            <div className="error">{valeur.error ? valeur.error : null}</div>
        </div>
    );
}

export function Select({identifiant, valeur, onChange, children, items}) {
    let choices = items.map((item) => 
        <option key={item.value} value={item.value}>{item.libelle}</option>
    )
    return (
        <div className={'form-group' + (valeur.error ? " form-group-error" : "")}>
            <label>
                {children}
                <select value={valeur.value} id={identifiant} name={identifiant} onChange={onChange}>
                    {choices}
                </select>
            </label>
            <div className="error">{valeur.error ? valeur.error : null}</div>            
        </div>
    );
}