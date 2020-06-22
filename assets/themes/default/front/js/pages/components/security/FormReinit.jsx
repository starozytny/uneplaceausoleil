import React, {Components} from 'react';
import Input from '../../../components/Input';
import Validateur from '../../../components/validateur/validate_input';
import AjaxSend from '../../../components/form/ajax_classique';

class FormReinit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: '',
            error: '',
            password: { value: '', error: '' },
            password2: { value: '', error: '' }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            success: '',
            [name]: {value: value}
        });
    } 

    handleSubmit(e){
        e.preventDefault();

        //Validation
        let validate = Validateur.validateur([
            {type: "text", id: 'password', value: this.state.password.value},
            {type: "text", id: 'password2', value: this.state.password2.value}
        ]);

        //Display error if validate != true else call Ajax password lost
        if(!validate.code){
            this.setState(validate.errors);
        }else{
            AjaxSend.sendAjax(this, this.props.url, this.state);
        }
    }

    render() {
        const {password, password2, success, error} = this.state;
        const a = "password", b = "password2";
        return (
            <form onSubmit={this.handleSubmit}>
                {success ? <div className="alert-success">{success}</div> : null}
                {error ? <div className="alert-error">{error}</div> : null}
                <div>
                    <Input value={password.value} type="password" name={a} id={a} onChange={this.handleChange} error={password.error}>Mot de passe</Input>
                    <Input value={password2.value} type="password" name={b} id={b} onChange={this.handleChange} error={password2.error}>Confirmer le mot de passe</Input>
                </div>
                <div>
                    <button type="submit">Réinitialiser</button>
                </div>
            </form>
        );
    }
}

export default FormReinit;