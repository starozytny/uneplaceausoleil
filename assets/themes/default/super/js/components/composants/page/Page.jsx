import React, {Component} from 'react';
import {Pagination} from '../../../../../react/composants/Pagination';
import {Toolbar} from './Toolbar.jsx';

export class Page extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const {content, 
            havePagination, perPage, taille, itemsPagination, 
            haveSearch, onSearch,
            haveAdd, onAdd
        } = this.props

        return <>
            <Toolbar haveSearch={haveSearch} onSearch={onSearch} haveAdd={haveAdd} onAdd={onAdd}/>
            {content}
            {havePagination ? <Pagination perPage={perPage} taille={taille} items={itemsPagination} onUpdate={(items) => this.props.onUpdate(items)}/> : null}
        </>
    }
}