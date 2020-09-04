import '../../css/pages/rgpd.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Rgpd} from './composants/rgpd/Rgpd';


let el = document.getElementById("rgpd");
if(el){
    ReactDOM.render(
        <Rgpd demandes={el.dataset.demandes} />,
        el
    )
}