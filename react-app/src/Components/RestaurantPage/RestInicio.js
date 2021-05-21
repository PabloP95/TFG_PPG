import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

export class RestInicio extends Component {
    render() {
        return (
            <div>
                <Row className="p-4">
                    <Col md="12" sm="12" className="bg-dark text-light rounded text-center">
                        <h5>
                            Bienvenido Restaurante A
                        </h5>
                    </Col>
                </Row>

                <Row>
                    <Col md={{ size: 6, offset: 3 }} sm={{ size: 6, offset: 3 }}>
                        <h5>Ubicación</h5><p>Calle Falsa nº 123, San Fernando, Cadiz</p>
                        <h5>Métodos de contacto</h5>
                        <Row>
                            <Col md={{ size: 6 }} sm="12">
                                <h6>Teléfono</h6><p>123 96 52 36</p>
                            </Col>
                            <Col md={{ size: 6 }} sm="12">
                                <h6>Correo electrónico</h6><p>restaurantea@info.com</p>
                            </Col>
                        </Row>
                        <h5>Tipos de cocina</h5><p>Italiano</p>
                        <h5>Horario</h5>
                        <Row >
                            <Col md="6" sm="6" xs="6" className="p-2">
                                <h5>Lunes</h5>
                                16:00 - 22:00
                            </Col>
                            <Col md="6" sm="6" xs="6" className="p-2">
                                <h5>Martes</h5>
                                16:00 - 22:00
                            </Col>
                            <Col md="6" sm="6" xs="6" className="p-2">
                                <h5>Miércoles</h5>
                                16:00 - 22:00
                            </Col>
                            <Col md="6" sm="6" xs="6" className="p-2">
                                <h5>Jueves</h5>
                                Cerrado
                            </Col>
                            <Col md="6" sm="6" xs="6" className="p-2">
                                <h5>Viernes</h5>
                                15:00 - 22:00
                            </Col>
                            <Col md="6" sm="6" xs="6" className="p-2">
                                <h5>Sábado</h5>
                                14:00 - 22:00
                            </Col>
                            <Col md="12" sm="12" xs="12" className="p-2 pb-5">
                                <h5>Domingo</h5>
                                Cerrado
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RestInicio
