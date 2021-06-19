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
            alergenos: [],
            alergenosSeleccionados: [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/alergenos').then(res => {
            this.setState({
                alergenos: res.data
            })
        });
        axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante).then((res) => {
            this.setState({
                nomRestaurante: res.data[0].name,
            })
        }).catch(error => {
            if (error.response && error.response.status === 422) {
                window.location = '/404'
            }
        })

        axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/platos').then((res) => {
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
            this.setState({
                entrantes: arrEntrantes,
                pprincipal: arrPrincipal,
                bebidas: arrBebidas,
                postres: arrPostres,
            });
        }).catch(error => {
            if (error.response && error.response.status === 422) {
                window.location = '/404'
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.alergenosSeleccionados !== this.state.alergenosSeleccionados) {
            if (this.state.alergenosSeleccionados.length !== 0) {
                axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/filtro/' + this.state.alergenosSeleccionados).then(res => {
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
                    this.setState({
                        entrantes: arrEntrantes,
                        pprincipal: arrPrincipal,
                        bebidas: arrBebidas,
                        postres: arrPostres,
                    });
                })
            }
            else {
                axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/platos').then((res) => {
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
                    this.setState({
                        entrantes: arrEntrantes,
                        pprincipal: arrPrincipal,
                        bebidas: arrBebidas,
                        postres: arrPostres,
                    });
                })
            }
        }
    }
    handleChangeAlergenos = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const id = target.id;
        let arr = [...this.state.alergenosSeleccionados];

        if (value) {
            this.setState({
                alergenosSeleccionados: [...arr, id]
            })
        }
        else {
            if (arr.indexOf(id) === 0) {
                this.setState({
                    alergenosSeleccionados: arr.slice(0, 0).concat(arr.slice(1, arr.length + 1))
                })
            } else if (arr.indexOf(id) !== 0) {
                this.setState({
                    alergenosSeleccionados: arr.slice(0, arr.indexOf(id)).concat(arr.slice(arr.indexOf(id) + 1, arr.length + 1))
                })
            }
        }
    }

    render() {
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
                    <Col md="5" className="bg-light">
                        <Row className="p-2">
                            <p>Filtro por alérgenos</p>
                            <Form>
                                <Row>
                                    {
                                        this.state.alergenos.map(alergeno => (
                                            <Col md="6" key={alergeno.id}>
                                                <FormGroup check className="move-left checkbox-inline">
                                                    <Input type="checkbox" name={alergeno.nomAlergeno} id={alergeno.id} onChange={this.handleChangeAlergenos} />
                                                    <Label style={{ 'whiteSpace': 'nowrap' }} check>{alergeno.nomAlergeno}</Label>
                                                </FormGroup>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Form>
                        </Row>
                        <hr />
                    </Col>
                    {/* Platos */}
                    <Col md="7" xs="12">
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
