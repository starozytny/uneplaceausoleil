import React, {Components} from 'react';
import axios from 'axios/dist/axios';
import Input from '../../../components/Input';
import Validateur from '../../../components/validateur/validate_input';

class FormLost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: '',
            error: '',
            email: {
                value: '',
                error: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: {value: value}
        });
    } 

    handleSubmit(e){
        e.preventDefault();

        let validate = Validateur.validateur([
            {type: "email", id: 'email', value: this.state.email.value}
        ]);

        if(!validate.code){
            this.setState(validate.errors);
        }else{
            let self = this;

            axios.post(this.props.url, this.state)
            .then(function (response) {
                let code = response.data.code;
                if(code === 1){
                    self.setState({ 
                        success: response.data.message,
                        email : {value: ''}
                    });
                }else{
                    self.setState(response.data.errors);
                }
                
            })
            .catch(function (error) { console.log(error);});
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