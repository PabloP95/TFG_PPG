import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Trunc from '../../functions/Trunc';
export class Postres extends Component {
    render() {
        let moneda = localStorage.getItem('moneda');
        let dinero = localStorage.getItem('dinero');
        return (
            <Col md="12" className="p-4">
                <Row>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Café" alt="Café" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Café</Col>
                                    <Col md="12">{< Trunc x={dinero * 1.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=CaféLeche" alt="Café con leche" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Café con leche</Col>
                                    <Col md="12">{< Trunc x={dinero * 2.2} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Pancakes" alt="Pancakes especiales de la casa" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Pancakes especiales de la casa</Col>
                                    <Col md="12">{< Trunc x={dinero * 8.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Postre-4" alt="Postre 4" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Postre 4</Col>
                                    <Col md="12">{< Trunc x={dinero * 10.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Postre-5" alt="Postre 5" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Postre 5</Col>
                                    <Col md="12">{< Trunc x={dinero * 15.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Postre-6" alt="Postre 6" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Postre 6</Col>
                                    <Col md="12">{< Trunc x={dinero * 20.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                </Row>
            </Col >
        )
    }
}



export default Postres
