import React from 'react';
import axios from 'axios';
import validator from 'validator';
const server = axios.create({ baseURL: 'http://localhost:4000' })

class AddStorageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meds: [],
            med: '',
            number: '',
            status: '',
            err: '',
            disabled: false,
        };

        this.submit_to_create = this.submit_to_create.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.timed_update = this.timed_update.bind(this);
    }

    componentDidMount() {
        server.get('/med/').then(res => {
            this.setState({ meds: res.data });
        });
    }

    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'med':
                this.setState({ med: value });
                break;
            case 'number':
                if (validator.isNumeric(value))
                    this.setState({ number: value, disabled: false, err: '' })
                else
                    this.setState({ number: value, disabled: true, err: 'False number' })
                    break;
            default:
                console.log("Unknown");
                break;
        }
    }

    submit_to_create() {
        server.post('/storage/add', { med: this.state.med, number: this.state.number, status: "Created" })
            .then(res => { this.setState({ Str: res.data }) }).then(() => {
                if (!!this.state.Str) {
                    console.log("new Order created");
                    setTimeout(this.timed_update, 300);
                }
                else
                    console.log("failed to create Str");
            }
            );
    }

    timed_update() {
        this.props.history.push('/storage');
    }

    render() {
        return (
            <div className="component">
                <form className="Add_Storage_Form">
                    <div>
                        <label htmlFor="med">Medicine</label>
                        <select name="med" value={this.state.med} onChange={this.handleInputChange}>
                            <option value="" disabled></option>
                            {this.state.meds.map(med =>
                                <option key={med._id} value={med._id} >{med.med_name}</option>
                            )}
                        </select>
                        <label htmlFor="number">Number</label>
                        <input type="number" className="field" name="number" value={this.state.number} onChange={this.handleInputChange} />
                    </div>
                    {this.state.err.length > 0 && <p className="Error">{this.state.err}</p>}
                    <button className="buttons" type="button" onClick={this.submit_to_create} disabled={this.state.disabled}>Create New Storage</button>
                </form>
            </div>
        );
    }

}

export default AddStorageComponent;