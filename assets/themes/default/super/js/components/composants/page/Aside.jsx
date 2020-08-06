import React, {Component} from 'react';

export class Aside extends Component {
    render () {
        const {title, content} = this.props

        return <div className="aside">
            <div className="aside-title">{title}</div>
            {content}
        </div>
    }
}