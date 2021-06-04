import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import Swal from 'sweetalert2';
export class RealizarReserva extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idRestaurante: this.props.location.state.idRestaurante,
            mesaReserva: this.props.location.state.mesaReserva ? this.props.location.state.mesaReserva : '',
            diaReserva: this.props.location.state.diaReserva ? this.props.location.state.diaReserva : '',
            horaReserva: this.props.location.state.horaReserva ? this.props.location.state.horaReserva : '',
            numComensales: this.props.location.state.numComensales ? this.props.location.state.numComensales : '',
            errors: {
                diaReserva: '',
                horaReserva: '',
                mesaReserva: '',
                numComensales: ''
            }
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
            let hoyDia = today.getDate();
            let hoyMes = today.getMonth() + 1;
            let hoyYear = today.getFullYear();

            let arrFecha = this.state.diaReserva.split('-');
            if (arrFecha[0] > hoyYear || arrFecha[1] > hoyMes || arrFecha[2] > hoyDia) {
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
            if (result.isConfirmed) {
                window.location = this.props.location.state.mesaReserva !== undefined ? '/user/sonicblazer' : '.'
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            this.reservaOK();
            console.log(this.state);
        }
    }


    render() {
        console.log(this.props.location.state.mesaReserva);
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
                                    <Input type="select" name="horaReserva" id="horaReserva" value={this.state.horaReserva}
                                        style={{ 'border': this.state.errors.horaReserva ? '1px solid red' : '' }}
                                        onChange={this.handleChange}
                                    >
                                        <option>16:00</option>
                                        <option>16:30</option>
                                        <option>17:30</option>
                                        <option>18:00</option>
                                        <option>18:30</option>
                                        <option>19:00</option>
                                        <option>19:30</option>
                                    </Input>

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

                        <FormGroup>
                            <Label for="mesaReserva">Seleccione la mesa</Label>
                            <Input type="select" value={this.state.mesaReserva}
                                id="mesaReserva" name="mesaReserva"
                                onChange={this.handleChange}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <Button color="success" lg>
                            {this.props.location.state.mesaReserva !== undefined ? 'Modificar reserva' : 'Realizar reserva'}
                        </Button>
                    </Form>
                </div>
            </div >
        )
    }
}

export default RealizarReserva
