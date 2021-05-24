import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Trunc from '../../functions/Trunc';
export class PlatosPrincipales extends Component {
    render() {
        let moneda = localStorage.getItem('moneda');
        let dinero = localStorage.getItem('dinero');
        if (moneda === null && dinero === null) {
            moneda = '€';
            dinero = 1;
        }
        return (
            <Col md="12" className="p-4">
                <Row>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=FileteSalmonPlancha" alt="Filete de salmon a la plancha" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Filete de salmon a la plancha</Col>
                                    <Col md="12">{< Trunc x={dinero * 9.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Parrillada" alt="Parrillada" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Parrillada</Col>
                                    <Col md="12">{< Trunc x={dinero * 30} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=ChuletasCerdoPatatas" alt="Chuletas de cerdo con patatas fritas" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Chuletas de cerdo con patatas fritas</Col>
                                    <Col md="12">{< Trunc x={dinero * 12.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Plato-4" alt="Plato 4" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Plato 4</Col>
                                    <Col md="12">{< Trunc x={dinero * 10.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Plato-5" alt="Plato 5" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Plato 5</Col>
                                    <Col md="12">{< Trunc x={dinero * 15.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Plato-6" alt="Plato 6" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Plato 6</Col>
                                    <Col md="12">{< Trunc x={dinero * 20.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                </Row>
            </Col>
        )
    }
}
export default PlatosPrincipales;
