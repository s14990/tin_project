import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
const server = axios.create({ baseURL: 'http://localhost:4000' })

class MedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meds: [],
            prices: []
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.refresh = this.refresh.bind(this);
        this.timed_update = this.timed_update.bind(this);
        this.get_Med_Price = this.get_Med_Price.bind(this);

    }
    componentDidMount() {
        server.get('/med/').then(res => {
            this.setState({ meds: res.data });
        }).then(() => {
            server.get('/price/').then(res => {
                this.setState({ prices: res.data })
            });
        })
    }

    refresh() {

        setTimeout(this.timed_update, 300);
        console.log("refreshed Meds");
    }

    timed_update() {
        this.props.history.push('/');
        this.props.history.push('/med');
    }


    handleDelete(id) {
        server.delete('/med/' + id)
            .then(console.log("Deleted " + id))
            .then(this.refresh());

    }

    get_Med_Price(id) {
        var price = this.state.prices;
        for (var i in price) {
            if (id === price[i].med)
                return price[i].cena;
        };
        return "Med not Found";
    }

    render() {

        return (
            <div className="component">
                <table className='showtable'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Show Ingredients</th>
                            {this.props.user_rank === "admin" && <th>Delete</th>}
                            {this.props.user_rank === "admin" && <th>Edit</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.meds.map(med =>
                            <tr key={med._id}>
                                <td>{med.med_name}</td>
                                <td>{this.get_Med_Price(med._id)}</td>
                                <td><Link className="links" to={'med_show/' + med._id}>Show_Medicine</Link></td>
                                {this.props.user_rank === "admin" && <td><button className="buttons" onClick={this.handleDelete.bind(this, med._id)}>Delete</button></td>}
                                {this.props.user_rank === "admin" && <td><Link className="links" to={'med/' + med._id}>Edit_Medicine</Link></td>}
                            </tr>
                        )}
                    </tbody>
                </table>
                {this.props.user_rank === "admin" && <Link className="links" to={'med_add'}>Add_Medicine</Link>}
            </div>
        );
    }
}

export default MedComponent;