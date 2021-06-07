import React, { Component } from 'react'
import { Row, Col, Form, Input, FormGroup, Label } from 'reactstrap'
import { IoArrowBackCircle } from 'react-icons/io5';
import axios from 'axios';
import NavCarta from './NavCarta'
import Entrantes from './Entrantes';
import PlatosPrincipales from './PlatosPrincipales';
import Bebidas from './Bebidas';
import Postres from './Postres';

import './menu.css';


export class Menu extends Component {
    constructor(props) {
        super(props);
        let arr = window.location.href.split('/');
        this.state = {
            idRestaurante: arr[5],
            pprincipal: [],
            entrantes: [],
            postres: [],
            bebidas: [],
            nomRestaurante: '',
            glutenSI: false,
            lacteosSI: false,

            veganaSI: false,
            vegetaSI: false,
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante).then((res) => {
            this.setState({
                nomRestaurante: res.data[0].name,
            })
        })

        axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/platos').then((res) => {
            console.log(res.data);
            let arrPrincipal = [];
            let arrEntrantes = [];
            let arrBebidas = [];
            let arrPostres = [];
            res.data.map((plato) =>
                (plato.tipo_plato === 'Entrantes') ? (arrEntrantes.push(plato)) :
                    (plato.tipo_plato === 'Platos principales') ? (arrPrincipal.push(plato)) :
                        (plato.tipo_plato === 'Bebidas') ? arrBebidas.push(plato) :
                            (plato.tipo_plato === 'Postres') ? arrPostres.push(plato)
                                : (''))
            console.log('arrPrincipal = ' + arrPrincipal);
            this.setState({
                entrantes: arrEntrantes,
                pprincipal: arrPrincipal,
                bebidas: arrBebidas,
                postres: arrPostres,
            });
        })
    }


    handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    render() {
        console.log('Todos los platos en Menu.js: ' + this.state.platos);
        console.log('Opciones escogidas: ');
        console.log("Gluten: " + this.state.glutenSI);
        console.log("Lacteos: " + this.state.lacteosSI);

        const lastCharOfURL = window.location.href.charAt(window.location.href.length - 1);
        return (
            <div>
                <Row className="p-4 ">
                    <Col md="2" sm="2">
                        {lastCharOfURL === '/' ? (
                            <h2><a href=".." className="text-left text-dark"><IoArrowBackCircle /></a></h2>
                        ) : (
                            <h2><a href="." className="text-left text-dark"><IoArrowBackCircle /></a></h2>
                        )}
                    </Col>
                    <Col md="10" sm="10">
                        <h3 className="text-center">Carta {this.state.nomRestaurante}</h3>
                    </Col>
                </Row>
                <NavCarta />
                <Row className="p-5">
                    {/* Filtro Platos */}
                    <Col md="4" className="bg-light">
                        <Row className="p-3">
                            <Form className="form-horizontal">
                                <p>Filtro por alérgenos</p>
                                <FormGroup check className="move-left checkbox-inline">
                                    <Input type="checkbox" name="glutenSI" id="glutenSI" checked={this.state.glutenSI} onChange={this.handleChange} />
                                    <Label check for="glutenSI">Gluten</Label>
                                </FormGroup>
                                <FormGroup check className="move-left checkbox-inline">
                                    <Input type="checkbox" name="lacteosSI" id="lacteosSI" checked={this.state.lacteosSI} onChange={this.handleChange} />
                                    <Label check for="lacteosSI">Lacteos</Label>
                                </FormGroup>
                            </Form>
                        </Row>

                        <hr />

                        <Row className="p-3">
                            <Form className="form-horizontal">
                                <p>Tipos de dieta</p>
                                <FormGroup check className="move-left checkbox-inline">
                                    <Input type="checkbox" name="veganaSI" id="veganaSI" checked={this.state.veganaSI} onChange={this.handleChange} />
                                    <Label check for="glutenSI">Vegana</Label>
                                </FormGroup>
                                <FormGroup check className="move-left checkbox-inline">
                                    <Input type="checkbox" name="vegetaSI" id="vegetaSI" checked={this.state.vegetaSI} onChange={this.handleChange} />
                                    <Label check for="vegetaSI">Vegetariana</Label>
                                </FormGroup>
                            </Form>
                        </Row>
                        <hr />
                    </Col>
                    {/* Platos */}
                    <Col md="8" xs="12">
                        <div className="tab-content bg-light" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-entrantes" role="tabpanel" aria-labelledby="pills-entrantes-tab">
                                <Entrantes entrantes={this.state.entrantes} idRestaurante={this.state.idRestaurante} />
                            </div>
                            <div className="tab-pane fade" id="pills-platosprincipales" role="tabpanel" aria-labelledby="pills-platosprincipales-tab">
                                <PlatosPrincipales pprincipales={this.state.pprincipal} idRestaurante={this.state.idRestaurante} />
                            </div>
                            <div className="tab-pane fade" id="pills-bebidas" role="tabpanel" aria-labelledby="pills-bebidas-tab">
                                <Bebidas bebidas={this.state.bebidas} idRestaurante={this.state.idRestaurante} />
                            </div>
                            <div className="tab-pane fade" id="pills-postres" role="tabpanel" aria-labelledby="pills-postres-tab">
                                <Postres postres={this.state.postres} idRestaurante={this.state.idRestaurante} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Menu
