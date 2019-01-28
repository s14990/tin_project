import React from 'react';
import axios from 'axios';
import validator from 'validator';
const server = axios.create({ baseURL: 'http://localhost:4000' })

class AddIngrComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingr_name: '',
            err: '',
            disabled: false,
            ingr: ''
        };

        this.submit_to_create = this.submit_to_create.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.timed_update = this.timed_update.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'name':
                this.setState({ ingr_name: value })
                if (validator.isAlphanumeric(value)) {
                    this.setState({ ingr_name: value, err: '', disabled: false })
                }
                else
                    this.setState({ ingr_name: value, err: 'Wrong Name', disabled: true })
                break;
            default:
                console.log("Unknown");
                break;
        }
    }

    submit_to_create() {
        server.post('/ingr/add', { ingr_name: this.state.ingr_name })
            .then(res => { this.setState({ ingr: res.data }) }).then(() => {
                if (!!this.state.ingr) {
                    console.log("new ingr created");
                    setTimeout(this.timed_update, 300);
                }
                else
                    console.log("failed to create ingr");
            }
            );




    }

    timed_update() {
        this.props.history.push('/ingr');
    }

    render() {
        return (
            <div className="component">
                <form className="Add_ingr_Form">
                    <div>
                        <label htmlFor="username">Ingredient_Name</label>
                        <input type="text" className="field" name="name" value={this.state.ingr_name} onChange={this.handleInputChange} />
                    </div>
                    {this.state.err.length > 0 && <p className="Error">{this.state.err}</p>}
                    <button className="buttons" type="button" onClick={this.submit_to_create} disabled={this.state.disabled}>Create New ingr</button>
                </form>
            </div>
        );
    }

}

export default AddIngrComponent;