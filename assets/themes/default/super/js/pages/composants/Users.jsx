import React, {Component} from 'react';
import toastr from 'toastr';
import axios from 'axios/dist/axios';
// import Routing from '../../../../../../../../public/bundles/fosjsrouting/js/router.min.js';
import Loader from '../../../../react/functions/loader';
import {Page} from '../../components/composants/page/Page';
import {Aside} from '../../components/composants/page/Aside';
import {Input} from '../../../../react/composants/Fields';

export class UsersList extends Component {
    constructor (props) {
        super(props)
        
        this.handleOpenAside = this.handleOpenAside.bind(this)
    }

    handleOpenAside = (e) => {
        this.props.onOpenAside(e.currentTarget.dataset.id)
    }

    render () {
        const {users} = this.props

        let items = users.map(elem => {
            return <div className="item-user" key={elem.id}>
                <div className="item-user-actions">
                    <div className="user-selector">
                        {elem.highRoleCode != 1 ? <label><input type="checkbox" name="user-selector" /></label> : null}
                    </div>
                    <div className="user-actions">
                        <span className="icon-more"></span>
                        <div className="user-actions-drop">
                            <div className="drop-items">
                                <span className="drop-item" onClick={this.handleOpenAside} data-id={elem.id}>Modifier</span>
                                {elem.highRoleCode != 1 ? <span className="drop-item">Supprimer</span> : null}
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

    handleOpenAside = (id) => { 
        let user = this.state.usersImmuable.filter(v => v.id == id)
        if(user.length != 0){
            this.refs.asideuser.handleUpdate(user[0])
            this.refs.aside.handleUpdate(user[0].username) 
        }else{
            toastr.error('Cet utilisateur n\'existe pas.')
        }
    }

    render () {
        const {users, usersList, tailleList} = this.state;

        let content = <div className="liste liste-user">
            <UsersList users={usersList} onOpenAside={this.handleOpenAside} />
        </div>

        let asideContent = <AsideUser ref="asideuser" />

        return <>
            <Page content={content} 
                  havePagination="true" taille={tailleList} itemsPagination={users} perPage="12" onUpdate={this.handleUpdateList}
                  haveSearch="true" onSearch={this.handleSearch}
                  />
            <Aside content={asideContent} ref="aside"/>
        </>
    }
}

export class AsideUser extends Component {
    constructor (props) {
        super(props)

        this.state = {
            username: {value: '', error: ''},
            email: {value: '', error: ''}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleUpdate = (user) => {
        this.setState({
            user: user,
            username: {value: user.username, error:''},
            email: {value: user.email, error:''},
        })
        document.getElementById("username").focus();
    }

    handleChange = (e) => { this.setState({[e.currentTarget.name]: {value: e.currentTarget.value}}) }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render () {
        const {user, username, email} = this.state

        return <>
            {user === undefined ? null : <div className="aside-user-informations">
                <div>Créé le {user.createAtString}</div>
                <div>Renouvellement du mot de passe le {user.renouvTimeString}</div>
            </div>}
            
            <form onSubmit={this.handleSubmit}>
                <span className="form-title">Modification</span>
                <div className="line line-2">
                    <Input identifiant="username" valeur={username} onChange={this.handleChange}>Nom d'utilisateur</Input>
                    <Input type="email" identifiant="email" valeur={email} onChange={this.handleChange}>Adresse e-mail</Input>
                </div>
                <div className="form-button">
                    <button type="submit" className="btn btn-primary">Mettre à jour</button>
                </div>
            </form>
        </>
    }
}