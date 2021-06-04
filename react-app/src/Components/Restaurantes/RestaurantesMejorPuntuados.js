import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export class RestaurantesMejorPuntuados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantesMejorPuntuados: []
        };
    }

    componentDidMount = () => {
        axios.get('http://127.0.0.1:8000/api/restaurants').then(
            res => {
                this.setState({ restaurantesMejorPuntuados: res.data });
            }
        )
        //Obtener restaurantes ordenado por nota media
        //de mayor a menor y guardarlo en restaurantesMejorPuntados
    }

    render() {
        console.log(this.state.restaurantesMejorPuntuados);
        return (
            <div>
                <p>Prueba de muestra de RestaurantesMejorPuntuados</p>
                <Row className="pt-2">
                    {this.state.restaurantesMejorPuntuados.map(restaurante => (
                        <Col sm="6" md="4" xs="6" key={restaurante.userable_id}>
                            <Link to={{
                                pathname: "/restaurantes/restaurante/" + restaurante.userable_id
                            }}>
                                <figure className="figure ml-3 mt-2 pr-1">
                                    <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 1" />
                                    <figcaption className="figure-caption text-center">{restaurante.name}<br />Descripción</figcaption>
                                </figure>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div >
        )
    }
}

export default RestaurantesMejorPuntuados;
