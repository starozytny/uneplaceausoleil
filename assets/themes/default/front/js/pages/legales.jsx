import '../../css/pages/legales.scss';
import React, {Components} from 'react';
import ReactDOM from 'react-dom';
import FormRgpd from './components/legales/FormRgpd';
import {ActionCookies} from '../components/composants/Cookies';

cookies();
formulaire('form-rgpd');

function formulaire(elem){
    let form = document.querySelector('#' + elem);

    if(form !== null){
        ReactDOM.render(
            <FormRgpd url={form.dataset.url} />,
            form
        );
    }
}



function cookies(){
    renderBtn('analytics', document.getElementById('cookies-analytics-actions'));
    renderBtn('interne', document.getElementById('cookies-interne-actions'));

    function renderBtn(type, elem){
        if(elem !== null){
            ReactDOM.render(
                <ActionCookies type={type}/>,
                elem
            );
        }
    }
}