import '../../css/pages/contact.scss';
import React, {Components} from 'react';
import ReactDOM from 'react-dom';
import FormContact from './components/contact/FormContact';

formulaire('form-contact');

function formulaire(elem){
    let form = document.querySelector('#' + elem);
    let urlPolitique = document.querySelector('#urlPolitique').dataset.url;

    if(form !== null){
        ReactDOM.render(
            <FormContact url={form.dataset.url}>
                Les informations recueillies à partir de ce formulaire sont 
                transmises au service de communication de Logilink pour traiter vos demandes.
                <br />
                Pour plus d'informations, veuillez consulter <a href={urlPolitique}>notre politique de confidentialité</a>.
            </FormContact>,
            form
        );
    }
}