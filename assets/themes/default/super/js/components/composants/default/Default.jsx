import React, {Component} from 'react';
import {Menu} from './Menu';

export class Default extends Component {
    render () {
        const {menu} = this.props;

        return <>
            <Menu menu={menu}/>
        </>
    }
}