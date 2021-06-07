import React, { Component } from 'react'
import axios from 'axios'
export class AlergenosPlato extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alergenos: []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/plato/' + this.props.idPlato + '/alergenos').then(
            res => {
                this.setState({
                    alergenos: res.data
                });
            }
        )
    }
    render() {
        return (
            <td className="oneliner">
                {this.state.alergenos.map((alergeno) => (
                    <p key={alergeno.id}>{alergeno.nomAlergeno}</p>
                ))}
            </td>
        )
    }
}

export default AlergenosPlato
