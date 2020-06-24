import React, {Components} from 'react';
import {Input} from '../../../components/composants/Fields';
import {Formulaire} from '../../../components/composants/Formulaire';
import Validateur from '../../../components/functions/validate_input';
import AjaxSend from '../../../components/functions/ajax_classique';

class FormLost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: '',
            error: '',
            email: { value: '', error: '' }
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
            {type: "email", id: 'email', value: this.state.email.value}
        ]);

        //Display error if validate != true else call Ajax password lost
        if(!validate.code){
            this.setState(validate.errors);
        }else{
            AjaxSend.sendAjax(this, this.props.url, this.state, {
                email: { value: '', error: '' }
            });
        }
    }

    render() {
        const {success, error, email} = this.state;
        return (
            <>
                <Formulaire 
                    onSubmit={this.handleSubmit}
                    success={success}
                    error={error}
                    inputs={
                        <Input value={email.value} name="email" id="email" onChange={this.handleChange} error={email.error}>Email</Input>
                    }
                    btn="Envoyer"
                />
            </>
        );
    }
}

export default FormLost;