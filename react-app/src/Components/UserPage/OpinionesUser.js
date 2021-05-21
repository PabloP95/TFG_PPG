import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap';
import { FaRegEdit } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import CrearOpinion from './CrearOpinion';
export class OpinionesUser extends Component {
    render() {
        return (
            <div>
                <Row className="p-4">
                    <Col md="12" className="bg-dark text-light rounded text-center">
                        <h5>
                            Opiniones
                        </h5>
                    </Col>
                    <CrearOpinion />
                </Row>


                <Row className="p-4">
                    <Col md="9" className="text-justify">
                        <p>Nota: 4 estrellas/5</p>
                        <p>Restaurante: Restaurante A</p>
                        <p>Opinión: El servicio en el restaurante A ha sido excepcional, aunque la comida venia un poco fría</p>
                        <p>Fecha opinión: 10/05/2021</p>
                    </Col>
                    <Col md="3" className="pr-5 pt-5">
                        <Button color="info" className="mr-2 mb-1"><FaRegEdit size={20} className="pb-1" /></Button>
                        <Button color="danger" className="ml-2 mb-1"><ImCross size={20} className="pb-1" /></Button>
                    </Col>
                </Row>

                <Row className="p-4">
                    <Col md="9" className="text-justify">
                        <p>Nota: </p>
                        <p>Restaurante: </p>
                        <p>Opinión: </p>
                        <p>Fecha opinión: </p>
                    </Col>
                    <Col md="3" className="pr-5 pt-5">
                        <Button color="info" className="mr-2 mb-1"><FaRegEdit size={20} className="pb-1" /></Button>
                        <Button color="danger" className="ml-2 mb-1"><ImCross size={20} className="pb-1" /></Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default OpinionesUser
