import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaSpinner } from 'react-icons/fa'
import * as opencage from 'opencage-api-client';
import '../../../react-leaflet.css'
import axios from 'axios';
import authHeader from '../auth/auth-header';
export class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            query: '',
            apikey: '9fe141db7f4a489fb7bdcc998923cbde',
            submittingLoad: false,
            currentLocation: { lat: 0, lng: 0 },
            zoom: 12,
            ubicacion: {
                direccionPostal: this.props.dirActual
            },
            errorsLocation: {
                direccionPostal: "",
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeLocation = (e) => {
        const { ubicacion } = this.state;
        ubicacion[e.target.name] = [e.target.value];
        this.setState({ ubicacion: this.state.ubicacion });
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.checkLocation()) {
            let user = JSON.parse(localStorage.getItem('user'));
            this.setState({ submittingLoad: true });
            let query = this.state.ubicacion.direccionPostal;
            opencage.geocode({
                key: this.state.apikey,
                q: query
            }).then(res => {
                axios.put('http://127.0.0.1:8000/api/restaurant/' + user.user.userable_id + '/location',
                    {
                        direccionPostal: this.state.ubicacion.direccionPostal[0],
                        latitud: res.results[0].geometry.lat,
                        longitud: res.results[0].geometry.lng
                    },
                    { headers: authHeader() }
                ).then(() => {
                    this.setState({
                        submittingLoad: false,
                    }, () => {
                        if (this.props.onChange) {
                            this.props.onChange(this.state.ubicacion.direccionPostal)
                        }
                    });
                    this.toggle();
                });
                this.setState({
                    lat: res.results[0].geometry.lat,
                    lng: res.results[0].geometry.lng
                })
            }).catch(err => {
                this.setState({
                    submittingLoad: false
                })
                this.toggle();
            });
        }
    }

    checkLocation = () => {
        let allOK = true;
        let errorsLocation = {};

        if (!this.state.ubicacion.direccionPostal) {
            allOK = false;
            errorsLocation["direccionPostal"] = "Introduzca el nombre de la calle/avenida/plaza o edificio";
        }
        this.setState({ errorsLocation: errorsLocation });
        return allOK;
    }
    render() {
        return (
            <>
                <Label for="ubicacion" hidden>Ubicación</Label>
                <Button block color="secondary" onClick={this.toggle}>{this.state.ubicacion.direccionPostal !== '' ? 'Modificar ubicación' : 'Introducir ubicación'}</Button>
                <Modal scrollable isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.state.ubicacion.direccionPostal !== '' ? 'Modificando ubicación' : 'Introduciendo ubicación'}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="direccionPostal">Dirección postal*</Label>
                                <Input
                                    style={{ 'border': this.state.errorsLocation.direccionPostal ? '1px solid red' : '' }} type="text"
                                    id="direccionPostal" name="direccionPostal" placeholder="Escuela Superior de Ingeniería, 11519 Puerto Real, España"
                                    value={this.state.ubicacion.direccionPostal}
                                    onChange={this.onChangeLocation}
                                />
                                <div className="text-danger">{this.state.errorsLocation.direccionPostal}</div>
                            </FormGroup>
                            <hr />
                            {this.state.submittingLoad ? (
                                <Button type="button" color="success" block onClick={this.handleSubmit}><FaSpinner className="icon-spin" /> Guardar cambios</Button>
                            ) : (
                                <Button type="button" color="success" block onClick={this.handleSubmit}>Guardar cambios</Button>
                            )}
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" block onClick={this.toggle}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default Location
