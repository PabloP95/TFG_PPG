import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Trunc from '../../functions/Trunc';
import { Link } from 'react-router-dom'
export class Postres extends Component {

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
                    {this.props.postres.map((postre) => (
                        <Col md="6" key={postre.id}>
                            <Link to={{
                                pathname: "/restaurantes/restaurante/" + this.props.idRestaurante + "/menu/detalle-plato",
                                state: {
                                    idPlato: postre.id,
                                    nombrePlato: postre.nombre,
                                    descripcion: postre.descripcion,
                                    imgURL: "https://via.placeholder.com/200x150.png?text=" + postre.nombre,
                                    precio: postre.precio
                                }
                            }} style={{ 'color': 'black' }}>
                                <figure className="figure">
                                    <img src="https://via.placeholder.com/200x150.png?text=FileteSalmonPlancha" alt={postre.nombre} />
                                    <figcaption>
                                        <Row>
                                            <Col md="12">{postre.nombre}</Col>
                                            <Col md="12">{< Trunc x={dinero * postre.precio} posiciones={2} />} {moneda}</Col>
                                        </Row>
                                    </figcaption>
                                </figure>
                            </Link>
                        </Col>

                    ))}
                </Row>
            </Col >
        )
    }
}



export default Postres
