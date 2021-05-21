import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap';
import { FaRegEdit } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
export class ReservasUser extends Component {
    render() {
        return (
            <div>
                <Row className="p-4">
                    <Col md="12" sm="12" className="bg-dark text-light rounded text-center">
                        <h5>
                            Reservas
                        </h5>
                    </Col>
                </Row>
                <Row className="p-5 border rounded">
                    <Col md={{ size: 3 }} sm="3" >
                        <a href="/restaurantes/restaurante/1">
                            <figure className="figure mt-2">
                                <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 1" />
                                <figcaption className="figure-caption text-center">Restaurante A</figcaption>
                            </figure>
                        </a>
                    </Col>

                    <Col md="6" sm="9" xs="8" className="pr-5 mt-3">
                        <h5>Fecha reserva</h5>
                        <p>14/05/2021 18:30h<br />
                            Mesa 2
                        </p>
                    </Col>
                    <Col md="3" sm="3" xs="4" className="pl-5 mt-5">
                        <Link className="btn btn-info mr-3 mb-1" to={{
                            pathname: "/restaurantes/restaurante/1/reserva",
                            state: {
                                idRestaurante: "0",
                                nomRestaurante: "Restaurante A",
                                diaReserva: "2021-05-14",
                                horaReserva: "18:30",
                                numComensales: "5"
                            }
                        }}
                        >
                            <FaRegEdit size={20} className="pb-1" />
                        </Link>
                        <Button color="danger" className="mb-1 mr-3"><ImCross size={20} className="pb-1" /></Button>
                    </Col>
                </Row>

                <Row className="p-5 mt-3 border rounded">
                    <Col md="3" sm="4">
                        <a href="/restaurantes/restaurante/1">
                            <figure className="figure mt-2">
                                <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 1" />
                                <figcaption className="figure-caption text-center">Restaurante A</figcaption>
                            </figure>
                        </a>
                    </Col>
                    <Col md="6" sm="8" xs="8" className="pr-5 mt-3">
                        <h5>Fecha reserva</h5>
                        <p>12/05/2021 18:30h<br />
                            Mesa 2
                        </p>
                    </Col>
                    <Col md="3" xs="4" className="pl-5 mt-5">

                        <Link className="btn btn-info mr-3 mb-1" to={{
                            pathname: "/restaurantes/restaurante/1/reserva",
                            state: {
                                idRestaurante: "0",
                                nomRestaurante: "Restaurante A",
                                diaReserva: "2021-05-12",
                                horaReserva: "18:30",
                                numComensales: "5"
                            }
                        }}
                        >
                            <FaRegEdit size={20} className="pb-1" />
                        </Link>


                        <Button color="danger" className="mb-1 mr-3"><ImCross size={20} className="pb-1" /></Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ReservasUser
