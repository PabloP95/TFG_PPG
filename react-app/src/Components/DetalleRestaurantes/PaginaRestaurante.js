import React, { Component } from 'react';
import axios from 'axios'; //Necesario para obtener datos del restaurante
//por base de datos
import { Row, Col } from 'reactstrap';
import { GoLocation, GoClock } from "react-icons/go";
import { FaPhoneAlt, FaUtensils } from "react-icons/fa";
import Votos from './Votos';
import DetallesCard from './DetallesCard';
import Opiniones from './Opiniones/Opiniones';
export class PaginaRestaurante extends Component {
    render() {
        return (
            <div className="p-4">
                <div id="detalles">
                    <h2 className="poppins-font">Restaurante 1</h2>
                    <Row className="p-3">
                        <Col sm="6" md="4" xs="6">
                            <Votos />
                        </Col>
                        <Col sm="6" md="4" xs="6">
                            <p>x opiniones</p>
                        </Col>
                        <Col sm="12" md="4" xs="12">
                            <p className="text-center">€€ - €€€, Italiano</p>
                        </Col>
                    </Row>

                    <Row className="p-4">
                        <Col sm="6" md="3" xs="5">
                            <p> <GoLocation /> Ubicación</p>
                        </Col>
                        <Col sm="6" md="3" xs="7">
                            <p> <FaPhoneAlt /> Número teléfono</p>
                        </Col>
                        <Col sm="6" md="3" xs="5">
                            <a href="/restaurantes/restaurante/1/menu">
                                <p><FaUtensils /> Carta</p>
                            </a>
                        </Col>
                        <Col sm="6" md="3" xs="7">
                            <p><GoClock /> Horario</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="6" sm="12" xs="12">
                            <figure className="figure ml-2 mt-2">
                                <img src="https://via.placeholder.com/150.png?text=Img1Restaurante"
                                    className="figure-img img-fluid rounded" alt="Imagen 1" />
                            </figure>

                        </Col>
                        <Col md="6" sm="12" xs="12">
                            <figure className="figure ml-2 mt-2">
                                <img src="https://via.placeholder.com/150.png?text=Img2Restaurante"
                                    className="figure-img img-fluid rounded" alt="Imagen 2" />
                            </figure>
                        </Col>
                    </Row>
                </div>
                <DetallesCard />
                <Opiniones />
            </div>
        )
    }
}

export default PaginaRestaurante;
