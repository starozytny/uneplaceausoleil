import React, {Component} from 'react';
import {Pagination} from '../../../../../react/composants/Pagination';

export class Page extends Component {
    constructor (props) {
        super(props)
    }


    render () {
        const {content, havePagination, perPage, taille, itemsPagination} = this.props

        return <>
            {content}
            {havePagination ? <Pagination perPage={perPage} taille={taille} items={itemsPagination} onUpdate={(items) => this.props.onUpdate(items)}/> : null}
        </>
    }
}