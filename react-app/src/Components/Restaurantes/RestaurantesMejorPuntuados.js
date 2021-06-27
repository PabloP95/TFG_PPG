import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export class RestaurantesMejorPuntuados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantesMejorPuntuados: [],

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
        let restBusquedaNavbar = JSON.parse(localStorage.getItem('busquedaNavBar'));
        let resBusqueda = JSON.parse(localStorage.getItem('resBusqueda'));
        return (
            <div>
                {/*Se comprueba que exista resultados de la barra de búsqueda que esta en el header*/}
                {restBusquedaNavbar !== null ? (
                    restBusquedaNavbar.length > 0 ? 
                        (
                            <section>
                                <h5>Resultados de la búsqueda</h5>
                                <Row className="pt-2">
                                    {restBusquedaNavbar.map(restaurante => (
                                        <Col sm="6" md="4" xs="6" key={restaurante.userable_id}>
                                            <Link to={{
                                                pathname: "/restaurantes/restaurante/" + restaurante.userable_id
                                            }}>
                                                <figure className="figure ml-3 mt-2 pr-1">
                                                    <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 1" />
                                                    <figcaption className="figure-caption text-center">{restaurante.name}</figcaption>
                                                </figure>
                                            </Link>
                                        </Col>
                                    ))}
                                </Row>
                            </section>
                        ) : (
                        <section>
                            <h5>Resultados de la búsqueda</h5>
                            <p>No existen resultados para la búsqueda que se ha realizado</p>
                        </section>
                    )

                ) : (
                    resBusqueda !== null ? (
                        resBusqueda.length > 0 ?
                            (
                                <section>
                                    <h5>Resultados de la búsqueda</h5>
                                    <Row className="pt-2">
                                        {resBusqueda.map(restaurante => (
                                            <Col sm="6" md="4" xs="6" key={restaurante.userable_id}>
                                                <Link to={{
                                                    pathname: "/restaurantes/restaurante/" + restaurante.userable_id
                                                }}>
                                                    <figure className="figure ml-3 mt-2 pr-1">
                                                        <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 1" />
                                                        <figcaption className="figure-caption text-center">{restaurante.name}</figcaption>
                                                    </figure>
                                                </Link>
                                            </Col>
                                        ))}
                                    </Row>
                                </section>
                            ) : (
                                <section>
                                    <h5>Resultados de la búsqueda</h5>
                                    <p>No existen resultados para la búsqueda que se ha realizado</p>
                                </section>
                            )) :

                        (
                            <section>
                                <h5>Restaurantes mejor puntuados</h5>
                                <Row className="pt-2">
                                    {this.state.restaurantesMejorPuntuados.map(restaurante => (
                                        <Col sm="6" md="4" xs="6" key={restaurante.userable_id}>
                                            <Link to={{
                                                pathname: "/restaurantes/restaurante/" + restaurante.userable_id
                                            }}>
                                                <figure className="figure ml-3 mt-2 pr-1">
                                                    <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 1" />
                                                    <figcaption className="figure-caption text-center">{restaurante.name}</figcaption>
                                                </figure>
                                            </Link>
                                        </Col>
                                    ))}
                                </Row>
                            </section>))
                }

            </div>
        )
    }
}

export default RestaurantesMejorPuntuados;
