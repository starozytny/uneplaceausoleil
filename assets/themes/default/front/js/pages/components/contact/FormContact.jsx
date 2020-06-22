import React, {Components} from 'react';
import {Input, TextArea, Select} from '../../../components/modules/Fields';
import {Formulaire} from '../../../components/modules/Formulaire';
import Validateur from '../../../components/functions/validate_input';
import AjaxSend from '../../../components/functions/ajax_classique';


class FormContact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: '',
            error: '',
            firstname: { value: '', error: '' },
            email: { value: '', error: '' },
            message: { value: '', error: '' }
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
        const {firstname, email, message} = this.state;

        //Validation
        let validate = Validateur.validateur([
            {type: "text", id: 'firstname', value: firstname.value},
            {type: "email", id: 'email', value: email.value},
            {type: "text", id: 'message', value: message.value}
        ]);

        //Display error if validate != true else call Ajax password lost
        if(!validate.code){
            this.setState(validate.errors);
        }else{
            AjaxSend.sendAjax(this, this.props.url, this.state);
        }
    }

    render() {
        const {success, error, firstname, email, message} = this.state;
        return (
            <>
                <Formulaire 
                    onSubmit={this.handleSubmit}
                    success={success}
                    error={error}
                    inputs={
                        <>
                            <Input value={firstname.value} name="firstname" id="firstname" onChange={this.handleChange} error={firstname.error}>Nom / Raison sociale</Input>
                            <Input value={email.value} name="email" id="email" onChange={this.handleChange} error={email.error}>Email</Input>
                            <TextArea value={message.value} name="message" id="message" onChange={this.handleChange} error={message.error}>Message</TextArea>
                        </>
                    }
                    btn="Envoyer"
                />
            </>
        );
    }
}

export default FormContact;