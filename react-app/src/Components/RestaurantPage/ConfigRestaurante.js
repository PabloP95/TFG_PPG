import React, { Component } from 'react'
import { Row, Col, Collapse, Button } from 'reactstrap';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

import ConfigMesa from './ConfigRestaurante/ConfigMesa';
import ConfigTipoCocina from './ConfigRestaurante/ConfigTipoCocina';
import ConfigUbicacion from './ConfigRestaurante/ConfigUbicacion';
import ConfigHorarios from './ConfigRestaurante/ConfigHorarios';

export class ConfigRestaurante extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mesasOpen: false,
            tipoCocinaOpen: false,
            horariosOpen: false,
            ubicacionOpen: false,
            subirImagenesOpen: false,
        }
    }

    toggleMesas = () => {
        this.setState({ mesasOpen: !this.state.mesasOpen });
    }

    toggleTipoCocina = () => {
        this.setState({ tipoCocinaOpen: !this.state.tipoCocinaOpen });
    }

    toggleHorarios = () => {
        this.setState({ horariosOpen: !this.state.horariosOpen });
    }

    toggleUbicacion = () => {
        this.setState({ ubicacionOpen: !this.state.ubicacionOpen });
    }



    render() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            window.location = '/'
        }
        else {
            return (
                <div>
                    <Row>
                        <Col md={{ size: 12 }} className="pt-3">
                            <Button block color="dark" onClick={this.toggleMesas} className="text-left">
                                <Row>
                                    <Col md="6" sm="9" xs="9" style={{ 'fontSize': '20px' }}>
                                        Mesas
                                    </Col>
                                    <Col md="6" sm="3" xs="3" className="text-right">
                                        {this.state.mesasOpen ?
                                            (<MdKeyboardArrowUp className="pt-1" size={25} />) :
                                            (<MdKeyboardArrowDown className="pt-1" size={25} />)}
                                    </Col>
                                </Row>
                            </Button>
                            <Col md="12" className="pt-2">
                                <Collapse isOpen={this.state.mesasOpen}>
                                    <ConfigMesa />
                                </Collapse>
                            </Col>
                        </Col>

                        <Col md={{ size: 12 }} className="pt-3">
                            <Button block color="dark" onClick={this.toggleTipoCocina} className="text-left">
                                <Row>
                                    <Col md="6" sm="9" xs="9" style={{ 'fontSize': '20px' }}>
                                        Tipos de cocina
                                    </Col>
                                    <Col md="6" sm="3" xs="3" className="text-right">
                                        {this.state.tipoCocinaOpen ?
                                            (<MdKeyboardArrowUp className="pt-1" size={25} />) :
                                            (<MdKeyboardArrowDown className="pt-1" size={25} />)}
                                    </Col>
                                </Row>
                            </Button>
                            <Col md="12" className="pt-2">
                                <Collapse isOpen={this.state.tipoCocinaOpen}>
                                    <ConfigTipoCocina />
                                </Collapse>
                            </Col>
                        </Col>

                        <Col md={{ size: 12 }} className="pt-3">
                            <Button block color="dark" onClick={this.toggleHorarios} className="text-left">
                                <Row>
                                    <Col md="6" sm="9" xs="9" style={{ 'fontSize': '20px' }}>
                                        Horarios
                                    </Col>
                                    <Col md="6" sm="3" xs="3" className="text-right">
                                        {this.state.horariosOpen ?
                                            (<MdKeyboardArrowUp className="pt-1" size={25} />) :
                                            (<MdKeyboardArrowDown className="pt-1" size={25} />)}
                                    </Col>
                                </Row>
                            </Button>
                            <Col md="12" className="pt-2">
                                <Collapse isOpen={this.state.horariosOpen}>
                                    <ConfigHorarios />
                                </Collapse>
                            </Col>
                        </Col>

                        <Col md={{ size: 12 }} className="pt-3">
                            <Button block color="dark" onClick={this.toggleUbicacion} className="text-left">
                                <Row>
                                    <Col md="6" sm="9" xs="9" style={{ 'fontSize': '20px' }}>
                                        Ubicación
                                    </Col>
                                    <Col md="6" sm="3" xs="3" className="text-right">
                                        {this.state.ubicacionOpen ?
                                            (<MdKeyboardArrowUp className="pt-1" size={25} />) :
                                            (<MdKeyboardArrowDown className="pt-1" size={25} />)}
                                    </Col>
                                </Row>
                            </Button>
                            <Col md="12" className="pt-2">
                                <Collapse isOpen={this.state.ubicacionOpen}>
                                    <ConfigUbicacion />
                                </Collapse>
                            </Col>
                        </Col>

                        
                    </Row>
                </div>
            );
        }
    }
}

export default ConfigRestaurante
