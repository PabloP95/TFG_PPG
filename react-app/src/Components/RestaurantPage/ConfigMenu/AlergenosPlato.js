import React, { Component } from 'react'
import axios from 'axios'
export class AlergenosPlato extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alergenos: [],
            numeroConsultas: this.props.numeroConsultas
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/plato/' + this.props.idPlato + '/alergenos').then(
            res => {
                this.setState({
                    alergenos: res.data
                });
            }
        ).catch(error => {
            if (error.response && error.response.status === 422) { console.log('ERROR en CrearPlato.js') }

        });
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
