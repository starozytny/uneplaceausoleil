import React, {Component} from 'react';
import {Search} from './Search';

export class Toolbar extends Component {
    render () {
        const {haveSearch, onSearch, haveAdd, onAdd} = this.props

        return <>
            <div className="toolbar">
                <div className="toolbar-left">
                {haveAdd ? <div className="toolbar-item"> <button className="btn btn-primary" onClick={onAdd}>Ajouter</button> </div> : null}
                </div>
                <div className="toolbar-right">
                    {haveSearch ? <div className="toolbar-item"> <Search onSearch={onSearch} /> </div> : null}
                </div>
            </div>
        </>
    }
}