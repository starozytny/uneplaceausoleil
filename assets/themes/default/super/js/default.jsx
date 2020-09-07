import '../css/default.scss';
import toastr from 'toastr';

const routes = require('../../../../../public/js/fos_js_routes.json');
import Routing from '../../../../../public/bundles/fosjsrouting/js/router.min.js';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Default} from './components/composants/default/Default';

Routing.setRoutingData(routes);

let def = document.getElementById("default");
if(def){
    ReactDOM.render(
        <Default title={def.dataset.title} menu={def.dataset.menu} username={def.dataset.username} avatar={def.dataset.avatar} />, def
    )
}

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }