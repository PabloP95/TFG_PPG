import React, { Component } from 'react'
import { Row, Col, Card, CardText, Button } from 'reactstrap'
export class PedidosUser extends Component {
    render() {
        return (
            <div>
                <Row className="p-4">
                    <Col md="12" className="bg-dark text-light rounded text-center">
                        <h5>
                            Pedidos realizados
                        </h5>
                    </Col>
                </Row>
                <Row className="p-4">
                    <Col md="6" sm="6" className="p-2">
                        <Card body>
                            <CardText>
                                Restaurante: Restaurante A
                                <br />
                                Fecha pedido: 13/05/2021
                                <br />
                                Precio total: 80€
                            </CardText>
                            <Button>Ver pedido</Button>
                        </Card>
                    </Col>
                    <Col md="6" sm="6" className="p-2">
                        <Card body>
                            <CardText>
                                Restaurante: Restaurante B
                                <br />
                                Fecha pedido: 13/05/2021
                                <br />
                                Precio total: 79.99€
                            </CardText>
                            <Button>Ver pedido</Button>
                        </Card>
                    </Col>
                    <Col md="6" sm="6" className="p-2">
                        <Card body>
                            <CardText>
                                Restaurante: Restaurante C
                                <br />
                                Fecha pedido: 13/05/2021
                                <br />
                                Precio total: 40€
                            </CardText>
                            <Button>Ver pedido</Button>
                        </Card>
                    </Col>
                    <Col md="6" sm="6" className="p-2">
                        <Card body>
                            <CardText>
                                Restaurante: Restaurante D
                                <br />
                                Fecha pedido: 13/05/2021
                                <br />
                                Precio total: 20€
                            </CardText>
                            <Button>Ver pedido</Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PedidosUser
