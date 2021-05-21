import React, { Component } from 'react'
import TipoCocina from '../../Security/SURestaurante/TipoCocina'
import './showTipoCocina.css';
export class ConfigTipoCocina extends Component {
    render() {
        return (
            <div className="p-2">
                <h5>Tipos de cocina actual</h5>
                <ul className="pr-5">
                    <li className="showTypes">
                        Italiano
                    </li>
                    <li className="showTypes">
                        Italiano
                    </li>
                    <li className="showTypes">
                        Italiano
                    </li>
                    <li className="showTypes">
                        Italiano
                    </li>
                    <li className="showTypes">
                        Italiano
                    </li>
                </ul>

                <TipoCocina nomBoton="Modificar tipos de cocina" />
            </div>
        )
    }
}

export default ConfigTipoCocina
