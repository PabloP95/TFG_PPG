import React, { Component } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { Row, Col, Collapse, Button } from 'reactstrap'
import ConfigBasicaRest from './ConfigBasicaRest';
import ConfigRestaurante from './ConfigRestaurante';
export class RestConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basicOpen: false,
            restaurantOpen: false,
        }
    }

    toggleBasic = () => {
        this.setState({ basicOpen: !this.state.basicOpen });
    }

    toggleRestaurant = () => {
        this.setState({ restaurantOpen: !this.state.restaurantOpen });
    }
    render() {
        return (
            <div>
                <Row className="p-4">
                    <Col md="12" className="bg-dark text-light rounded text-center">
                        <h5>
                            Configuración
                        </h5>
                    </Col>
                </Row>
                <Row className="p-2">
                    <Col md="12">
                        <Button block color="info" onClick={this.toggleBasic} className="p-2 text-left">
                            <Row>
                                <Col md="6" sm="8" xs="8" style={{ 'fontSize': '16px' }}>
                                    Configuración básica
                                </Col>
                                <Col md="6" sm="4" xs="4" className="text-right">
                                    {this.state.basicOpen ? (<MdKeyboardArrowUp className="pt-1" size={25} />) : (<MdKeyboardArrowDown className="pt-1" size={25} />)}
                                </Col>
                            </Row>
                        </Button>
                    </Col>
                    <Col md="12" className="ml-3 mt-3">
                        <Collapse isOpen={this.state.basicOpen}>
                            <ConfigBasicaRest />
                        </Collapse>
                    </Col>
                    <Col md="12" className="mt-3">
                        <Button block color="info" onClick={this.toggleRestaurant} className="p-2 text-left">
                            <Row>
                                <Col md="6" sm="8" xs="10" style={{ 'fontSize': '16px' }}>
                                    Configuración del restaurante
                                </Col>
                                <Col md="6" sm="4" xs="2" className="text-right">
                                    {this.state.restaurantOpen ? (<MdKeyboardArrowUp className="pt-1" size={25} />) : (<MdKeyboardArrowDown className="pt-1" size={25} />)}
                                </Col>
                            </Row>
                        </Button>
                        <Col md="12">
                            <Collapse isOpen={this.state.restaurantOpen}>
                                <ConfigRestaurante />
                            </Collapse>
                        </Col>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default RestConfig
