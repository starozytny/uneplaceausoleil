import React, {Component} from 'react';
import {Alert} from './Alert';

export function Formulaire({onSubmit, inputs, success, error, btn, children}) {
    return ( 
        <form onSubmit={onSubmit}> 
            <div>
                <Alert type="success" message={success} active="active" />
                <Alert type="danger" message={error} active="active" />
            </div>
            <div>
                {inputs}
            </div>
            <div>
                {children}
            </div>
            <div>
                <button type="submit" className="btn btn-primary">{btn}</button>
            </div>
        </form> 
    );
}