import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';

export class RestaurantesMejorPuntuados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantesMejorPuntuados: []
        };
    }

    componentDidMount = () => {
        //Obtener restaurantes ordenado por nota media
        //de mayor a menor y guardarlo en restaurantesMejorPuntados
    }

    render() {
        //Recorrer el vector con un map y poner figures
        //con el caption igual a nombreRestaurante <br/> DescripcionRestaurante
        //Hacer que la figura sea un <a>Figura</a>
        //que te lleve a la página de ese restaurante
        //por el id.
        return (
            <div>
                <p>Prueba de muestra de RestaurantesMejorPuntuados</p>
                <Row className="pt-2">
                    <Col sm="6" md="4" xs="6">
                        <a href="/restaurantes/restaurante/1">
                            <figure className="figure ml-3 mt-2 pr-1">
                                <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 1" />
                                <figcaption className="figure-caption text-center">Restaurante A<br />Descripción</figcaption>
                            </figure>
                        </a>
                    </Col>
                    <Col sm="6" md="4" xs="6">
                        <figure className="figure ml-3 mt-2 pr-1">
                            <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 2" />
                            <figcaption className="figure-caption text-center">Restaurante B<br />Descripción</figcaption>
                        </figure>
                    </Col>

                    <Col sm="6" md="4" xs="6">
                        <figure className="figure ml-3 mt-2 pr-1">
                            <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 3" />
                            <figcaption className="figure-caption text-center">Restaurante C<br />Descripción</figcaption>
                        </figure>
                    </Col>

                    <Col sm="6" md="4" xs="6">
                        <figure className="figure ml-3 mt-2 pr-1">
                            <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 4" />
                            <figcaption className="figure-caption text-center">Restaurante D<br />Descripción</figcaption>
                        </figure>
                    </Col>
                    <Col sm="6" md="4" xs="6">
                        <figure className="figure ml-3 mt-2 pr-1">
                            <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 5" />
                            <figcaption className="figure-caption text-center">Restaurante E<br />Descripción</figcaption>
                        </figure>
                    </Col>
                    <Col sm="6" md="4" xs="6">
                        <figure className="figure ml-3 mt-2 pr-1">
                            <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 6" />
                            <figcaption className="figure-caption text-center">Restaurante F<br />Descripción</figcaption>
                        </figure>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default RestaurantesMejorPuntuados;
