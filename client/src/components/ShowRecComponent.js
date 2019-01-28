import React from 'react';
import axios from 'axios';
const server = axios.create({ baseURL: 'http://localhost:4000' })

class ShowRecComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            med: '',
            med_name: '',
            recs: [],
            ingrs: []
        };

        this.get_Ingr_Name = this.get_Ingr_Name.bind(this);
        this.timed_update = this.timed_update.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        server.get('rec/med/' + id).then(res => {
            this.setState({ recs: res.data });
        });
        server.get('/med/' + id).then(res => {
            this.setState({ med: res.data });
        });
        server.get('/ingr/').then(res => {
            this.setState({ ingrs: res.data });
        });
    }

    get_Ingr_Name(id) {
        var ingr = this.state.ingrs;
        for (var i in ingr) {
            if (id === ingr[i]._id)
                return ingr[i].ingr_name;
        };
        return "Ingredient not Found";
    }

    timed_update() {
        this.props.history.push('/med');
    }


    render() {
        return (
            <div className="component">
                <h4>{this.state.med.med_name}</h4>
                <table className='showtable'>
                    <thead>
                        <tr>
                            <th>Ingredient</th>
                            <th>Mass</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.recs.map(rec =>
                            <tr key={rec._id}>
                                <td>{this.get_Ingr_Name(rec.ingr)}</td>
                                <td>{rec.mass}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button className="buttons" type="button" onClick={this.timed_update} disabled={this.state.disabled}>Return</button>
            </div>
        );
    }

}

export default ShowRecComponent;