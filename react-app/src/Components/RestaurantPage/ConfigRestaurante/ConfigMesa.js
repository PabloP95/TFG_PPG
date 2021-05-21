import React, { Component } from 'react'
import { Row, Col, Button, Card, CardText } from 'reactstrap'
import Swal from 'sweetalert2';
import CrearMesa from './CrearMesa';
export class ConfigMesa extends Component {

    toggleNewTable = () => {
        console.log("Se ha pulsado sobre el botón de crear mesa");
    }

    checkProfileDelete = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Eliminar mesa?',
            text: '¿Quiere eliminar la mesa?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar mesa',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Mesa eliminada!',
                    'La mesa ha sido eliminada correctamente.',
                    'success'
                )
            }
        });
    }
    render() {
        return (
            <div>
                <Row className="p-2">
                    <CrearMesa />
                </Row>

                <Row className="p-2">
                    <Col md="6" sm="6" className="p-2">
                        <Card body>
                            <CardText>
                                Número de mesa: 1
                                <br />
                                Número de ocupantes: 5
                            </CardText>
                            <Row>
                                <Col md="6" sm="12" className="mb-2">
                                    <CrearMesa nomBoton="Editar Mesa" numMesa="1" numComensales="5" />
                                </Col>
                                <Col md="6" sm="12" className="mb-2">
                                    <Button color="danger" onClick={this.checkProfileDelete}>Eliminar mesa</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col md="6" sm="6" className="p-2">
                        <Card body>
                            <CardText>
                                Número de mesa: 2
                                <br />
                                Número de ocupantes: 5
                            </CardText>
                            <Row>
                                <Col md="6" sm="12" className="mb-2">
                                    <CrearMesa nomBoton="Editar Mesa" numMesa="2" numComensales="5" />
                                </Col>
                                <Col md="6" sm="12" className="mb-2">
                                    <Button color="danger" onClick={this.checkProfileDelete}>Eliminar mesa</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col md="6" sm="6" className="p-2">
                        <Card body>
                            <CardText>
                                Número de mesa: 3
                                <br />
                                Número de ocupantes: 5
                            </CardText>
                            <Row>
                                <Col md="6" sm="12" className="mb-2">
                                    <CrearMesa nomBoton="Editar Mesa" numMesa="3" numComensales="5" />
                                </Col>
                                <Col md="6" sm="12" className="mb-2">
                                    <Button color="danger" onClick={this.checkProfileDelete}>Eliminar mesa</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col md="6" sm="6" className="p-2">
                        <Card body>
                            <CardText>
                                Número de mesa: 4
                                <br />
                                Número de ocupantes: 5
                            </CardText>
                            <Row>
                                <Col md="6" sm="12" className="mb-2">
                                    <CrearMesa nomBoton="Editar Mesa" numMesa="4" numComensales="5" />
                                </Col>
                                <Col md="6" sm="12" className="mb-2">
                                    <Button color="danger" onClick={this.checkProfileDelete}>Eliminar mesa</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default ConfigMesa
