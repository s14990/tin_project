import React from 'react';
import axios from 'axios';
const server = axios.create({ baseURL: 'http://localhost:4000' })

class AddOrderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meds: [],
            med: '',
            user_id: '',
            err: '',
            disabled: false,
        };

        this.submit_to_create = this.submit_to_create.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.timed_update = this.timed_update.bind(this);
    }

    componentDidMount() {
        const user = this.props.match.params.id;
        server.get('/med/').then(res => {
            this.setState({ meds: res.data });
        });
        this.setState({user_id: user});
        
    }

    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'med':
                this.setState({ med: value });
                break;  
            default:
                console.log("Unknown");
                break;
        }
    }

    submit_to_create() {
        server.post('/order/add', { med: this.state.med,user:this.state.user_id,status: "Created"})
            .then(res => { this.setState({ Order: res.data }) }).then(() => {
                if (!!this.state.Order) {
                    console.log("new Order created");
                    setTimeout(this.timed_update, 300);
                }
                else
                    console.log("failed to create Order");
            }
            );
    }

    timed_update() {
        this.props.history.push('/order');
    }

    render() {
        return (
            <div className="component">
                <form className="Add_Order_Form">
                    <div>
                        <label htmlFor="med">Medicine</label>
                        <select name="med" value={this.state.med} onChange={this.handleInputChange}>
                        <option value="" disabled></option>
                        {this.state.meds.map(med =>
                            <option key={med._id} value={med._id} >{med.med_name}</option>
                        )}
                        </select>
                    </div>
                    {this.state.err.length > 0 && <p className="Error">{this.state.err}</p>}
                    <button className="buttons" type="button" onClick={this.submit_to_create} disabled={this.state.disabled}>Create New Order</button>
                </form>
            </div>
        );
    }

}

export default AddOrderComponent;