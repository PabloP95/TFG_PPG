import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
export class RestOpiniones extends Component {
    render() {
        return (
            <div>
                <Row className="p-4">
                    <Col md="12" className="bg-dark text-light rounded text-center">
                        <h5>
                            Opiniones
                        </h5>
                    </Col>

                    <Row className="p-4 border rounded mt-3">
                        <Col md="12" className="text-justify">
                            <p>Nota: 4 estrellas/5</p>
                            <p>Opinión: El servicio en el restaurante A ha sido excepcional, aunque la comida venia un poco fría</p>
                            <p>Fecha opinión: 10/05/2021</p>
                        </Col>
                    </Row>
                    <Row className="p-4 border rounded mt-3">
                        <Col md="12" className="text-justify">
                            <p>Nota: 5 estrellas/5</p>
                            <p>Opinión: Todo bien</p>
                            <p>Fecha opinión: 10/05/2021</p>
                        </Col>
                    </Row>
                </Row>
            </div>
        )
    }
}

export default RestOpiniones
