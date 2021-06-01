import React, { Component } from 'react';
import { Card, CardTitle, CardText, Row, Col, UncontrolledTooltip } from 'reactstrap';
import { GoLocation } from "react-icons/go";
import { FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export class DetallesCard extends Component {
    render() {
        let user = JSON.parse(localStorage.getItem('user'));
        return (
            <div id="detalles-card" className="p-4">
                <hr />
                <Row className="p-3">
                    <Col sm="12" md="4" className="order-2 order-md-4 pt-3">
                        <Card body>
                            <CardTitle tag="h5"><strong>Detalles</strong></CardTitle>
                            <br />
                            <CardText>
                                TIPOS COCINA
                                <br />
                                Italiano, ...
                                <br /><br />
                                DIETAS ESPECIALES
                                <br />
                                Opciones vegetarianas
                                <br /><br />
                                COMIDAS
                                <br />
                                Comidas, cenas, ...
                            </CardText>
                        </Card>
                    </Col>
                    {user && user.user.userable_type === 'App\\Models\\Client' ? (
                        <Col sm="12" md="4" className="order-1 order-md-4 pb-4">
                            <br />
                            <br />
                            <br />
                            <br />

                            <Link className="btn btn-primary btn-lg" to={{
                                pathname: "/restaurantes/restaurante/1/reserva",
                                state: {
                                    idRestaurante: "0",
                                    nomRestaurante: "Restaurante A"
                                }
                            }}
                            >
                                Realizar reserva
                            </Link>
                        </Col>
                    ) : (
                        <Col sm="12" md="4" className="order-1 order-md-4 pb-4">
                            <br />
                            <br />
                            <br />
                            <br />
                            <button className="btn btn-secondary btn-lg" style={{ 'cursor': 'auto' }}
                                id="reserva">
                                Realizar reserva
                            </button>
                            <UncontrolledTooltip fade placement="bottom" target="reserva">
                                Para realizar la reserva debe haber iniciado sesión
                            </UncontrolledTooltip>

                        </Col>
                    )}
                    <Col sm="12" md="4" className="order-3 order-md-4 pt-3">
                        <Card body>
                            <CardTitle tag="h5"><strong>Ubicación y contacto</strong></CardTitle>
                            <br />
                            <figure className="figure">
                                <img src="https://via.placeholder.com/200x90.png?text=Img1Restaurante" alt="Imagen mapa" />
                            </figure>
                            <CardText>
                                <GoLocation /> Ubicación<br /><br />
                                <FaPhoneAlt /> Número teléfono<br /><br />
                                <FaRegEnvelope /> Correo electrónico<br />
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div >
        )
    }
}

export default DetallesCard
