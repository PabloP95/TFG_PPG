import React, { Component } from 'react'
import { Col, Modal, ModalHeader, ModalBody, Button, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import { BsPlusCircleFill } from 'react-icons/bs'
import Swal from 'sweetalert2';
import axios from 'axios';
import authHeader from '../../Security/auth/auth-header';
import ConfigMesa from './ConfigMesa';
export class CrearMesas extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(localStorage.getItem('user'));
        this.state = {
            mesas: [],
            numMesas: '',
            numOcupantes: this.props.numOcupantes ? this.props.numOcupantes : '',
            idRestaurante: user.user.userable_id,
            modalMesasOpen: false,
            errors: {
                numOcupantes: '',
                numMesas: ''
            },
            numeroConsultas: this.props.numeroConsultas,
        }
    }

    validate() {
        let allOK = true;
        let errors = {};



        if (!this.state.numOcupantes) {
            allOK = false;
            errors['numOcupantes'] = "Debe introducir el número de comensales de la mesa";
        }

        if (typeof this.state.numOcupantes !== 'undefined') {
            let regex = new RegExp(/\d+/);
            if (!regex.test(this.state.numOcupantes)) {
                allOK = false;
                errors['numOcupantes'] = "Debe introducir un número";
            }
        }

        if (typeof this.state.numMesas !== 'undefined') {
            if (this.state.numMesas <= 0) {
                allOK = false;
                errors['numMesas'] = "Error, el valor debe ser mayor que 0";
            }
        }
        this.setState({ errors });
        return allOK;
    }

    toggleNewTables = () => {
        this.setState({
            modalMesasOpen: !this.state.modalMesasOpen
        });
    }

    handleChangeNumMesas = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    handleSubmitMesas = (e) => {
        e.preventDefault();
        if (this.validate()) {
            axios.post('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/multiple-mesa',
                {
                    numMesas: this.state.numMesas,
                    numOcupantes: this.state.numOcupantes,
                },
                { headers: authHeader() }).then(res => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Mesas creadas',
                        text: res.data.message,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Cerrar',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.setState({ numeroConsultas: 1 + this.state.numeroConsultas }, () => {
                                if (this.props.onChange) {
                                    this.props.onChange(this.state.numeroConsultas);
                                }
                            })
                            this.toggleNewTables();
                        }
                    });
                })
        }
    }
    render() {
        return (
            <>
                <Col md={{ size: 4, offset: 8 }} className="mt-3 mr-0">
                    <Button color="info" onClick={this.toggleNewTables}><BsPlusCircleFill size={20} className="pb-1" /> Crear varias mesas</Button>
                </Col>
                <Modal className="pt-5" isOpen={this.state.modalMesasOpen} toggle={this.toggleNewTables}>
                    <ModalHeader toggle={this.toggleNewTables}>Crear varias mesas</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmitMesas}>
                            <FormGroup>
                                <Label for="numMesas">Número de mesas a crear</Label>
                                <Input type="number" min="0" name="numMesas" id="numMesas"
                                    style={{ 'border': this.state.errors.numMesas ? '1px solid red' : '' }}
                                    onChange={this.handleChangeNumMesas} placeholder="1" />
                                <div className="text-danger">{this.state.errors.numMesas}</div>
                            </FormGroup>

                            <FormGroup>
                                <Label for="numOcupantes">Número de comensales que tendrán <strong>todas</strong> las mesas creadas</Label>
                                <Input type="number" min="0" name="numOcupantes" id="numOcupantes"
                                    style={{ 'border': this.state.errors.numOcupantes ? '1px solid red' : '' }}
                                    onChange={this.handleChangeNumMesas} placeholder="1"
                                />
                                <div className="text-danger">{this.state.errors.numOcupantes}</div>
                            </FormGroup>
                            <Button block color="success" onClick={this.handleSubmitMesas}>Crear {this.state.numMesas} mesas</Button>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button block color="secondary" onClick={this.toggleNewTables}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default CrearMesas
