import '../../css/pages/security.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormLost from './components/security/FormLost';
import FormReinit from './components/security/FormReinit';

formulaireLost();
formulaireReinit();

function formulaireLost(){
    let form = document.querySelector('#form-lost');

    if(form !== null){
        ReactDOM.render(<FormLost />, form);
    }
}

function formulaireReinit(){
    let form = document.querySelector('#form-reinit');

    if(form !== null){
        ReactDOM.render(
            <FormReinit url={form.dataset.url} />,
            form
        );
    }
}