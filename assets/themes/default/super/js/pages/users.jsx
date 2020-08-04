import '../../css/pages/users.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Users} from './composants/Users';

let users = document.getElementById("users");
if(users){
    ReactDOM.render(
        <Users users={users.dataset.users} />,
        users
    )
}