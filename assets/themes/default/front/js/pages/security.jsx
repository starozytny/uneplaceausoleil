import '../../css/pages/security.scss';
import React, {Components} from 'react';
import ReactDOM from 'react-dom';
import FormLost from './components/security/FormLost';

formulaireLost();

function formulaireLost(){

    let url = document.querySelector('#form-lost').dataset.url;

    ReactDOM.render(
        <FormLost url={url} />,
        document.getElementById('form-lost')
    );
}