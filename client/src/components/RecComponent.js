import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
const server = axios.create({ baseURL: 'http://localhost:4000' })

class RecComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recs: [],
            meds: [],
            ingrs: []
        };
        this.refresh = this.refresh.bind(this);
        this.timed_update = this.timed_update.bind(this);
        this.get_Med_Name = this.get_Med_Name.bind(this);
        this.get_Ingr_Name = this.get_Ingr_Name.bind(this);
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

    refresh() {
        setTimeout(this.timed_update, 300);
        console.log("refreshed recs");
    }

    timed_update() {
        this.props.history.push('/');
        this.props.history.push('/rec');
    }


    handleDelete(id) {
        server.delete('/rec/' + id)
            .then(console.log("Deleted " + id))
            .then(this.refresh());
    }

    get_Med_Name(id) {
        var med = this.state.meds;
        for (var i in med) {
            if (id === med[i]._id)
                return med[i].med_name;
        };
        return "Med not Found";
    }

    get_Ingr_Name(id) {
        var ingr = this.state.ingrs;
        for (var i in ingr) {
            if (id === ingr[i]._id)
                return ingr[i].ingr_name;
        };
        return "Ingredient not Found";
    }


    render() {

        return (
            <div className="component">
                <table className='showtable'>
                    <thead>
                        <tr>
                            <th>Medicine</th>
                            <th>ingredient</th>
                            <th>Mass</th>
                            {this.props.user_rank === "admin" && <th>Delete</th>}
                            {this.props.user_rank === "admin" && <th>Update</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.recs.map(rec =>
                            <tr key={rec._id}>
                                <td>{this.get_Med_Name(rec.med)}</td>
                                <td>{this.get_Ingr_Name(rec.ingr)}</td>
                                <td>{rec.mass}</td>
                                {this.props.user_rank === "admin" && <td><button className="buttons" onClick={this.handleDelete.bind(this, rec._id)}>Delete</button></td>}
                                {this.props.user_rank === "admin" && <td><Link className="links" to={'rec/' + rec._id}>Update Receipt</Link></td>}
                            </tr>
                        )}
                    </tbody>
                </table>
                {this.props.user_rank === "admin" && <Link className="links" to={'rec_add'}>Add_receipt</Link>}
            </div>
        );
    }
}

export default RecComponent;