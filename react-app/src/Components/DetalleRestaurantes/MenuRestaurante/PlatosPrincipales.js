import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Trunc from '../../functions/Trunc';
import { Link } from 'react-router-dom'
export class PlatosPrincipales extends Component {


    render() {
        let moneda = localStorage.getItem('moneda');
        let dinero = localStorage.getItem('dinero');
        if (moneda === null && dinero === null) {
            moneda = '€';
            dinero = 1;
        }
        console.log(this.props.pprincipales);
        return (
            <Col md="12" className="p-4">
                <Row>
                    {this.props.pprincipales.map((principal) => (
                        <Col md="6" key={principal.id}>
                            <Link to={{
                                pathname: "/restaurantes/restaurante/" + this.props.idRestaurante + "/menu/detalle-plato",
                                state: {
                                    idPlato: principal.id,
                                    nombrePlato: principal.nombre,
                                    descripcion: principal.descripcion,
                                    imgURL: "https://via.placeholder.com/200x150.png?text=" + principal.nombre,
                                    precio: principal.precio
                                }
                            }}
                                style={{ 'color': 'black' }}>
                                <figure className="figure">
                                    <img src="https://via.placeholder.com/200x150.png?text={principal.nombre}" alt={principal.nombre} />
                                    <figcaption>
                                        <Row>
                                            <Col md="12">{principal.nombre}</Col>
                                            <Col md="12">{< Trunc x={dinero * principal.precio} posiciones={2} />} {moneda}</Col>
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
export default PlatosPrincipales;
