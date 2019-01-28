import React from 'react';
import axios from 'axios';
import validator from 'validator';
const server = axios.create({ baseURL: 'http://localhost:4000' })

class AddRecComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meds: [],
            ingrs: [],
            med: '',
            ingr: '',
            mass: '',
            err: '',
            disabled: false,
        };

        this.submit_to_create = this.submit_to_create.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.timed_update = this.timed_update.bind(this);
    }

    componentDidMount() {
        server.get('/rec/').then(res => {
            this.setState({ recs: res.data });
        });
        server.get('/med/').then(res => {
            this.setState({ meds: res.data });
        });
        server.get('/ingr/').then(res => {
            this.setState({ ingrs: res.data });
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
            case 'ingr':
                this.setState({ ingr: value });
                break;
            case 'mass':
                if (validator.isAlphanumeric(value)) {
                    this.setState({ mass: value, err: '', disabled: false })
                }
                else
                    this.setState({ mass: value, err: 'Wrong Mass', disabled: true })
                break;     
            default:
                console.log("Unknown");
                break;
        }
    }

    submit_to_create() {
        server.post('/rec/add', { med: this.state.med,ingr:this.state.ingr,mass:this.state.mass })
            .then(res => { this.setState({ Rec: res.data }) }).then(() => {
                if (!!this.state.Rec) {
                    console.log("new Rec created");
                    setTimeout(this.timed_update, 300);
                }
                else
                    console.log("failed to create Rec");
            }
            );
    }

    timed_update() {
        this.props.history.push('/rec');
    }

    render() {
        return (
            <div className="component">
                <form className="Add_Rec_Form">
                    <div>
                        <label htmlFor="med">Medicine</label>
                        <select name="med" value={this.state.med} onChange={this.handleInputChange}>
                        <option value="" disabled></option>
                        {this.state.meds.map(med =>
                            <option key={med._id} value={med._id} >{med.med_name}</option>
                        )}
                        </select>
                        <label htmlFor="ingr">Ingredient</label>
                        <select name="ingr" value={this.state.ingr} onChange={this.handleInputChange}>
                        <option value="" disabled></option>
                        {this.state.ingrs.map(ingr =>
                            <option key={ingr._id} value={ingr._id} >{ingr.ingr_name}</option>
                        )}
                        </select>
                        <label htmlFor="mass">Mass</label>
                        <input type="text" className="field" name="mass" value={this.state.mass} onChange={this.handleInputChange} />
                    </div>
                    {this.state.err.length > 0 && <p className="Error">{this.state.err}</p>}
                    <button className="buttons" type="button" onClick={this.submit_to_create} disabled={this.state.disabled}>Create New Rec</button>
                </form>
            </div>
        );
    }

}

export default AddRecComponent;