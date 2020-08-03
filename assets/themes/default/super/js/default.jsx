import '../css/default.scss';

const routes = require('../../../../../public/js/fos_js_routes.json');
import Routing from '../../../../../public/bundles/fosjsrouting/js/router.min.js';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Default} from './components/composants/default/Default';

Routing.setRoutingData(routes);

let def = document.getElementById("default");
if(def){
    ReactDOM.render(
        <Default menu={def.dataset.menu}/>, def
    )
}