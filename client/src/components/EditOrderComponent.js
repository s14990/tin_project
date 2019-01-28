import React from 'react';
import axios from 'axios';
const server = axios.create({ baseURL: 'http://localhost:4000' })

class EditOrderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: '',
            status: '',
            med: '',
            user: ''
        };

        this.submit_to_update = this.submit_to_update.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.timed_update = this.timed_update.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        server.get('/order/' + id).then(res => {
            this.setState({ order: res.data, status: res.data.status });
        }).then(() => {
            server.get('/med/' + this.state.order.med).then(res => {
                this.setState({ med: res.data });
            });
            server.get('/user/' + this.state.order.user).then(res => {
                this.setState({ user: res.data });
            });
        });

    }

    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'status':
                this.setState({ status: value })
                break;
            default:
                console.log("Unknown");
                break;
        }
    }

    submit_to_update() {
        server.put('order/' + this.state.order._id, { status: this.state.status }).then(console.log("Order Updated"));
        setTimeout(this.timed_update, 300);
    }

    timed_update() {
        this.props.history.push('/order');
    }

    render() {
        return (
            <div className="component">
                <div>
                    <p>User: {this.state.user.username}</p>
                    <p>Medicine:  {this.state.med.med_name}</p>
                </div>
                <form className="Order_Edit_Form">
                    <label htmlFor="status">Status</label>
                    <input type="text" className="field" name="status" value={this.state.status} onChange={this.handleInputChange} />
                    <button className="buttons" type="button" onClick={this.submit_to_update}>Update</button>
                </form>
            </div>
        );
    }

}

export default EditOrderComponent;