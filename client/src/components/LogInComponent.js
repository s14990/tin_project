import React from 'react';
import axios from 'axios';
const server = axios.create({ baseURL: 'http://localhost:4000' })

class LogInComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };

        this.submit_to_login = this.submit_to_login.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.timed_update = this.timed_update.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'username':
                this.setState({ username: value })
                break;
            case 'password':
                this.setState({ password: value })
                break;
            default:
                console.log("Unknown");
                break;
        }
    }

    submit_to_login() {
        server.post('/user/login', { username: this.state.username, password: this.state.password })
            .then(res => {
                    this.props.handle_login(res.data)
                    this.setState({ error: '' })
                    setTimeout(this.timed_update, 300);
            }).catch(error=>{
                this.setState({error: error.response});
            });



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
                        <input type="password" className="field" name="password" value={this.state.password} onChange={this.handleInputChange} />
                    </div>
                    <button className="buttons" type="button" onClick={this.submit_to_login}>Log IN</button>
                    {!!this.state.error > 0 && <p>{this.state.error.data.error}</p>}
                </form>
            </div>
        );
    }

}
export default LogInComponent;