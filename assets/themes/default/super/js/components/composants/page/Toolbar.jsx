import React, {Component} from 'react';
import {Search} from './Search';

export class Toolbar extends Component {
    render () {
        const {haveSearch, onSearch} = this.props

        return <>
            <div className="toolbar">
                <div className="toolbar-left"></div>
                <div className="toolbar-right">
                    {haveSearch ? <div className="toolbar-item"> <Search onSearch={onSearch} /> </div> : null}
                </div>
            </div>
        </>
    }
}