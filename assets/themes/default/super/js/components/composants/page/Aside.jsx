import React, {Component} from 'react';

export class Aside extends Component {
    constructor (props) {
        super(props)

        this.state = {
            active: ''
        }

        this.handleClose = this.handleClose.bind(this)
    }

    handleUpdate = (title) => { this.setState({active: 'active', title: title}) }
    handleClose = (e) => { this.setState({active: ''}) }

    render () {
        const {content} = this.props
        const {title, active} = this.state
 
        return <div className={"aside " + active}>
            <div className="aside-overlay" onClick={this.handleClose}></div>
            <div className="aside-content">
                <div className="aside-title">
                    <span className="title">{title}</span>
                    <span className="icon-cancel" onClick={this.handleClose}></span>
                </div>
                {content}
            </div>
        </div>
    }
}