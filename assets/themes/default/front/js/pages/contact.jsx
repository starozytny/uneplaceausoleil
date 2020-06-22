import '../../css/pages/contact.scss';
import React, {Components} from 'react';
import ReactDOM from 'react-dom';
import FormContact from './components/contact/FormContact';

formulaire('form-contact');

function formulaire(elem){
    let form = document.querySelector('#' + elem);

    if(form !== null){
        ReactDOM.render(
            <FormContact url={form.dataset.url} />,
            form
        );
    }
}