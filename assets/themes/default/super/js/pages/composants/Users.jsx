import React, {Component} from 'react';
import toastr from 'toastr';
import axios from 'axios/dist/axios';
import Routing from '../../../../../../../public/bundles/fosjsrouting/js/router.min.js';
import Loader from '../../../../react/functions/loader';
import Validateur from '../../../../react/functions/validateur';
import {Page} from '../../components/composants/page/Page';
import {Aside} from '../../components/composants/page/Aside';
import {Input, Checkbox} from '../../../../react/composants/Fields';
import {Alert} from '../../../../react/composants/Alert';

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

function updateInArray(array, user){
    let arr = []
    array.map(elem => {
        if(elem.id == user.id){ elem = user }
        arr.push(elem)
    })
    return arr;
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
        this.handleUpdateUser = this.handleUpdateUser.bind(this)
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

    handleUpdateUser = (user) => { 
        this.refs.asideuser.handleUpdate(user)
        this.refs.aside.handleUpdate(user.username) 

        
        this.setState({
            usersList: updateInArray(this.state.usersList, user), 
            users: updateInArray(this.state.users, user),
            usersImmuable: updateInArray(this.state.usersImmuable, user)
        })
    }

    render () {
        const {users, usersImmuable, usersList, tailleList} = this.state;

        let content = <div className="liste liste-user">
            <UsersList users={usersList} onOpenAside={this.handleOpenAside} />
        </div>

        let asideContent = <AsideUser users={usersImmuable} onUpdate={this.handleUpdateUser} ref="asideuser" />

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
            error: '',
            username: {value: '', error: ''},
            email: {value: '', error: ''},
            roles: {value: '', error:''}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleUpdate = (user) => {
        this.setState({
            user: user,
            users: this.props.users,
            username: {value: user.username, error:''},
            email: {value: user.email, error:''},
            roles: {value: user.roles, error:''},
        })
        document.getElementById("username").focus();
    }

    handleChange = (e) => { 
        let name = e.currentTarget.name;
        let value = e.currentTarget.value;

        const {roles} = this.state
        if(name === "roles"){
            value = (e.currentTarget.checked) ? [...roles.value, ...[value]] :  roles.value.filter(v => v != value)
        }        

        this.setState({[name]: {value: value}}) 
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const {user, users, username, email, roles} = this.state

        let validate = Validateur.validateur([
            {type: "text", id: 'username', value: username.value},
            {type: "email", id: 'email', value: email.value},
            {type: "array", id: 'roles', value: roles.value}
        ]);

        if(users.filter(v => v.username.toLowerCase() == username.value.toLowerCase() && v.id != user.id).length != 0){
            validate.code = false;
            validate.errors = {...validate.errors, ...{username: {value: username.value, error: 'Ce nom d\'utilisateur est déjà pris.'}}};
        }

        if(!validate.code){
            this.setState(validate.errors);
        }else{
            Loader.loader(true)
            
            let fd = new FormData();
            fd.append('data', JSON.stringify(this.state));

            let self = this
            axios({ method: 'post', url: Routing.generate('super_users_user_update', {'user': user.id}), data: fd }).then(function (response) {
                let data = response.data; let code = data.code; Loader.loader(false)

                if(code === 1){
                    user.username = username.value;
                    user.email = email.value;
                    user.roles = roles.value;
                    user.highRoleCode = data.highRoleCode;
                    user.highRole = data.highRole;

                    self.setState({users: updateInArray(self.state.users, user),})
                    self.props.onUpdate(user)

                    toastr.info('Mise à jour effectuée.')
                }else{
                    self.setState({error: data.message})
                }
            });
        }

    }

    render () {
        const {user, error, username, email, roles} = this.state

        let rolesItems = [
            { 'value': 1, 'role': 'ROLE_SUPER_ADMIN', 'label': 'Super admin', 'id': 'superamdin', 'checked': false },
            { 'value': 2, 'role': 'ROLE_ADMIN', 'label': 'Admin', 'id': 'admin', 'checked': false },
            { 'value': 0, 'role': 'ROLE_USER',  'label': 'Utilisateur', 'id': 'utilisateur', 'checked': false },
            
        ]

        if(user != undefined){
            rolesItems.map(el => {
                roles.value.map(elem => {
                    if (elem == el.role){ el.checked = true }
                })
            })
        }

        return <>
            {user === undefined ? null : <div className="aside-user-informations">
                <div>Créé le {user.createAtString}</div>
                <div>Renouvellement du mot de passe le {user.renouvTimeString}</div>
            </div>}
            
            <form onSubmit={this.handleSubmit}>
                <span className="form-title">Modification</span>
                {error != '' ? <Alert type="danger" message={error} active="true" /> : null}
                <div className="line line-2">
                    <Input identifiant="username" valeur={username} onChange={this.handleChange}>Nom d'utilisateur</Input>
                    <Input type="email" identifiant="email" valeur={email} onChange={this.handleChange}>Adresse e-mail</Input>
                </div>
                <div className="line">
                    <Checkbox items={rolesItems} name="roles" valeur={roles} onChange={this.handleChange}>Roles</Checkbox>
                </div>
                <div className="form-button">
                    <button type="submit" className="btn btn-primary"><span>Mettre à jour</span></button>
                </div>
            </form>
        </>
    }
}