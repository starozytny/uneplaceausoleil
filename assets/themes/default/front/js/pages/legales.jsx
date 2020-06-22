import '../../css/pages/legales.scss';
import React, {Components} from 'react';
import ReactDOM from 'react-dom';
import FormRgpd from './components/legales/FormRgpd';

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