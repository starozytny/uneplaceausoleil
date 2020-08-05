import React, {Component} from 'react';
import {Input} from '../../../../../react/composants/Fields';

export class Search extends Component {
    constructor (props){
        super(props)

        this.state = {
            search: {value: '', error: ''}
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        let value = e.currentTarget.value
        this.setState({[e.currentTarget.name]: {value: value}})
        this.props.onSearch(value);
    }

    render () {
        const {search} = this.state;
        return <>
            <Input type="search" identifiant="search" value={search.value} error={search.error} onChange={this.handleChange} placeholder="Recherche" />
        </>
    }
}