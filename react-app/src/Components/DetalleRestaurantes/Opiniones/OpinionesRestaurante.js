import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

export class OpinionesRestaurante extends Component {
    render() {
        return (
            <Col md="8" sm="12" className="order-2 order-md-6">
                <h5 className="text-left p-3">Opiniones</h5>
                <Row>
                    <Col md="4">
                        <figure className="figure">
                            <img src="https://via.placeholder.com/100.png" className="figure-img img-fluid figure-rounded" alt="Foto usuario" />
                            <figcaption className="figure-caption text-center">Nombre usuario<br />Fecha publicación: 10/05/2021</figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <p className="text-left">Nota: 4/5</p>
                        <p className="text-justify comments">El servicio en el restaurante A ha sido excepcional, aunque la comida venia un poco fría</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <figure className="figure ">
                            <img src="https://via.placeholder.com/100.png" className="figure-img img-fluid figure-rounded" alt="Foto usuario" />
                            <figcaption className="figure-caption text-center">Nombre usuario<br />Fecha publicación: 08/05/2021</figcaption>
                        </figure>
                    </Col>
                    <Col md="6">
                        <p className="text-left">Nota: 5/5</p>
                        <p className="text-justify comments">El servicio en el restaurante A ha sido excepcional.</p>
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default OpinionesRestaurante
