import '../../css/pages/security.scss';
import Routing from '../../../../../../public/bundles/fosjsrouting/js/router.min.js';
import React, {Components} from 'react';
import ReactDOM from 'react-dom';
import FormLost from './components/security/FormLost';
import FormReinit from './components/security/FormReinit';

formulaireLost();
formulaireReinit();

function formulaireLost(){
    let form = document.querySelector('#form-lost');

    if(form !== null){
        ReactDOM.render(
            <FormLost url={Routing.generate('app_password_lost')} />,
            form
        );
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