import '../css/default.scss';
import React, {Components} from 'react';
import ReactDOM from 'react-dom';
// import {BulleCookies} from './components/composants/Cookies';
const routes = require('../../../../../public/js/fos_js_routes.json');
import Routing from '../../../../../public/bundles/fosjsrouting/js/router.min.js';

Routing.setRoutingData(routes);

// cookies();

// function cookies(){
//     let cookies = document.getElementById('param-cookies-container');
//     ReactDOM.render(
//         <BulleCookies urlPolitique={Routing.generate('app_politique')} urlGestion={Routing.generate('app_cookies')}/>,
//         cookies
//     );
// }