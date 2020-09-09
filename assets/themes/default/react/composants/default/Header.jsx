import React, {Component} from 'react';
import Routing from '../../../../../../public/bundles/fosjsrouting/js/router.min.js';

export class Header extends Component {
    render () {
        const {username, avatar, onOpenMenu} = this.props;

        return <header>
            <div className="header-user">
                <div className="header-user-username">{username}</div>
                <a href={Routing.generate('app_logout')} title="Se déconnecter"><span className="icon-logout"></span></a>
            </div>
            <span className="icon-menu" onClick={onOpenMenu}></span>
        </header>
    }
}