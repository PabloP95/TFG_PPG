import React, { Component } from 'react'
import { Col, Modal, ModalHeader, ModalBody, Button, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import { BsPlusCircleFill } from 'react-icons/bs'
import Swal from 'sweetalert2';
import axios from 'axios';
import authHeader from '../../Security/auth/auth-header';

import CrearMesas from './CrearMesas';
export class CrearMesa extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(localStorage.getItem('user'));
        this.state = {
            mesas: [],
            infoMesa: {
                numMesa: this.props.numMesa ? this.props.numMesa : '',
                numOcupantes: this.props.numOcupantes ? this.props.numOcupantes : '',
                idMesa: this.props.idMesa ? this.props.idMesa : '',
                idRestaurante: user.user.userable_id,
            },
            numeroConsultas: this.props.numeroConsultas,
            modalMesaOpen: false,
            errors: {
                numMesa: '',
                numOcupantes: '',
                numMesas: ''
            }
        }
    }


    validate() {
        let allOK = true;
        let errors = {};

        if (!this.state.infoMesa.numMesa) {
            allOK = false;
            errors['numMesa'] = "Debe introducir el número de mesa";
        }

        if (!this.state.infoMesa.numOcupantes) {
            allOK = false;
            errors['numOcupantes'] = "Debe introducir el número de comensales de la mesa";
        }

        else if (typeof this.state.infoMesa.numMesa !== 'undefined') {
            let regex = new RegExp(/\d+/);
            if (!regex.test(this.state.infoMesa.numMesa)) {
                allOK = false;
                errors['numMesa'] = "Debe introducir un número";
            }
        }

        else if (typeof this.state.infoMesa.numOcupantes !== 'undefined') {
            let regex = new RegExp(/\d+/);
            if (!regex.test(this.state.infoMesa.numOcupantes)) {
                allOK = false;
                errors['numOcupantes'] = "Debe introducir un número";
            }
        }
        this.setState({ errors });
        return allOK;
    }


    alertNewTable = () => {
        Swal.fire({
            icon: 'success',
            title: this.props.nomBoton ? 'Mesa editada' : 'Mesa creada',
            text: this.props.nomBoton ? 'Se han cambiado los datos de la mesa satisfactoriamente.' : 'Mesa creada satisfactoriamente.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Cerrar',
        }).then((result) => {
            if (result.isConfirmed) {
                this.setState({ numeroConsultas: 1 + this.state.numeroConsultas }, () => {
                    if (this.props.onChange) {
                        this.props.onChange(this.state.numeroConsultas);
                    }
                })
                this.toggleNewTable();
            }
        });
    }
    toggleNewTable = () => {
        this.setState({
            modalMesaOpen: !this.state.modalMesaOpen
        });
    }

    handleChange = (e) => {
        const { infoMesa } = this.state;
        infoMesa[e.target.name] = e.target.value;
        this.setState({ infoMesa });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            this.props.nomBoton ? (
                axios.put('http://127.0.0.1:8000/api/restaurant/' + this.state.infoMesa.idRestaurante + '/mesa/' + this.state.infoMesa.idMesa,
                    {
                        numMesa: this.state.infoMesa.numMesa,
                        numOcupantes: this.state.infoMesa.numOcupantes,
                    },
                    { headers: authHeader() }
                ).then(() => {
                    this.alertNewTable();
                }).catch(error => {
                    if (error.response) {
                        if (error.response.status === 400) {
                            this.setState({ errors: JSON.parse(error.response.data) });
                        }
                    }
                })
            ) : (
                axios.post('http://127.0.0.1:8000/api/restaurant/' + this.state.infoMesa.idRestaurante + '/mesa',
                    {
                        restaurant_id: this.state.infoMesa.idRestaurante,
                        numMesa: this.state.infoMesa.numMesa,
                        numOcupantes: this.state.infoMesa.numOcupantes
                    },
                    {
                        headers: authHeader()
                    }).then(() => {
                        this.alertNewTable();
                    }).catch(error => {
                        if (error.response) {
                            if (error.response.status === 400) {
                                this.setState({ errors: JSON.parse(error.response.data) });
                            }
                        }
                    })
            )
        }
    }
    render() {
        return (
            <>
                {this.props.nomBoton ? (
                    <Button color="info" onClick={this.toggleNewTable}>Editar mesa</Button>
                ) : (
                    <Col md={{ size: 4, offset: 8 }} className="mt-3 mr-0">
                        <Button color="info" onClick={this.toggleNewTable}><BsPlusCircleFill size={20} className="pb-1" /> Crear mesa</Button>
                    </Col>
                )}

                <Modal className="pt-5" isOpen={this.state.modalMesaOpen} toggle={this.toggleNewTable}>
                    <ModalHeader toggle={this.toggleNewTable}>{this.props.nomBoton ? this.props.nomBoton : 'Nueva mesa'}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="numMesa">Número de mesa</Label>
                                <Input type="number" min="0" name="numMesa" id="numMesa"
                                    style={{ 'border': this.state.errors.numMesa ? '1px solid red' : '' }}
                                    onChange={this.handleChange} value={this.state.infoMesa.numMesa}
                                />
                                <div className="text-danger">{this.state.errors.numMesa}</div>
                            </FormGroup>

                            <FormGroup>
                                <Label for="numOcupantes">Número de comensales en la mesa</Label>
                                <Input type="number" min="0" name="numOcupantes" id="numOcupantes"
                                    style={{ 'border': this.state.errors.numOcupantes ? '1px solid red' : '' }}
                                    onChange={this.handleChange} value={this.state.infoMesa.numOcupantes}
                                />
                                <div className="text-danger">{this.state.errors.numOcupantes}</div>
                            </FormGroup>
                            <Button block color="success" onClick={this.handleSubmit}>Guardar mesa</Button>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button block color="secondary" onClick={this.toggleNewTable}>Cancelar</Button>
                    </ModalFooter>
                </Modal>


            </>
        )
    }
}

export default CrearMesa
