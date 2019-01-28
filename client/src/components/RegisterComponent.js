import React from 'react';
import axios from 'axios';
import validator from 'validator';
const server = axios.create({ baseURL: 'http://localhost:4000' })

class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            err: '',
            disabled: true
        };

        this.submit_to_register = this.submit_to_register.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.timed_update = this.timed_update.bind(this);
    }

    componentDidMount() {

    }

    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'username':
                this.setState({ username: value })
                if (validator.isAlphanumeric(value)) {
                    this.setState({ err: '', disabled: false })
                }
                else
                    this.setState({ err: 'Wrong Name', disabled: true })
                break;
            case 'password':
                this.setState({ password: value })
                if (validator.isAlphanumeric(value)) {
                    this.setState({ err: '', disabled: false })
                }
                else
                    this.setState({ err: 'Wrong password', disabled: true })
                break;
            case 'email':
                this.setState({ email: value })
                if (validator.isEmail(value)) {
                    this.setState({ err: '', disabled: false })
                }
                else
                    this.setState({ err: 'Wrong email', disabled: true })
                break;
            default:
                console.log("Unknown");
                break;
        }
    }

    submit_to_register() {
        server.post('/user/register', { username: this.state.username, password: this.state.password, email: this.state.email })
            .then(res => { console.log("Registered user" + res.data.username) });
        setTimeout(this.timed_update, 300);
    }

    timed_update() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="component">
                <form className="Login_Form">
                    <div>
                        <label htmlFor="username">UserName</label>
                        <input type="text" className="field" name="username" value={this.state.username} onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="text" className="field" name="password" value={this.state.password} onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="field" name="email" value={this.state.email} onChange={this.handleInputChange} />
                    </div>
                    {this.state.disabled && <p className="Error">{this.state.err}</p>}
                    <button className="buttons" type="button" onClick={this.submit_to_register} disabled={this.state.disabled}>Register</button>
                </form>
            </div>
        );
    }

}
export default RegisterComponent;