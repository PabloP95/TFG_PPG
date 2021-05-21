import React, { Component } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, Button, Col
} from 'reactstrap';

export class CrearOpinion extends Component {
    constructor(props) {
        super(props);
        let now = new Date();
        let fecha = "";
        fecha += now.getDate();
        fecha += "/";
        fecha += "0" + (now.getMonth() + 1);
        fecha += "/";
        fecha += now.getFullYear();
        this.state = {
            opinion: {
                notaOpinion: '',
                restauranteOpinion: '',
                opinionUser: '',
                fechaOpinion: fecha
            },
            errors: {
                notaOpinion: '',
                restauranteOpinion: ''
            },
            modalOpen: false,

        }
    }

    toggle = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    validate() {
        let allOK = true;
        let errors = {};
        if (!this.state.opinion.notaOpinion) {
            allOK = false;
            errors['notaOpinion'] = "Introduzca la nota que le quiere dar al restaurante";
        }
        else if (typeof this.state.opinion.notaOpinion !== 'undefined') {
            if (this.state.opinion.notaOpinion < 0 || this.state.opinion.notaOpinion > 5) {
                allOK = false;
                errors['notaOpinion'] = "La nota debe estar entre 0 y 5";
            }
        }

        if (!this.state.opinion.restauranteOpinion) {
            allOK = false;
            errors['restauranteOpinion'] = "Introduzca el restaurante al que le esta realizando la opinión";
        }

        this.setState({ errors });
        return allOK;
    }

    handleChange = (e) => {
        const { opinion } = this.state;
        opinion[e.target.name] = e.target.value;
        this.setState({ opinion });
    }
    //Aqui lo que hacemos es meter en la base de datos la opinion. y en lo de OpinionesUser leemos la base de datos con un map, y listo.
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            console.log(this.state.opinion);
        }
    }

    render() {
        return (
            <>
                <Col md={{ size: 4, offset: 8 }} className="p-4">
                    <Button color="info" onClick={this.toggle}><BsPlusCircleFill size={20} className="pb-1" /> Realizar opinión</Button>
                </Col>

                <Modal scrollable className="pt-5" isOpen={this.state.modalOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Nueva opinión</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="notaOpinion">Nota (max. 5)</Label>
                                <Input type="number" style={{ 'border': this.state.errors.notaOpinion ? '1px solid red' : '' }}
                                    name="notaOpinion" id="notaOpinion" value={this.state.opinion.notaOpinion}
                                    onChange={this.handleChange} max="5" min="0" />
                                <div className="text-danger">{this.state.errors.notaOpinion}</div>
                            </FormGroup>

                            <FormGroup>
                                <Label for="restauranteOpinion">Restaurante</Label>
                                <Input type="text" style={{ 'border': this.state.errors.restauranteOpinion ? '1px solid red' : '' }}
                                    name="restauranteOpinion" id="restauranteOpinion" value={this.state.opinion.restauranteOpinion}
                                    onChange={this.handleChange} />
                                <div className="text-danger">{this.state.errors.restauranteOpinion}</div>
                            </FormGroup>

                            <FormGroup>
                                <Label for="opinionUser">Opinión (opcional)</Label>
                                <Input type="textarea" name="opinionUser" id="opinionUser" value={this.state.opinion.opinionUser}
                                    onChange={this.handleChange} />
                            </FormGroup>

                            <Button block color="success">Realizar opinión</Button>
                        </Form>
                    </ModalBody>
                    <ModalFooter>

                        <Button block color="secondary" onClick={this.toggle}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default CrearOpinion
