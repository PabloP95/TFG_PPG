import axios from 'axios';
import React, { Component } from 'react'
import authHeader from '../../Security/auth/auth-header';
import Location from '../../Security/SURestaurante/Location'
export class ConfigUbicacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            direccionActual: ''
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        axios.get('http://127.0.0.1:8000/api/restaurant/' + user.user.userable_id, {
            headers: authHeader()
        }).then(res => {

            this.setState({
                direccionActual: res.data[0].direccionPostal
            })
        });
    }

    eventHandler = (data) => {
        this.setState({ direccionActual: data })
    }
    render() {
        return (
            <div className="p-2">
                <h5>Ubicación actual</h5><p>{this.state.direccionActual}</p>
                <Location dirActual={this.state.direccionActual} onChange={this.eventHandler} />
            </div>
        )
    }
}

export default ConfigUbicacion
