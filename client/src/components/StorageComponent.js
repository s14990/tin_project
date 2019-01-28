import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
const server = axios.create({ baseURL: 'http://localhost:4000' })

class StorageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meds: [],
            strs: []
        };
        this.refresh = this.refresh.bind(this);
        this.timed_update = this.timed_update.bind(this);
        this.get_Med_Name = this.get_Med_Name.bind(this);
    }
    componentDidMount() {
        server.get('/med/').then(res => {
            this.setState({ meds: res.data });
        });
        server.get('/storage/').then(res => {
            this.setState({ strs: res.data });
        });
    }

    refresh() {

        setTimeout(this.timed_update, 300);
        console.log("refreshed storage");
    }

    timed_update() {
        this.props.history.push('/');
        this.props.history.push('/storage');
    }


    handleDelete(id) {
        server.delete('/storage/' + id)
            .then(console.log("Deleted " + id))
            .then(this.refresh());
    }

    get_Med_Name(id) {
        var med = this.state.meds;
        for (var i in med) {
            if (id === med[i]._id)
                return med[i].med_name;
        };
        return "Med not Found";
    }

    render() {
        if (this.props.user.rank === "admin") {
            return (
                <div className="component">
                    <table className='showtable'>
                        <thead>
                            <tr>
                                <th>Medicine</th>
                                <th>Number</th>
                                <th>Status</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.strs.map(str =>
                                <tr key={str._id}>
                                    <td>{this.get_Med_Name(str.med)}</td>
                                    <td>{str.number}</td>
                                    <td>{str.status}</td>
                                    <td><button className="buttons" onClick={this.handleDelete.bind(this, str._id)}>Delete</button></td>
                                    <td><Link className="links" to={'storage/' + str._id}>Update Storage</Link></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Link className="links" to={'storage_add/'}>Add_Storage</Link>
                </div>
            );
        }
        else if (this.props.user.rank === "user") {
            return (
                <div className="component">
                    <table className='showtable'>
                        <thead>
                            <tr>
                                <th>Medicine</th>
                                <th>Number</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.strs.map(str =>
                                <tr key={str._id}>
                                    <td>{this.get_Med_Name(str.med)}</td>
                                    <td>{str.number}</td>
                                    <td>{str.status}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            );
        }
        else
            return (
                <div className="component">
                    <p>User Should be loged in to view this</p>
                </div>
            );
    }
}

export default StorageComponent;