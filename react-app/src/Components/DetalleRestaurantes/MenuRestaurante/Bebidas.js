import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Trunc from '../../functions/Trunc';
import { Link } from 'react-router-dom'
export class Bebidas extends Component {

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
                    {this.props.bebidas.map((bebida) => (
                        <Col md="6" key={bebida.id}>
                            <Link to={{
                                pathname: "/restaurantes/restaurante/" + this.props.idRestaurante + "/menu/detalle-plato",
                                state: {
                                    idPlato: bebida.id,
                                    nombrePlato: bebida.nombre,
                                    descripcion: bebida.descripcion,
                                    imgURL: "https://via.placeholder.com/200x150.png?text=" + bebida.nombre,
                                    precio: bebida.precio
                                }
                            }} style={{ 'color': 'black' }}>
                                <figure className="figure">
                                    <img src={"https://via.placeholder.com/200x150.png?text=" + bebida.nombre} alt={bebida.nombre} />
                                    <figcaption>
                                        <Row>
                                            <Col md="12">{bebida.nombre}</Col>
                                            <Col md="12">{< Trunc x={dinero * bebida.precio} posiciones={2} />} {moneda}</Col>
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

/* 
    
*/

export default Bebidas
