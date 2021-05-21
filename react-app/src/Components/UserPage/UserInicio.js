import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
export class UserInicio extends Component {
    render() {
        return (
            <div>
                <h3>Bienvenido sonicblazer</h3> { /*sonicblazer === nickname*/}
                <h3>Ha visitado los siguientes restaurantes</h3>
                <Row className="p-4">
                    <Col sm="6" md="4" xs="6">
                        <a href="/restaurantes/restaurante/1">
                            <figure className="figure ml-3 mt-2 mr-2">
                                <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 1" />
                                <figcaption className="figure-caption text-center">Restaurante A<br />Descripción</figcaption>
                            </figure>
                        </a>
                    </Col>
                    <Col sm="6" md="4" xs="6">
                        <figure className="figure ml-3 mt-2 mr-2">
                            <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 2" />
                            <figcaption className="figure-caption text-center">Restaurante B<br />Descripción</figcaption>
                        </figure>
                    </Col>

                    <Col sm="6" md="4" xs="6">
                        <figure className="figure ml-3 mt-2 mr-2">
                            <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 3" />
                            <figcaption className="figure-caption text-center">Restaurante C<br />Descripción</figcaption>
                        </figure>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default UserInicio
