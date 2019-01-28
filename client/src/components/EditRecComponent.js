import React from 'react';
import axios from 'axios';
const server = axios.create({ baseURL: 'http://localhost:4000' })

class EditRecComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            ingr_name: '',
            med_name: '',
            mass: '',
            rec: ''
        };

        this.submit_to_update = this.submit_to_update.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.timed_update = this.timed_update.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        server.get('/rec/' + id).then(res => {
            this.setState({rec: res.data, mass: res.data.mass });
        }).then(() => {
            server.get('/med/' + this.state.rec.med).then(res => {
                this.setState({ med_name: res.data.med_name });
            });
            server.get('/ingr/' + this.state.rec.ingr).then(res => {
                this.setState({ ingr_name: res.data.ingr_name });
            });
        });

    }

    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'mass':
                this.setState({ mass: value })
                break;
            default:
                console.log("Unknown");
                break;
        }
    }

    submit_to_update() {
        server.put('rec/' + this.state.rec._id, { mass: this.state.mass }).then(console.log("Receipt Updated"));
        setTimeout(this.timed_update, 300);
    }

    timed_update() {
        this.props.history.push('/rec');
    }

    render() {
        return (
            <div className="component">
                <div>
                    <p>Medicine:  {this.state.med_name}</p>
                    <p>Ingredint: {this.state.ingr_name}</p>
                </div>
                <form className="Rec_Edit_Form">
                    <label htmlFor="mass">Mass</label>
                    <input type="text" className="field" name="mass" value={this.state.mass} onChange={this.handleInputChange} />
                    <button className="buttons" type="button" onClick={this.submit_to_update}>Update</button>
                </form>
            </div>
        );
    }

}

export default EditRecComponent;