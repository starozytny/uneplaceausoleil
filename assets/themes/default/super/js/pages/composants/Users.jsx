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
import {Drop} from '../../../../react/composants/Drop';
import Swal from 'sweetalert2'

export class UsersList extends Component {
    constructor (props) {
        super(props)
        
        this.handleOpenAside = this.handleOpenAside.bind(this)
        this.handleConvert = this.handleConvert.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleOpenAside = (e) => {
        this.props.onOpenAside(e.currentTarget.dataset.id)
    }

    handleConvert = (e) => {
        this.props.onConvertIsNew(e.currentTarget.dataset.id)
    }

    handleDelete = (e) => {
        this.props.onDelete(e.currentTarget.dataset.id)
    }

    render () {
        const {users} = this.props

        let items = users.map(elem => {
            return <div className="item-user" key={elem.id}>
                <div className="item-user-actions">
                    <div className="user-selector">
                        {/* {elem.highRoleCode != 1 ? <label><input type="checkbox" name="user-selector" /></label> : null} */}
                    </div>
                    <div className="user-actions">
                        <span className="icon-more"></span>
                        <div className="user-actions-drop">
                            <div className="drop-items">
                                <span className="drop-item" onClick={this.handleOpenAside} data-id={elem.id}>Modifier</span>
                                {elem.highRoleCode != 1 ? <span className="drop-item" onClick={this.handleDelete} data-id={elem.id}>Supprimer</span> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item-user-avatar">
                    <img src={"../../uploads/" + elem.avatar} alt={"avatar de " + elem.username} />
                </div>
                <div className="item-user-username">{elem.username}</div>
                <div className="item-user-email">{elem.email}</div>   
                {elem.highRoleCode != 0 ? <div className="item-user-roles"><div className={"user-badge user-badge-" + elem.highRoleCode}>{elem.highRole}</div></div> : null}
                {elem.isNew ? <div className="item-user-status"><div className="user-new" onClick={this.handleConvert} data-id={elem.id}><span className="icon-certificate"></span></div></div> : null}          
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

function deleteInArray(array, user){
    let arr = []
    array.map(elem => {
        if(elem.id != user.id){ arr.push(elem) }
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
        this.handleConvertIsNew = this.handleConvertIsNew.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
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

    handleConvertIsNew = (id) => {
        let self = this
        axios({ method: 'post', url: Routing.generate('super_users_user_convert_is_new', {'user': id}) }).then(function (response) {
            let data = response.data; let code = data.code; Loader.loader(false)

            if(code === 1){
                let user = self.state.usersImmuable.filter(v => v.id == id)
                user[0].isNew = false;

                self.setState({users: updateInArray(self.state.users, user[0])})
                toastr.info('Mise à jour effectuée.')
            }else{
                toastr.error(data.message)
            }
        });
    }

    handleDelete = (id) => {
        Swal.fire({
            title: 'Etes-vous sûr ?',
            text: "La suppression est définitive.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, je confirme',
            cancelButtonText: 'Annuler'
          }).then((result) => {
            if (result.value) {

                let self = this
                axios({ method: 'post', url: Routing.generate('super_users_user_delete', {'user': id}) }).then(function (response) {
                    let data = response.data; let code = data.code; Loader.loader(false)

                    if(code === 1){
                        let user = self.state.usersImmuable.filter(v => v.id == id)
                        self.setState({
                            usersList: deleteInArray(self.state.usersList, user[0]), 
                            users: deleteInArray(self.state.users, user[0]),
                            usersImmuable: deleteInArray(self.state.usersImmuable, user[0]),
                            tailleList: parseInt(self.state.tailleList) - 1,
                        })
                        toastr.info('Suppression réussie.')
                    }else{
                        toastr.error(data.message)
                    }
                });
            }
          })
    }

    handleAdd = () => {
        this.refs.asideuser.handleOpenAdd()
        this.refs.aside.handleUpdate("Ajouter un utilisateur") 
    }

    render () {
        const {users, usersImmuable, usersList, tailleList} = this.state;

        let content = <div className="liste liste-user">
            <UsersList users={usersList} onOpenAside={this.handleOpenAside} onConvertIsNew={this.handleConvertIsNew} onDelete={this.handleDelete} />
        </div>

        let asideContent = <AsideUser users={usersImmuable} onUpdate={this.handleUpdateUser} ref="asideuser" />

        return <>
            <Page content={content} 
                  havePagination="true" taille={tailleList} itemsPagination={users} perPage="12" onUpdate={this.handleUpdateList}
                  haveSearch="true" onSearch={this.handleSearch}
                  haveAdd="true" onAdd={this.handleAdd}
                  haveExport="true" urlExportExcel={Routing.generate('super_users_export')} nameExport="utilisateurs"
                  />
            <Aside content={asideContent} ref="aside"/>
        </>
    }
}

export class AsideUser extends Component {
    constructor (props) {
        super(props)

        this.state = {
            type: 'edit',
            error: '',
            username: {value: '', error: ''},
            email: {value: '', error: ''},
            roles: {value: [], error:''},
            password: {value: '', error: ''},
            password2: {value: '', error: ''},
            file: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleGetFile = this.handleGetFile.bind(this)

        this.handleOpenAdd = this.handleOpenAdd.bind(this)
    }

    handleUpdate = (user) => {
        this.setState({
            type: 'edit',
            user: user,
            users: this.props.users,
            username: {value: user.username, error:''},
            email: {value: user.email, error:''},
            roles: {value: user.roles, error:''},
        })
        document.getElementById("username").focus();
    }

    handleOpenAdd = () => { this.setState({
        type: 'add',
        user: undefined,
        users: this.props.users,
        username: {value: "", error:''},
        email: {value: "", error:''},
        roles: {value: [], error:''},
        password: {value: '', error: ''},
        password2: {value: '', error: ''},
    }) }

    handleChange = (e) => { 
        let name = e.currentTarget.name;
        let value = e.currentTarget.value;

        const {roles} = this.state
        if(name === "roles"){
            value = (e.currentTarget.checked) ? [...roles.value, ...[value]] :  roles.value.filter(v => v != value)
        }        

        this.setState({[name]: {value: value}}) 
    }

    handleGetFile = (e) => {
        this.setState({file: e.file})
        
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const {type, user, users, username, email, roles, password, password2} = this.state

        let validate = Validateur.validateur([
            {type: "text", id: 'username', value: username.value},
            {type: "email", id: 'email', value: email.value},
            {type: "array", id: 'roles', value: roles.value}
        ]);

        let id = (user != undefined) ? user.id : null
        if(users.filter(v => v.username.toLowerCase() == username.value.toLowerCase() && v.id != id).length != 0){
            validate.code = false;
            validate.errors = {...validate.errors, ...{username: {value: username.value, error: 'Ce nom d\'utilisateur est déjà pris.'}}};
        }

        if(type === "add"){
            let addValidate = Validateur.validateur([
                {type: "password", id: 'password', value: password.value},
                {type: "password", id: 'password2', value: password2.value},
            ]);
            if(!addValidate.code){
                validate.code = false;
                validate.errors = {...validate.errors, ...addValidate.errors};
            }

            if(password.value != password2.value){
                validate.code = false;
                validate.errors = {...validate.errors, ...{password: {value: password.value, error: 'Les mots de passe ne sont pas similaires.'}}};
            }
        }

        if(!validate.code){
            this.setState(validate.errors);
        }else{
            Loader.loader(true)

            let fd = new FormData();
            fd.append('data', JSON.stringify(this.state));
            fd.append('file', this.state.file);
            
            let url = (type === 'edit') ? Routing.generate('super_users_user_update', {'user': user.id}) : Routing.generate('super_users_user_add');

            let self = this
            axios({ method: 'post', url: url, data: fd, headers: {'Content-Type': 'multipart/form-data'} }).then(function (response) {
                let data = response.data; let code = data.code; Loader.loader(false)

                if(code === 1){
                    if(type === "edit"){
                        user.username = username.value;
                        user.email = email.value;
                        user.roles = roles.value;
                        user.highRoleCode = data.highRoleCode;
                        user.highRole = data.highRole;
                        user.avatar = data.avatar;
    
                        self.setState({users: updateInArray(self.state.users, user)})
                        self.props.onUpdate(user)
    
                        toastr.info('Mise à jour effectuée.')
                    }else{
                        location.reload()
                    }
                }else{
                    self.setState({error: data.message})
                }
            });
        }

    }

    render () {
        const {type, user, error, username, email, roles, password, password2} = this.state

        let rolesItems = [
            { 'value': 1, 'role': 'ROLE_SUPER_ADMIN', 'label': 'Super admin', 'id': 'superamdin', 'checked': false },
            { 'value': 2, 'role': 'ROLE_ADMIN', 'label': 'Admin', 'id': 'admin', 'checked': false },
            { 'value': 0, 'role': 'ROLE_USER',  'label': 'Utilisateur', 'id': 'utilisateur', 'checked': false },
            
        ]

        if(roles.length != 0){
            rolesItems.map(el => {
                roles.value.map(elem => {
                    if (elem == el.role){ el.checked = true }
                })
            })
        }

        let infos = null, title = null, btnText = null, createPassword = null;

        if(type === 'edit'){
            btnText = "Mettre à jour"
            title = "Modification"
            infos = user === undefined ? null : <div className="aside-user-informations">
                <div>Créé le {user.createAtString}</div>
                <div>Renouvellement du mot de passe le {user.renouvTimeString}</div>
            </div>
        }else{
            btnText = "Ajouter"
            createPassword = <>
                <div className="line line-2">
                    <Input type="password" identifiant="password" valeur={password} onChange={this.handleChange}>Mot de passe</Input>
                    <Input type="password" identifiant="password2" valeur={password2} onChange={this.handleChange}>Confirmer le mot de passe</Input>
                </div>
            </>
        }

        return <>
            {infos}
            <form className={"aside-user-form aside-user-form-" + type} onSubmit={this.handleSubmit}>
                <span className="form-title">{title}</span>
                {error != '' ? <Alert type="danger" message={error} active="true" /> : null}
                <div className="line line-2">
                    <Input identifiant="username" valeur={username} onChange={this.handleChange}>Nom d'utilisateur</Input>
                    <Input type="email" identifiant="email" valeur={email} onChange={this.handleChange}>Adresse e-mail</Input>
                </div>
                {createPassword}
                <div className="line">
                    <Checkbox items={rolesItems} name="roles" valeur={roles} onChange={this.handleChange}>Roles</Checkbox>
                </div>
                <div className="line">
                    <div className="form-files">
                        {user === undefined ? null : <div className="form-avatar"><img src={'../../uploads/' + user.avatar} alt="Avatar actuel de l'utilisateur"/></div>}
                        <Drop label="Téléverser un nouvel avatar" labelError="Seul les images sont acceptées."
                              accept={"image/*"} maxFiles={1} onGetFile={this.handleGetFile}/>
                    </div>
                </div>
                <div className="form-button">
                    <button type="submit" className="btn btn-primary"><span>{btnText}</span></button>
                </div>
            </form>
        </>
    }
}