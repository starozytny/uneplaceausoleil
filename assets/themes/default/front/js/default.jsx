import '../css/default.scss';
import React, {Components} from 'react';
import ReactDOM from 'react-dom';
import {BulleCookies} from './components/composants/Cookies';

cookies();

function cookies(){
    let cookies = document.getElementById('param-cookies-container');
    ReactDOM.render(
        <BulleCookies urlPolitique={cookies.dataset.urlPolitique} urlGestion={cookies.dataset.urlGestion}/>,
        cookies
    );
}