import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
const server = axios.create({ baseURL: 'http://localhost:4000' })

class IngrComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingrs: []
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.refresh = this.refresh.bind(this);
        this.timed_update = this.timed_update.bind(this);

    }
    componentDidMount() {
        server.get('/ingr/').then(res => {
            this.setState({ ingrs: res.data });
            //console.log(this.state.ingrs);
        });
    }

    refresh() {

        setTimeout(this.timed_update, 300);
        console.log("refreshed ingrs");
    }
    timed_update() {
        this.props.history.push('/');
        this.props.history.push('/ingr');
    }


    handleDelete(id) {
        server.delete('/ingr/' + id)
            .then(console.log("Deleted " + id))
            .then(this.refresh());

    }


    render() {

        return (
            <div className="component">
                <table className='showtable'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            {this.props.user_rank === "admin" && <th>Delete</th>}
                            {this.props.user_rank === "admin" && <th>Update</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ingrs.map(ingr =>
                            <tr key={ingr._id}>
                                <td>{ingr.ingr_name}</td>
                                {this.props.user_rank === "admin" && <td><button className="buttons" onClick={this.handleDelete.bind(this, ingr._id)}>Delete</button></td>}
                                {this.props.user_rank === "admin" && <td><Link className="links" to={'ingr/' + ingr._id}>Edit_Ingredient</Link></td>}
                            </tr>
                        )}
                    </tbody>
                </table>
                {this.props.user_rank === "admin" && <Link className="links" to={'ingr_add'}>Add_Ingredient</Link>}
            </div>
        );
    }
}

export default IngrComponent;