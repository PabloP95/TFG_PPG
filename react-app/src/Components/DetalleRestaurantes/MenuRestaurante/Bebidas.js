import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Trunc from '../../functions/Trunc';
export class Bebidas extends Component {
    render() {
        let moneda = localStorage.getItem('moneda');
        let dinero = localStorage.getItem('dinero');
        if (moneda === null && dinero === null) {
            moneda = '€';
            dinero = 1;
        }

        console.log(dinero);
        return (
            <Col md="12" className="p-4">
                <Row>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Agua" alt="Agua" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Agua </Col>
                                    <Col md="12">{< Trunc x={dinero * 1.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Vino" alt="Vino" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Vino</Col>
                                    <Col md="12">{< Trunc x={dinero * 5.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Coca-Cola" alt="Coca-Cola" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Coca-Cola</Col>
                                    <Col md="12">{< Trunc x={dinero * 2.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Kas-Naranja" alt="Kas Naranja" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Kas Naranja</Col>
                                    <Col md="12">{< Trunc x={dinero * 2.99} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Kas-Limón" alt="Kas Limón" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Kas Limón</Col>
                                    <Col md="12">{< Trunc x={dinero * 2.99} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/200x150.png?text=Fanta" alt="Fanta" />
                            <figcaption>
                                <Row>
                                    <Col md="12">Fanta</Col>
                                    <Col md="12">{< Trunc x={dinero * 2.50} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>
                </Row>
            </Col>
        )
    }
}

/* 
    
*/

export default Bebidas
