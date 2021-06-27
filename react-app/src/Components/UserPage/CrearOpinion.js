import React, { Component } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, Button, Col
} from 'reactstrap';

import axios from 'axios'
import Swal from 'sweetalert2';
import './botonesStyle.css'
import authHeader from '../Security/auth/auth-header';

export class CrearOpinion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurantes: [],
            opinion: {
                nota: this.props.nota ? this.props.nota : '',
                restauranteOpinion: this.props.idRestaurante ? this.props.idRestaurante : '',
                comentario: this.props.comentario ? this.props.comentario : '',
                numeroConsultas: this.props.numeroConsultas,
            },
            errors: {
                nota: '',
                restauranteOpinion: '',
                comentario: '',
                client_id: ''
            },

            modalOpen: false,

        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/restaurants').then(res => {
            this.setState({ restaurantes: res.data })
        })
    }

    toggle = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    validate() {
        let allOK = true;
        let errors = {};
        if (!this.state.opinion.nota) {
            allOK = false;
            errors['nota'] = "Introduzca la nota que le quiere dar al restaurante";
        }

        if (typeof this.state.opinion.nota !== 'undefined') {
            if (this.state.opinion.nota < 0 || this.state.opinion.nota > 5) {
                allOK = false;
                errors['nota'] = "La nota debe estar entre 0 y 5";
            }
        }
        if (!this.state.opinion.restauranteOpinion) {
            allOK = false;
            errors['restauranteOpinion'] = "Introduzca el restaurante al que le esta realizando la opinión";
        }

        this.setState({ errors });
        return allOK;
    }

    showAllOK = () => {
        Swal.fire({
            icon: 'success',
            title: this.props.nomModal ? 'Opinión editada' : 'Opinión creada',
            text: this.props.nomModal ? 'Opinion editada correctamente' : 'Opinión creada correctamente',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Volver a la página de opiniones',
        }).then((result) => {
            if (result.isConfirmed) {
                this.setState({
                    opinion: {},
                    numeroConsultas: this.props.numeroConsultas + 1
                }, () => {
                    if (this.props.onChange) {
                        this.props.onChange(this.state.numeroConsultas);
                    }
                })
                this.toggle();
            }
        })
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
            this.props.nomModal ? (
                axios.put('http://127.0.0.1:8000/api/client/' + this.props.idCliente + '/opinion/' + this.props.idOpinion,
                    {
                        nota: this.state.opinion.nota,
                        comentario: this.state.opinion.comentario,
                        client_id: this.props.idCliente,
                        restaurant_id: this.props.idRestaurante
                    },
                    {
                        headers: authHeader()
                    }
                ).then(() => {
                    this.showAllOK();
                }).catch(error => {
                    if (error.response && error.response.status === 400) {
                        this.setState({ errors: JSON.parse(error.response.data) });
                    }
                })
            ) :
                (
                    axios.post('http://127.0.0.1:8000/api/client/' + this.props.idCliente + '/opinion/' + this.state.opinion.restauranteOpinion,
                        {
                            nota: this.state.opinion.nota,
                            comentario: this.state.opinion.comentario,
                            client_id: this.props.idCliente,
                            restaurant_id: this.state.opinion.restauranteOpinion
                        },
                        {
                            headers: authHeader()
                        }
                    ).then(() => {
                        this.showAllOK();
                    }).catch(error => {
                        if (error.response && error.response.status === 400) {
                            this.setState({ errors: JSON.parse(error.response.data) });
                        }
                    })
                )
        }
    }

    render() {
        return (
            <>
                {this.props.nomModal ? (
                    <Button color="info" onClick={this.toggle} className="mr-2 mb-1 noPointerEvents"><FaRegEdit size={20} className="pb-1 icon" /></Button>
                ) : (
                    <Col md={{ size: 4, offset: 8 }} className="p-4">
                        <Button color="info" onClick={this.toggle}><BsPlusCircleFill size={20} className="pb-1" /> Realizar opinión</Button>
                    </Col>
                )}

                <Modal scrollable className="pt-5" isOpen={this.state.modalOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.props.nomModal ? 'Editar opinión' : 'Nueva opinión'}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="nota">Nota* (max. 5) </Label>
                                <Input type="number" style={{ 'border': this.state.errors.nota ? '1px solid red' : '' }}
                                    name="nota" id="nota" value={this.state.opinion.nota}
                                    onChange={this.handleChange} max="5" min="0" />
                                <div className="text-danger">{this.state.errors.nota}</div>
                            </FormGroup>
                            {this.props.nomModal ? ('') : (
                                <FormGroup>
                                    <Label for="restauranteOpinion">Restaurantes visitados</Label>
                                    <Input type="select" style={{ 'border': this.state.errors.client_id ? '1px solid red' : '' }}
                                        name="restauranteOpinion" id="restauranteOpinion" value={this.state.opinion.restauranteOpinion}
                                        onChange={this.handleChange}>
                                        <option hidden={true}>Seleccione un restaurante en el que haya estado</option>
                                        {this.state.restaurantes.map(restaurante => (
                                            <option key={restaurante.userable_id} value={restaurante.userable_id}>{restaurante.name}</option>
                                        ))}
                                    </Input>
                                    <div className="text-danger">{this.state.errors.client_id}</div>
                                    <div className="text-danger">{this.state.errors.restauranteOpinion}</div>
                                </FormGroup>
                            )}
                            <FormGroup>
                                <Label for="comentario">Opinión (opcional)</Label>
                                <Input type="textarea" name="comentario" id="comentario" value={this.state.opinion.comentario}
                                    onChange={this.handleChange} />
                            </FormGroup>
{this.props.nomModal ? (<Button block color="success">Modificar opinión</Button>) : (<Button block color="success">Realizar opinión</Button>)}
                            

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
