import axios from 'axios';
import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import authHeader from '../Security/auth/auth-header';
export class RealizarReserva extends Component {
    constructor(props) {
        super(props);
        if (this.props.location.state === undefined) {
            window.location = '/404'
        }
        this.state = {
            idRestaurante: this.props.location.state.idRestaurante,
            mesaReserva: this.props.location.state.mesaReserva ? this.props.location.state.mesaReserva : '',
            diaReserva: this.props.location.state.diaReserva ? this.props.location.state.diaReserva : '',
            horaReserva: this.props.location.state.horaReserva ? this.props.location.state.horaReserva : '',
            numComensales: this.props.location.state.numComensales ? this.props.location.state.numComensales : '',
            horarios: [],
            mesas: [],
            errors: {
                diaReserva: '',
                horaReserva: '',
                mesaReserva: '',
                numComensales: ''
            }
        }
    }

    componentDidMount() {
        if (this.state.diaReserva !== '') {
            const dia = new Date(this.state.diaReserva);
            console.log(dia);
            const weekday = dia.getDay();
            console.log('Numero dia de la semana = ' + weekday);
            const diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/horarioReserva/' + diaSemana[weekday]).then(res => {
                this.setState({
                    horarios: res.data
                })
            })
        }
        if (this.state.numComensales !== '') {
            axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/mesas/' + this.state.numComensales).then(res => {
                this.setState({
                    mesas: res.data
                })
            })
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.diaReserva !== this.state.diaReserva) {
            const dia = new Date(this.state.diaReserva);
            console.log(dia);
            const weekday = dia.getDay();
            console.log('Numero dia de la semana = ' + weekday);
            const diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/horarioReserva/' + diaSemana[weekday]).then(res => {
                this.setState({
                    horarios: res.data
                })
            })
        }

        if (prevState.numComensales !== this.state.numComensales) {
            axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/mesas/' + this.state.numComensales).then(res => {
                this.setState({
                    mesas: res.data
                })
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }


    validate() {
        let allOK = true;
        let errors = {};

        if (!this.state.diaReserva) {
            allOK = false;
            errors['diaReserva'] = "Debe introducir una fecha para realizar la reserva";
        }

        else if (typeof this.state.diaReserva !== 'undefined') {
            let today = new Date();
            let hoyMes = today.getMonth() + 1;
            let hoyYear = today.getFullYear();

            let arrFecha = this.state.diaReserva.split('-');
            if (arrFecha[0] < hoyYear || arrFecha[1] < hoyMes) {
                allOK = false;
                errors['diaReserva'] = "La fecha proporcionada no es válida";
            }
        }

        if (!this.state.numComensales) {
            allOK = false;
            errors['numComensales'] = "Debe introducir el número de comensales";
        }

        this.setState({ errors });
        return allOK;
    }

    reservaOK = () => {
        Swal.fire({
            icon: 'success',
            title: this.props.location.state.mesaReserva !== undefined ? 'Reserva modificada' : 'Reserva creada',
            text: this.props.location.state.mesaReserva !== undefined ? 'Reserva modificada satisfactoriamente' : 'Reserva creada satisfactoriamente.\nPodrá modificarla o cancelarla en su panel de usuario',
            confirmButtonColor: '#3085d6',
            confirmButtonText: this.props.location.state.mesaReserva !== undefined ? 'Volver a la página del usuario' : 'Volver a la página del restaurante'
        }).then((result) => {
            let user = JSON.parse(localStorage.getItem('user'));
            if (result.isConfirmed) {
                window.location = this.props.location.state.mesaReserva !== undefined ? '/user/' + user.user.name : '.'
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            let user = JSON.parse(localStorage.getItem('user'));
            const dia = new Date(this.state.diaReserva);
            const weekday = dia.getDay();
            const diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            console.log(diaSemana[weekday]);
            {
                this.props.location.state.idReserva !== '' ? (
                    axios.put('http://127.0.0.1:8000/api/client/reserva/' + this.props.location.state.idReserva,
                        {
                            restaurant_id: this.state.idRestaurante,
                            table_id: this.state.mesaReserva,
                            client_id: user.user.userable_id,
                            diaReserva: this.state.diaReserva,
                            horaReserva: this.state.horaReserva
                        },
                        {
                            headers: authHeader()
                        }).then(() => {
                            this.reservaOK();
                        })
                ) : (

                    axios.post('http://127.0.0.1:8000/api/client/' + user.user.userable_id + '/reserva',
                        {
                            restaurant_id: this.state.idRestaurante,
                            table_id: this.state.mesaReserva,
                            client_id: user.user.userable_id,
                            diaReserva: this.state.diaReserva,
                            horaReserva: this.state.horaReserva
                        },
                        {
                            headers: authHeader()
                        }).then(() => {
                            this.reservaOK();
                        })
                )
            }
        }
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="container p-4">
                    <h3>{this.props.location.state.mesaReserva !== undefined ? 'Modificando' : 'Realizando'} reserva en {this.props.location.state.nomRestaurante}</h3>
                </div>

                <div className="container p-2">
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label for="diaReserva">Seleccione un día</Label>
                                    <Input type="date" name="diaReserva" id="diaReserva" value={this.state.diaReserva}
                                        style={{ 'border': this.state.errors.diaReserva ? '1px solid red' : '' }}
                                        onChange={this.handleChange}
                                    />
                                    <div className="text-danger">{this.state.errors.diaReserva}</div>
                                </FormGroup>
                            </Col>

                            <Col md="6">
                                <FormGroup>
                                    <Label for="horaReserva">Seleccione una hora</Label>
                                    {this.state.horarios.length === 1 ? (
                                        <Input type="select" name="horaReserva" id="horaReserva" value={this.state.horaReserva}
                                            style={{ 'border': this.state.errors.horaReserva ? '1px solid red' : '' }}
                                            onChange={this.handleChange} disabled={true}
                                        >
                                            <option hidden={true}>El restaurante está cerrado</option>
                                        </Input>
                                    ) : (
                                        <Input type="select" name="horaReserva" id="horaReserva" value={this.state.horaReserva}
                                            style={{ 'border': this.state.errors.horaReserva ? '1px solid red' : '' }}
                                            onChange={this.handleChange}
                                        >
                                            <option hidden={true}>Elija una hora para realizar la reserva</option>
                                            {this.state.horarios.map(horario => (
                                                <option key={horario.id}>{horario}</option>
                                            ))}
                                        </Input>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup>
                            <Label for="numComensales">Seleccione el número de comensales</Label>
                            <Input type="number" name="numComensales" id="numComensales" value={this.state.numComensales}
                                style={{ 'border': this.state.errors.numComensales ? '1px solid red' : '' }}
                                onChange={this.handleChange}
                            />
                            <div className="text-danger">{this.state.errors.numComensales}</div>
                        </FormGroup>
                        {this.state.numComensales === '' ? ('') : (
                            <FormGroup>
                                <Label for="mesaReserva">Seleccione la mesa</Label>
                                <Input type="select" value={this.state.mesaReserva}
                                    id="mesaReserva" name="mesaReserva"
                                    onChange={this.handleChange}
                                >
                                    {this.state.mesas.length > 0 ? (
                                        <option hidden={true}>Escoja la mesa</option>
                                    ) : (<option hidden={true}>No existen mesas con ese número de ocupantes</option>)
                                    }
                                    {this.state.mesas.map(mesa => (
                                        <option value={mesa.idMesa} key={mesa.idMesa}>{mesa.numMesa}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        )}

                        <Button color="success" lg="true">
                            {this.props.location.state.mesaReserva !== undefined ? 'Modificar reserva' : 'Realizar reserva'}
                        </Button>
                    </Form>
                </div>
            </div >
        )
    }
}

export default RealizarReserva
