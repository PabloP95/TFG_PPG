import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import { IoArrowBackCircle } from 'react-icons/io5';
import Trunc from '../../functions/Trunc';
import axios from 'axios';
export class DetallePlato extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alergenosPlato: [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/plato/' + this.props.location.state.idPlato + "/alergenos").then((res) => {
            this.setState({
                alergenosPlato: res.data
            })
        })
    }
    render() {
        let moneda = localStorage.getItem('moneda');
        let dinero = localStorage.getItem('dinero');
        if (moneda === null && dinero === null) {
            moneda = '€';
            dinero = 1;
        }
        let precio = '';
        if (this.props.location.state === undefined) {
            window.location = '/404'
        }
        else {
            precio = this.props.location.state.precio;
        }

        return (
            <div className="p-4">
                <Row>
                    <Col md="12" sm="12" className="pb-5">
                        <h2 className="text-left"><a href="." className="text-left text-dark" style={{ 'textDecoration': 'none' }}><IoArrowBackCircle /> Volver a la carta</a></h2>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <figure className="figure">
                            <img src={this.props.location.state.imgURL} alt="Imagen plato" />
                            <figcaption>
                                <Row>
                                    <Col md="12">{this.props.location.state.nombrePlato}</Col>
                                    <Col md="12">{< Trunc x={dinero * precio} posiciones={2} />} {moneda}</Col>
                                </Row>
                            </figcaption>
                        </figure>
                    </Col>

                    <Col md="6">
                        <Row>
                            <Col md="12" sm="12" className="pt-3 pl-2">
                                <h3>Descripción</h3>
                                <Row>
                                    <Col md="12" sm="12" className="pt-1">
                                        {this.props.location.state.descripcion}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {/* Alergenos */}
                <Row className="p-3 pt-3">
                    <Col md="12" sm="12">
                        <br />
                        <h5>Alérgenos</h5>
                    </Col>
                </Row>
                <Row className="p-3 mt-2">
                    {this.state.alergenosPlato.length !== 0 ? (
                        this.state.alergenosPlato.map(alergeno => (
                            <Col md="4" sm="4" xs="4" key={alergeno.id}>
                                <img src={alergeno.img} width="100" height="100" className="rounded-circle border border-secondary" alt="Alergeno 1" />
                                <figcaption>
                                    <p>{alergeno.nomAlergeno}</p>
                                </figcaption>
                            </Col>
                        ))

                    ) : <Col md="12" className="pl-5 pb-2"><p>Este plato no tiene alérgenos</p></Col>}
                </Row>
            </div>
        )
    }
}

export default DetallePlato
