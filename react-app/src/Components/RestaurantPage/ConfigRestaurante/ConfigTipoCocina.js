import React, { Component } from 'react'
import TipoCocina from '../../Security/SURestaurante/TipoCocina'
import './showTipoCocina.css';
import axios from 'axios';
import authHeader from '../../Security/auth/auth-header';

export class ConfigTipoCocina extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tiposCocinaSelected: [],
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        axios.get('http://127.0.0.1:8000/api/restaurant/' + user.user.userable_id + '/tiposCocina',
            { headers: authHeader() }).then(res => {
                this.setState({
                    tiposCocinaSelected: res.data
                });
            })
    }
    render() {
        return (
            <div className="p-2">
                <h5>Tipos de cocina actual</h5>
                <ul className="pr-5">
                    {this.state.tiposCocinaSelected.map((tipoCocina) =>
                        <li key={tipoCocina.id}>
                            {tipoCocina.tipoCocina}
                        </li>
                    )}
                </ul>
                <TipoCocina />
            </div>
        )
    }
}

export default ConfigTipoCocina
