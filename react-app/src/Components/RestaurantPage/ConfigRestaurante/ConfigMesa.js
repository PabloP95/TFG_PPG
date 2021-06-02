import React, { Component } from 'react'
import { Row, Col, Button, Card, CardText } from 'reactstrap'
import Swal from 'sweetalert2';
import CrearMesa from './CrearMesa';
import CrearMesas from './CrearMesas';
import axios from 'axios';
import authHeader from '../../Security/auth/auth-header';
export class ConfigMesa extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            mesas: [],
            idRestaurante: '',
            numeroConsultas: 0,
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        this.setState({
            idRestaurante: user.user.userable_id,
        });

        axios.get('http://127.0.0.1:8000/api/restaurant/' + user.user.userable_id + '/mesas', {
            headers: authHeader(),
        }).then(res => {
            this.setState({
                mesas: res.data,
                numeroConsultas: this.state.numeroConsultas++
            });
        })
    }
    eventHandler = (data) => {
        this.setState({ numeroConsultas: data });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.numeroConsultas !== this.state.numeroConsultas) {
            axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/mesas', {
                headers: authHeader(),
            }).then(res => {
                this.setState({
                    mesas: res.data
                });
            })
        }
    }

    checkTableDelete = (idMesa) => {
        Swal.fire({
            icon: 'warning',
            title: 'Eliminar mesa?',
            text: '¿Quiere eliminar la mesa?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar mesa',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/mesa/' + idMesa.target.id,
                    {
                        headers: authHeader(),
                    }).then(() => {
                        this.setState({
                            numeroConsultas: this.state.numeroConsultas++
                        })
                    });
                Swal.fire({
                    icon: 'success',
                    title: 'Mesa eliminada!',
                    text: 'La mesa ha sido eliminada correctamente',
                    timer: 2000,
                })
            }
        });
    }
    render() {
        return (
            <div>
                <Row className="p-2">
                    <CrearMesa numeroConsultas={this.state.numeroConsultas + this.state.numeroConsultas + 1} onChange={this.eventHandler} />
                    <CrearMesas numeroConsultas={this.state.numeroConsultas + this.state.numeroConsultas} onChange={this.eventHandler} />
                </Row>

                <Row className="p-2">
                    {this.state.mesas.length !== 0 ? ('') : (
                        <Col md="12" sm="12" className="p-2">
                            <p className="text-center">Para crear una mesa, pulse en el botón correspondiente</p>
                        </Col>
                    )}
                    {this.state.mesas.map(mesa => (
                        <Col md="6" sm="6" className="p-2" key={mesa.idMesa}>
                            <Card body>
                                <CardText>
                                    Número de mesa: {mesa.numMesa}
                                    <br />
                                    Número de ocupantes: {mesa.numOcupantes}
                                </CardText>
                                <Row>
                                    <Col md="6" sm="12" className="mb-2">
                                        <CrearMesa numeroConsultas={this.state.numeroConsultas} onChange={this.eventHandler}
                                            nomBoton="Editar Mesa" idMesa={mesa.idMesa} numMesa={mesa.numMesa} numOcupantes={mesa.numOcupantes} />
                                    </Col>
                                    <Col md="6" sm="12" className="mb-2">
                                        <Button id={mesa.idMesa} color="danger" onClick={this.checkTableDelete}>Eliminar mesa</Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}

                </Row>
            </div>
        )
    }
}

export default ConfigMesa
