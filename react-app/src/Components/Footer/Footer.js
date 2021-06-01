
import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import './footer.css'

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            paises: [],
            moneda: [],
            cambiarMonedaVisible: false,
            cambiarLenguajeVisible: false,
        };
    }
    /*componentDidMount() {
        axios.get('http://data.fixer.io/api/latest?access_key=a56c69f15f87d2bcf6c92b4c138a8a70&symbols=USD,AUD,CAD,MXN,EUR')
            .then(res => {
                this.setState({
                    paises: Object.keys(res.data.rates),
                    moneda: Object.values(res.data.rates)
                });
            });
        }
        */
    toggleMoneda = () => {
        this.setState({
            cambiarMonedaVisible: !this.state.cambiarMonedaVisible
        });
    }

    toggleIdioma = () => {
        this.setState({
            cambiarLenguajeVisible: !this.state.cambiarLenguajeVisible
        });
    }

    handleChangeMoneda = (e) => {
        this.setState({
            value: e.target.value,
        });

        localStorage.setItem('moneda', this.state.paises[e.target.value]);
        localStorage.setItem('dinero', this.state.moneda[e.target.value]);

    }
    render() {
        let monedaActual = localStorage.getItem('moneda');
        let idiomaActual = localStorage.getItem('idioma');
        return (
            <footer className="d-flex align-items-center footer" style={{ 'fontSize': '0.95rem' }}>
                <Container>
                    <hr />
                    <Row>
                        <Col className="pt-2">
                            <strong><p>eRestaurant</p></strong>
                            <p>&copy;2021</p>
                        </Col>
                        <Col className="pt-2">
                            <strong><p>Acciones</p></strong>
                            <p><a href="/signup" style={{ textDecoration: 'none' }}>Unirse</a></p>
                            <p><a href="/paginaprueba" style={{ textDecoration: 'none' }}>Página de pruebas</a></p>
                        </Col>
                        <Col className="pt-2">
                            <strong><p>Internacionalización</p></strong>
                            <p
                                style={{ 'cursor': 'pointer' }}
                                className="text-primary"
                                onClick={this.toggleMoneda}>Cambiar moneda
                            </p>
                            <Modal isOpen={this.state.cambiarMonedaVisible} toggle={this.toggleMoneda}>
                                <ModalHeader toggle={this.toggleMoneda}>Cambio de moneda</ModalHeader>
                                <ModalBody>
                                    <p>Moneda actual: {monedaActual ? monedaActual : 'EUR'}</p>
                                    <Form>
                                        <FormGroup>
                                            <Label for="selectMoneda">Cambiar moneda</Label>
                                            <Input type="select" value={this.state.value} name="selectMoneda" id="selectMoneda" onChange={this.handleChangeMoneda}>
                                                {this.state.paises.map((pais) => <option key={this.state.paises.indexOf(pais)} value={this.state.paises.indexOf(pais)}>{pais}</option>)}
                                            </Input>
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.toggleMoneda}>Cambiar moneda</Button>
                                    <Button color="secondary" onClick={this.toggleMoneda}>Cerrar</Button>
                                </ModalFooter>
                            </Modal>
                            <p
                                style={{ 'cursor': 'pointer' }}
                                className="text-primary"
                                onClick={this.toggleIdioma}>Cambiar lenguaje
                            </p>

                            <Modal isOpen={this.state.cambiarLenguajeVisible} toggle={this.toggleIdioma}>
                                <ModalHeader toggle={this.toggleIdioma}>Cambio de idioma</ModalHeader>
                                <ModalBody>
                                    <p>Idioma actual: Español castellano</p>
                                    <Form>
                                        <Label for="selectIdiomas">Idiomas disponibles</Label>
                                        <Input type="select" name="selectIdiomas" id="selectIdiomas" onChange={this.changeIdiomas}>
                                            <option>Inglés</option>
                                            <option>Francés</option>
                                            <option>Italiano</option>
                                        </Input>

                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.toggleIdioma}>Cambiar idioma</Button>
                                    <Button color="secondary" onClick={this.toggleIdioma}>Cerrar</Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                        <Col className="pt-2">
                            <strong><p>Acerca de</p></strong>
                            <p><a href="/aviso-legal" style={{ textDecoration: 'none' }}>Aviso Legal</a></p>
                            <p><a href="/politica-privacidad" style={{ textDecoration: 'none' }}>Política de privacidad</a></p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
}


