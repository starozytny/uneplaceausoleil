import React, {Component} from 'react';

export class Header extends Component {
    render () {
        const {username, avatar, onOpenMenu} = this.props;

        return <header>
            <div className="header-user">
                <span className="header-user-username">{username}</span>
            </div>
            <span className="icon-menu" onClick={onOpenMenu}></span>
        </header>
    }
}