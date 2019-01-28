import React from 'react';
import axios from 'axios';
const server = axios.create({ baseURL: 'http://localhost:4000' })

class EditStorageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            str: '',
            status: '',
            med: '',
            number: ''
        };

        this.submit_to_update = this.submit_to_update.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.timed_update = this.timed_update.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        server.get('/storage/' + id).then(res => {
            this.setState({ str: res.data, status: res.data.status, number: res.data.number })
        }).then(() => {
            server.get('/med/' + this.state.str.med).then(res => {
                this.setState({ med: res.data });
            });
        }
        );

    }

    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'status':
                this.setState({ status: value })
                break;
            case 'number':
                this.setState({ number: value })
                break;
            default:
                console.log("Unknown");
                break;
        }
    }

    submit_to_update() {
        server.put('storage/' + this.state.str._id, { status: this.state.status, number: this.state.number }).then(console.log("Storage Updated"));
        setTimeout(this.timed_update, 300);
    }

    timed_update() {
        this.props.history.push('/storage');
    }

    render() {
        return (
            <div className="component">
                <div>
                    <p>Medicine: {this.state.med.med_name}</p>
                    <label htmlFor="status">Status</label>
                    <input type="text" className="field" name="status" value={this.state.status} onChange={this.handleInputChange} />
                </div>
                <form className="Storage_Edit_Form">
                    <label htmlFor="number">Number</label>
                    <input type="text" className="field" name="number" value={this.state.number} onChange={this.handleInputChange} />
                    <button className="buttons" type="button" onClick={this.submit_to_update}>Update</button>
                </form>
            </div>
        );
    }

}

export default EditStorageComponent;