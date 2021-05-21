import React, { Component } from 'react'
import Location from '../../Security/SURestaurante/Location'
export class ConfigUbicacion extends Component {
    render() {
        return (
            <div className="p-2">
                <h5>Ubicación actual</h5><p>Calle Falsa nº 123, San Fernando, Cadiz</p>
                <Location nomBoton="Modificar ubicación" />
            </div>
        )
    }
}

export default ConfigUbicacion
