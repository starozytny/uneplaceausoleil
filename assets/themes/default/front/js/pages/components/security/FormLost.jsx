import React, {Components} from 'react';
import axios from 'axios/dist/axios';
import Input from '../../../components/Input';
import Validateur from '../../../components/validateur/validate_input';

function sendAjax(self, url, data) {
    axios({ method: 'post', url: url, data: data }).then(function (response) 
    {
        let data = response.data;
        let code = data.code;
        
        if(code === 1){
            self.setState({ 
                success: data.message,
                email : {value: ''}
            });
        }else{
            self.setState(data.errors);
        }
    });
}

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
            sendAjax(this, this.props.url, this.state);
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.success ? <div className="alert-success">{this.state.success}</div> : null}
                {this.state.error ? <div className="alert-error">{this.state.error}</div> : null}
                <div>
                    <Input value={this.state.email.value} name="email" id="email" onChange={this.handleChange} error={this.state.email.error}>Email</Input>
                </div>
                <div>
                    <button type="submit">Envoyer</button>
                </div>
            </form>
        );
    }
}

export default FormLost;