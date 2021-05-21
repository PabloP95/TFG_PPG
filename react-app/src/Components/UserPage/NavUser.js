import React, { Component } from 'react'

export class NavUser extends Component {
    render() {
        return (
            <div className="container bg-light">
                <ul className="nav flex-column nav-pills align-items-stretch pt-5 pb-5" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="pills-inicio-tab" data-toggle="pill" href="#pills-inicio" role="tab" aria-controls="pills-inicio" aria-selected="true">Inicio</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="pills-config-tab" data-toggle="pill" href="#pills-config" role="tab" aria-controls="pills-config" aria-selected="false">Configuración</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="pills-reservas-tab" data-toggle="pill" href="#pills-reservas" role="tab" aria-controls="pills-reservas" aria-selected="false">Reservas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="pills-opiniones-tab" data-toggle="pill" href="#pills-opiniones" role="tab" aria-controls="pills-opiniones" aria-selected="false">Opiniones</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="pills-pedidos-tab" data-toggle="pill" href="#pills-pedidos" role="tab" aria-controls="pills-pedidos" aria-selected="false">Pedidos realizados</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NavUser
