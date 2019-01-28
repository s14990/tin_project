import React from 'react';
import axios from 'axios';
const server = axios.create({ baseURL: 'http://localhost:4000' })

class ShowUserComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

        this.timed_update = this.timed_update.bind(this);
    }
    componentDidMount() {
        server.get('/user/').then(res => {
            this.setState({ users: res.data });
        });
    }

    refresh() {
        setTimeout(this.timed_update, 300);
        console.log("refreshed users");
    }
    timed_update() {
        this.props.history.push('/');
    }


    handleDelete(id) {
        server.delete('/user/' + id)
            .then(console.log("Deleted user" + id))
            .then(this.refresh());

    }


    render() {
        if (this.props.user_rank === "admin")
            return (
                <div className="component">
                    <table className='showtable'>
                        <thead>
                            <tr>
                                <th>UserName</th>
                                <th>Validated</th>
                                <th>Status</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(user =>
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.isvalidated ? "yes" : "no"}</td>
                                    <td>{user.status}</td>
                                    <td><button className="buttons" onClick={this.handleDelete.bind(this, user._id)}>Delete</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            );

        else {
            return (
                <div className="component">
                    <p>Not Autorized</p>
                </div>
            );


        }
    }
}

export default ShowUserComponent;