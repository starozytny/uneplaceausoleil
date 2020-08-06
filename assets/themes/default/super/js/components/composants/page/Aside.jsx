import React, {Component} from 'react';

export class Aside extends Component {
    constructor (props) {
        super(props)

        this.state = {
            active: ''
        }

        this.handleClose = this.handleClose.bind(this)
    }

    handleUpdate = (e) => { this.setState({active: 'active'}) }
    handleClose = (e) => { this.setState({active: ''}) }

    render () {
        const {title, content} = this.props
        const {active} = this.state
 
        return <div className={"aside " + active}>
            <div className="aside-overlay" onClick={this.handleClose}></div>
            <div className="aside-content">
                <div className="aside-title">
                    <span>{title}</span>
                    <span className="icon-cancel" onClick={this.handleClose}></span>
                </div>
                {content}
            </div>
        </div>
    }
}