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
                    {this.props.entrantes.map((entrante) => (
                        <Col md="6" key={entrante.id}>
                            <Link to={{
                                pathname: "/restaurantes/restaurante/" + this.props.idRestaurante + "/menu/detalle-plato",
                                state: {
                                    idPlato: entrante.id,
                                    nombrePlato: entrante.nombre,
                                    descripcion: entrante.descripcion,
                                    imgURL: "https://via.placeholder.com/200x150.png?text=Entrante-1",
                                    precio: entrante.precio
                                }
                            }}
                                style={{ 'color': 'black' }}>
                                <figure className="figure">
                                    <img src="https://via.placeholder.com/200x150.png?text=Entrante-1" alt="imagenPlato" />
                                    <figcaption>
                                        <Row>
                                            <Col md="12">{entrante.nombre}</Col>
                                            <Col md="12">{< Trunc x={dinero * entrante.precio} posiciones={2} />} {moneda}</Col>
                                        </Row>
                                    </figcaption>
                                </figure>
                            </Link>
                        </Col>

                    ))}
                </Row>
            </Col>
        )
    }
}

export default Entrantes
