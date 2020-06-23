import React, {Components} from 'react';
import {Input, TextArea, Select} from '../../../components/composants/Fields';
import {Formulaire} from '../../../components/composants/Formulaire';
import Validateur from '../../../components/functions/validate_input';
import AjaxSend from '../../../components/functions/ajax_classique';
import ReCAPTCHA from "react-google-recaptcha";

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

        this.recaptchaRef = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            success: '',
            [name]: {value: value}
        });
    }

    handleSubmit (e) {
        e.preventDefault();
        const {firstname, email, message} = this.state;

        //Validation
        let validate = Validateur.validateur([
            {type: "text", id: 'firstname', value: firstname.value},
            {type: "email", id: 'email', value: email.value},
            {type: "text", id: 'message', value: message.value}
        ]);

        //Recaptcha
        this.recaptchaRef.current.executeAsync().then(value => {
            if(value !== null){
                if(!validate.code){
                    this.setState(validate.errors);
                }else{
                    AjaxSend.sendAjax(this, this.props.url, this.state);
                }
                this.recaptchaRef.current.reset();
            }
        })        
    }

    render() {
        const {children} = this.props;
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
                            <ReCAPTCHA ref={this.recaptchaRef} size={"invisible"} sitekey="6LeJXdUUAAAAABW3t8yl9tkJ5PpSFdhKqvOpgGyY" />
                        </>
                    }
                    btn="Envoyer"
                    children={children}
                />
            </>
        );
    }
}

export default FormContact;