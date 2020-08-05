import React, {Component} from 'react';
import {Page} from '../../components/composants/default/Page';

export class UsersList extends Component {
    render () {
        const {users} = this.props

        let items = users.map((elem, index) => {
            return <div className="item-user" key={elem.id}>
                <div className="item-user-roles"><div className={"user-badge user-badge-" + elem.highRoleCode}>{elem.highRole}</div></div>
                <div className="item-user-avatar">
                    <img src={"../../admin/avatar/" + elem.avatar} alt={"avatar de " + elem.username} />
                </div>
                <div className="item-user-username">{elem.username}</div>
                <div className="item-user-email">{elem.email}</div>   
                <div className="item-user-status">
                    {elem.isNew ? <div className="user-new"><span className="icon-certificate"></span></div> : null}    
                </div>             
            </div>
        })

        return <> {items} </>
    }
}

export class Users extends Component {
    constructor (props) {
        super(props)

        let users = JSON.parse(JSON.parse(props.users));
        let usersList = users.slice(0, 20);

        this.state = {
            users: users,
            usersList: usersList,
        }

        this.updateList = this.updateList.bind(this)
    }

    updateList = (usersList) => { this.setState({ usersList: usersList })  }

    render () {
        const {users, usersList} = this.state;

        let content = <div className="liste liste-user">
            <UsersList users={usersList} />
        </div>

        return <>
            <Page content={content} havePagination="true" taille={users.length} itemsPagination={users} perPage="20" onUpdate={this.updateList}/>
        </>
    }
}