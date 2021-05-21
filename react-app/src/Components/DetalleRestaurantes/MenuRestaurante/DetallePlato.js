import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import { IoArrowBackCircle } from 'react-icons/io5';
import Trunc from '../../functions/Trunc';
export class DetallePlato extends Component {

    render() {
        let moneda = localStorage.getItem('moneda');
        let dinero = localStorage.getItem('dinero');
        let precio = this.props.location.state.precio;

        return (
            <div className="p-4">
                <Row>
                    <Col md="12" sm="12" className="pb-5">
                        <h2 className="text-left"><a href="." className="text-left text-dark" style={{ 'textDecoration': 'none' }}><IoArrowBackCircle /> Volver a la carta</a></h2>
                    </Col>
                </Row>
                <figure className="figure">
                    <img src={this.props.location.state.imgURL} alt="Imagen plato" />
                    <figcaption>
                        <Row>
                            <Col md="12">{this.props.location.state.nombrePlato}</Col>
                            <Col md="12">{< Trunc x={dinero * precio} posiciones={2} />} {moneda}</Col>
                        </Row>
                    </figcaption>
                </figure>
                <br />
                {/* Alergenos */}
                <Row classname="p-3 pt-5">
                    <Col md="12" sm="12">
                        <br />
                        <h5>Alérgenos</h5>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={{ size: 2, offset: 3 }} sm="4" xs="4">
                        <img src="https://via.placeholder.com/100.png" className="rounded-circle" alt="Alergeno 1" />
                    </Col>
                    <Col md="2" sm="4" xs="4">
                        <img src="https://via.placeholder.com/100.png" className="rounded-circle" alt="Alergeno 2" />
                    </Col>
                    <Col md="2" sm="4" xs="4">
                        <img src="https://via.placeholder.com/100.png" className="rounded-circle" alt="Alergeno 3" />
                    </Col>
                </Row>
                <br />
                <Row className="p-3 pt-3">
                    <Col md="6" sm="6" className="pr-5">
                        <h4 >Tipo cocina</h4>
                        <Row>
                            <Col md="12" sm="12">
                                Italiano
                            </Col>
                        </Row>
                    </Col>
                    <Col md="6" sm="6" className="pt-3 pl-2">
                        <h4>Descripción</h4>
                        <Row>
                            <Col md="12" sm="12">
                                Ejemplo de descripción de {this.props.location.state.nombrePlato}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DetallePlato
