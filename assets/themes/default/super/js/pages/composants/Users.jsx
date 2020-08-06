import React, {Component} from 'react';
import {Page} from '../../components/composants/page/Page';
import {Aside} from '../../components/composants/page/Aside';

export class UsersList extends Component {
    render () {
        const {users, onOpenAside} = this.props

        let items = users.map(elem => {
            return <div className="item-user" key={elem.id}>
                <div className="item-user-actions">
                    <div className="user-selector">
                        <label><input type="checkbox" name="user-selector" /></label>
                    </div>
                    <div className="user-actions">
                        <span className="icon-more"></span>
                        <div className="user-actions-drop">
                            <div className="drop-items">
                                <span className="drop-item" onClick={onOpenAside}>Modifier</span>
                                <span className="drop-item">Supprimer</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item-user-avatar">
                    <img src={"../../admin/avatar/" + elem.avatar} alt={"avatar de " + elem.username} />
                </div>
                <div className="item-user-username">{elem.username}</div>
                <div className="item-user-email">{elem.email}</div>   
                {elem.highRoleCode != 0 ? <div className="item-user-roles"><div className={"user-badge user-badge-" + elem.highRoleCode}>{elem.highRole}</div></div> : null}
                {elem.isNew ? <div className="item-user-status"><div className="user-new"><span className="icon-certificate"></span></div></div> : null}          
            </div>
        })

        return <> {items} </>
    }
}

export class Users extends Component {
    constructor (props) {
        super(props)

        let users = JSON.parse(JSON.parse(props.users));
        let usersList = users.slice(0, 12);

        this.state = {
            usersImmuable: users,
            users: users,
            usersList: usersList,
            tailleList: users.length,
        }

        this.handleUpdateList = this.handleUpdateList.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleOpenAside = this.handleOpenAside.bind(this)
    }

    handleUpdateList = (usersList) => { this.setState({ usersList: usersList })  }
    handleSearch = (value) => { 
        let newItems = this.state.usersImmuable.filter(function(v) {
            if(v.username.toLowerCase().includes(value) || v.email.toLowerCase().includes(value)){ return v; }
        })
        let newList = newItems.slice(0, 12)
        this.setState({ usersList: newList, users: newItems, tailleList: newItems.length })  
    }

    handleOpenAside = (e) => { this.refs.aside.handleUpdate() }

    render () {
        const {users, usersList, tailleList} = this.state;

        let asideContent = <div>Hello</div>

        let content = <div className="liste liste-user">
            <UsersList users={usersList} onOpenAside={this.handleOpenAside} />
        </div>

        return <>
            <Page content={content} 
                  havePagination="true" taille={tailleList} itemsPagination={users} perPage="12" onUpdate={this.handleUpdateList}
                  haveSearch="true" onSearch={this.handleSearch}
                  />
            <Aside content={asideContent} title="Détails" ref="aside"/>
        </>
    }
}