import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import Trunc from '../../functions/Trunc';
export class Entrantes extends Component {
    render() {
        let moneda = localStorage.getItem('moneda');
        let dinero = localStorage.getItem('dinero');
        if (moneda === null && dinero === null) {
            moneda = '€';
            dinero = 1;
        }
        return (
            <Col className="p-4">
                <Row>
                    <Col md="6">
                        <Link to={{
                            pathname: "/restaurantes/restaurante/1/menu/detalle-plato",
                            state: {
                                nombrePlato: "Entrante 1",
                                imgURL: "https://via.placeholder.com/200x150.png?text=Entrante-1",
                                precio: "9.50"
                            }
                        }}
                            style={{ 'color': 'black' }}>
                            <figure className="figure">
                                <img src="https://via.placeholder.com/200x150.png?text=Entrante-1" alt="imagenPlato" />
                                <figcaption>
                                    <Row>
                                        <Col md="12">Entrante 1</Col>
                                        <Col md="12">{< Trunc x={dinero * 9.50} posiciones={2} />} {moneda}</Col>
                                    </Row>
                                </figcaption>
                            </figure>
                        </Link>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Entrante-2" alt="imagenPlato" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Entrante 2</Col>
                                    <Col md="12">{< Trunc x={dinero * 9.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Entrante-3" alt="imagenPlato" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Entrante 3</Col>
                                    <Col md="12">{< Trunc x={dinero * 8.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Entrante-4" alt="imagenPlato" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Entrante 4</Col>
                                    <Col md="12">{< Trunc x={dinero * 8.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Entrante-5" alt="imagenPlato" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Entrante 5</Col>
                                    <Col md="12">{< Trunc x={dinero * 5.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Entrante-6" alt="imagenPlato" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Entrante 6</Col>
                                    <Col md="12">{< Trunc x={dinero * 6.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default Entrantes
