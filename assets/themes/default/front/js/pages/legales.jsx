import '../../css/pages/legales.scss';
import React, {Components} from 'react';
import ReactDOM from 'react-dom';
import FormRgpd from './components/legales/FormRgpd';
import {ActionCookies} from '../components/composants/Cookies';

cookies();
formulaire('form-rgpd');

function formulaire(elem){
    let form = document.querySelector('#' + elem);
    let urlPolitique = document.querySelector('#urlPolitique').dataset.url;

    if(form !== null){
        ReactDOM.render(
            <FormRgpd url={form.dataset.url} >
                Les informations recueillies à partir de ce formulaire sont 
                transmises au service de communication de Logilink pour traiter vos demandes.
                <br />
                Pour plus d'informations, veuillez consulter <a href={urlPolitique}>notre politique de confidentialité</a>.
            </FormRgpd>,
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