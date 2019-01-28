import React from 'react';
import axios from 'axios';
const server = axios.create({ baseURL: 'http://localhost:4000' })

class EditMedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            med_name: '',
            price: '',
            cena: ''
        };

        this.submit_to_update = this.submit_to_update.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.timed_update = this.timed_update.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({ _id: id });
        server.get('/med/' + id).then(res => {
            this.setState({ med_name: res.data.med_name })
        }).then(() => {
            server.get('/price/med/' + id).then(res => {
                this.setState({ price: res.data, cena: res.data.cena })
            });
        })
    }

    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'name':
                this.setState({ med_name: value })
                break;
            case 'cena':
                this.setState({ cena: value })
                break;
            default:
                console.log("Unknown");
                break;
        }
    }

    submit_to_update() {
        server.put('/med/' + this.state._id, { med_name: this.state.med_name }).then(console.log("Med Updated"));
        server.put('/price/' + this.state.price._id, { cena: this.state.cena }).then(console.log("Price Updated"));
        setTimeout(this.timed_update, 300);
    }

    timed_update() {
        this.props.history.push('/med');
    }

    render() {
        return (
            <div className="component">
                <div>
                    <p> Med_id: {this.state._id}</p>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="field" name="name" value={this.state.med_name} onChange={this.handleInputChange} />
                </div>
                <form className="Med_Edit_Form">
                    <label htmlFor="cena">Cena</label>
                    <input type="text" className="field" name="cena" value={this.state.cena} onChange={this.handleInputChange} />
                    <button className="buttons" type="button" onClick={this.submit_to_update}>Update</button>
                </form>
            </div>
        );
    }

}

export default EditMedComponent;