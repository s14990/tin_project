import React from 'react';
import axios from 'axios';
import validator from 'validator';
const server = axios.create({ baseURL: 'http://localhost:4000' })

class AddMedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            med_name: '',
            err: '',
            disabled: false,
            med: '',
            cena: '',
            price: ''
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
                if (validator.isAlphanumeric(value)) {
                    this.setState({ med_name: value, err: '', disabled: false })
                }
                else
                    this.setState({ med_name: value, err: 'Wrong Name', disabled: true })
                break;
            case 'cena':
                this.setState({ cena: value})
            break;
            default:
                console.log("Unknown");
                break;
        }
    }

    submit_to_create() {
        server.post('/med/add', { med_name: this.state.med_name })
            .then(res => { this.setState({ med: res.data }) }).then(() => {
                if (!!this.state.med) {
                    console.log("new med created");
                    server.post('/price/add', { med: this.state.med._id,cena: this.state.cena })
                    console.log("new price created");
                    setTimeout(this.timed_update, 300);
                }
                else
                    console.log("failed to create med");
            });
    }

    timed_update() {
        this.props.history.push('/med');
    }

    render() {
        return (
            <div className="component">
                <form className="Add_Med_Form">
                    <div>
                        <label htmlFor="username">Med_Name</label>
                        <input type="text" className="field" name="name" value={this.state.med_name} onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="cena">Cena</label>
                        <input type="text" className="field" name="cena" value={this.state.cena} onChange={this.handleInputChange}/>
                    </div>
                    {this.state.err.length > 0 && <p className="Error">{this.state.err}</p>}
                    <button className="buttons" type="button" onClick={this.submit_to_create} disabled={this.state.disabled}>Create New Med</button>
                </form>
            </div>
        );
    }

}

export default AddMedComponent;