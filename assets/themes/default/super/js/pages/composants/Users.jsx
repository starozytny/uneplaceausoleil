import React, {Component} from 'react';

export class Users extends Component {
    constructor (props) {
        super(props)

        this.state = {
            users: JSON.parse(JSON.parse(props.users))
        }
    }

    render () {
        const {users} = this.state;

        console.log(users)

        let items = users.map(elem => {
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

        return <>
            <div className="liste liste-user">
                {items}
            </div>
        </>
    }
}