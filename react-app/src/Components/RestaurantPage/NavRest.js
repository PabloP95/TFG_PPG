import React, { Component } from 'react'

export class NavRest extends Component {
    render() {
        return (
            <div className="container bg-light">
                <ul className="nav flex-column nav-pills align-items-stretch pt-5 pb-5" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="pills-inicioRest-tab" data-toggle="pill" href="#pills-inicioRest"
                            role="tab" aria-controls="pills-inicioRest" aria-selected="true">
                            Inicio
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" id="pills-configRest-tab" data-toggle="pill" href="#pills-configRest"
                            role="tab" aria-controls="pills-configRest" aria-selected="false">
                            Configuración
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" id="pills-menuRest-tab" data-toggle="pill" href="#pills-menuRest"
                            role="tab" aria-controls="pills-menuRest" aria-selected="false">
                            Carta
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" id="pills-opinionesRest-tab" data-toggle="pill" href="#pills-opinionesRest"
                            role="tab" aria-controls="pills-opinionesRest" aria-selected="false">
                            Opiniones
                        </a>
                    </li>

                </ul>
            </div>
        )
    }
}

export default NavRest
