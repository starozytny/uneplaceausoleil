import React, {Component} from 'react';
import Routing from '../../../../../../../../public/bundles/fosjsrouting/js/router.min.js';

export class Menu extends Component {
    constructor(props){
        super(props);

        this.state = {
            menu: JSON.parse(props.menu),
            active: 'dashboard'
        }
    }

    componentDidMount () {
        let tab = location.pathname.split("/");
        tab = tab.filter(elem => elem != "");

        tab.forEach(element => {
            this.state.menu.forEach(el => {
                if(element == el.name){
                    this.setState({active: element})
                }
            })
            
        });
    }

    render () {
        const {menuOpened, onCloseMenu} = this.props;
        const {menu, active} = this.state;

        let menuItems = menu.map((elem, index) => {
            return <a href={elem.path} className={(active == elem.name) ? "nav-item active" : "nav-item"} key={index}>
                <span className={"icon-" + elem.icon}></span>
                <span>{elem.label}</span>
            </a>
        })

        return <nav className={menuOpened}>
            <div className="nav-header">
                <a href={Routing.generate('super_dashboard')}><span>SuperAdmin</span></a>
                <span className="icon-cancel" onClick={onCloseMenu}></span>
            </div>
            <div className="nav-body">
                <div className="nav-items">
                    {menuItems}
                </div>
            </div>
        </nav>
    }
}