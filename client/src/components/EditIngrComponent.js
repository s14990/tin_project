import React from 'react';
import axios from 'axios';
const server = axios.create({ baseURL: 'http://localhost:4000' })

class EditIngrComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            ingr_name: ''
        };

        this.submit_to_update = this.submit_to_update.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.timed_update = this.timed_update.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({ _id: id });
        server.get('/ingr/' + id).then(res => {
            this.setState({ ingr_name: res.data.ingr_name });
        });
    }

    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'name':
                this.setState({ ingr_name: value })
                break;
            default:
                console.log("Unknown");
                break;
        }
    }

    submit_to_update() {
        server.put('/ingr/' + this.state._id, { ingr_name: this.state.ingr_name }).then(console.log("Ingr Updated"));
        setTimeout(this.timed_update, 300);
    }

    timed_update() {
        this.props.history.push('/Ingr');
    }

    render() {
        return (
            <div className="component">
                <div>
                    <p>Ingredient: {this.state._id}</p>
                </div>
                <form className="Ingr_Edit_Form">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="field" name="name" value={this.state.ingr_name} onChange={this.handleInputChange} />
                    <button className="buttons" type="button" onClick={this.submit_to_update}>Update</button>
                </form>
            </div>
        );
    }

}

export default EditIngrComponent;