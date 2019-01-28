import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
const server = axios.create({ baseURL: 'http://localhost:4000' })

class OrderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            meds: [],
            orders: [],
            user_orders: []
        };
        this.refresh = this.refresh.bind(this);
        this.timed_update = this.timed_update.bind(this);
        this.get_Med_Name = this.get_Med_Name.bind(this);
        this.get_User_Name = this.get_User_Name.bind(this);
    }
    componentDidMount() {
        server.get('/med/').then(res => {
            this.setState({ meds: res.data });
        });
        server.get('/user/').then(res => {
            this.setState({ users: res.data });
        });
        server.get('/order/').then(res => {
            this.setState({ orders: res.data });
        });
        if(!!this.props.user._id)
        server.get('/order/user/' + this.props.user._id).then(res => {
            this.setState({ user_orders: res.data });
        });
    }

    refresh() {
        setTimeout(this.timed_update, 300);
        console.log("refreshed orders");
    }

    timed_update() {
        this.props.history.push('/');
        this.props.history.push('/order');
    }


    handleDelete(id) {
        server.delete('/order/' + id)
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

    get_User_Name(id) {
        var user = this.state.users;
        for (var i in user) {
            if (id === user[i]._id)
                return user[i].username;
        };
        return "User not Found";
    }


    render() {
        if (this.props.user.rank === "admin") {
            return (
                <div className="component">
                    <table className='showtable'>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Medicine</th>
                                <th>Status</th>
                                <th>Time</th>  
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.map(order =>
                                <tr key={order._id}>
                                    <td>{this.get_User_Name(order.user)}</td>
                                    <td>{this.get_Med_Name(order.med)}</td>
                                    <td>{order.status}</td>
                                    <td>{order.date}</td>
                                    <td><button className="buttons" onClick={this.handleDelete.bind(this, order._id)}>Delete</button></td>
                                    <td><Link className="links" to={'order/' + order._id}>Update Order</Link></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Link className="links" to={'order_add/' + this.props.user._id}>Add_order</Link>
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
                                <th>Status</th>
                                <th>Time</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.user_orders.map(order =>
                                <tr key={order._id}>
                                    <td>{this.get_Med_Name(order.med)}</td>
                                    <td>{order.status}</td>
                                    <td>{order.date}</td>
                                    <td><Link className="links" to={'order/' + order._id}>Update Order</Link></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Link className="links" to={'order_add/' + this.props.user._id}>Add_order</Link>
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

export default OrderComponent;