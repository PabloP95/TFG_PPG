import React, { Component } from 'react'
import { Col, Modal, ModalHeader, ModalBody, Button, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import { BsPlusCircleFill } from 'react-icons/bs'
import Swal from 'sweetalert2';
export class CrearMesa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoMesa: {
                numMesa: this.props.numMesa ? this.props.numMesa : '',
                numComensales: this.props.numComensales ? this.props.numComensales : '',
            },
            modalMesaOpen: false,
            errors: {
                numMesa: '',
                numComensales: ''
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

        if (!this.state.infoMesa.numComensales) {
            allOK = false;
            errors['numComensales'] = "Debe introducir el número de comensales de la mesa";
        }

        else if (typeof this.state.infoMesa.numMesa !== 'undefined') {
            let regex = new RegExp(/\d+/);
            if (!regex.test(this.state.infoMesa.numMesa)) {
                allOK = false;
                errors['numMesa'] = "Debe introducir un número";
            }
        }

        else if (typeof this.state.infoMesa.numComensales !== 'undefined') {
            let regex = new RegExp(/\d+/);
            if (!regex.test(this.state.infoMesa.numComensales)) {
                allOK = false;
                errors['numComensales'] = "Debe introducir un número";
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
            confirmButtonText: 'Volver a la pantalla de las mesas',
        }).then((result) => {
            if (result.isConfirmed) {
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
            this.alertNewTable();
            console.log("Numero de mesa = " + this.state.infoMesa.numMesa +
                "\nNumero de comensales = " + this.state.infoMesa.numComensales);
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
                                <Label for="numComensales">Número de comensales en la mesa</Label>
                                <Input type="number" min="0" name="numComensales" id="numComensales"
                                    style={{ 'border': this.state.errors.numComensales ? '1px solid red' : '' }}
                                    onChange={this.handleChange} value={this.state.infoMesa.numComensales}
                                />
                                <div className="text-danger">{this.state.errors.numComensales}</div>
                            </FormGroup>
                            <Button block color="success">Guardar mesa</Button>
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
