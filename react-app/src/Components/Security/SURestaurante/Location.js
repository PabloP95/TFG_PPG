import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

export class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            ubicacion: {
                direccionPostal: "",
                infoAdicional: "",
                localizacion: "",
                codigoPostal: "",
                latitud: "",
                longitud: ""
            },
            errorsLocation: {
                direccionPostal: "",
                infoAdicional: "",
                localizacion: "",
                codigoPostal: "",
                latitud: "",
                longitud: ""
            }
        }
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
            console.log(this.state.ubicacion);
        }
    }

    checkLocation = () => {
        let allOK = true;
        let errorsLocation = {};

        if (!this.state.ubicacion.codigoPostal) {
            allOK = false;
            errorsLocation["codigoPostal"] = "Introduzca el código postal";
        }

        else if (typeof this.state.ubicacion.codigoPostal !== "undefined") {
            let patternCodigoPostal = new RegExp(/\b\d{5}\b/);
            if (!patternCodigoPostal.test(this.state.ubicacion.codigoPostal)) {
                allOK = false;
                errorsLocation["codigoPostal"] = "El código postal debe estar formado por 5 números"
            }
        }
        if (!this.state.ubicacion.localizacion) {
            allOK = false;
            errorsLocation["localizacion"] = "Introduzca la localización";
        }
        else if (typeof this.state.ubicacion.localizacion !== "undefined") {
            let patternLocalizacion = new RegExp(/\d+|\B\W+\B/);
            if (patternLocalizacion.test(this.state.ubicacion.localizacion)) {
                allOK = false;
                errorsLocation["localizacion"] = "ERROR, en la localización solo podemos tener letras"
            }
        }
        if (!this.state.ubicacion.latitud) {
            allOK = false;
            errorsLocation["latitud"] = "Introduzca la latitud";
        }
        if (!this.state.ubicacion.longitud) {
            allOK = false;
            errorsLocation["longitud"] = "Introduzca la longitud";
        }

        this.setState({ errorsLocation: errorsLocation });
        return allOK;
    }
    render() {

        return (
            <>
                <Label for="ubicacion" hidden>Ubicación</Label>
                <Button block color="secondary" onClick={this.toggle}>{this.props.nomBoton ? this.props.nomBoton : 'Ubicación'}</Button>
                <Modal scrollable isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Ubicación</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="direccionPostal">Dirección postal</Label>
                                <Input type="text" id="direccionPostal" name="direccionPostal" onChange={this.onChangeLocation} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="infoAdicional">Información adicional sobre la ubicación</Label>
                                <Input type="text" id="infoAdicional" name="infoAdicional" onChange={this.onChangeLocation} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="localizacion">Localización, estado/provincia/región*</Label>
                                <Input style={{ 'border': this.state.errorsLocation.localizacion ? '1px solid red' : '' }} type="text" id="localizacion" name="localizacion" onChange={this.onChangeLocation} />
                                <div className="text-danger">{this.state.errorsLocation.localizacion}</div>
                            </FormGroup>

                            <FormGroup>
                                <Label for="codigoPostal">Código Postal*</Label>
                                <Input style={{ 'border': this.state.errorsLocation.codigoPostal ? '1px solid red' : '' }} type="number" id="codigoPostal" name="codigoPostal" placeholder="11100" onChange={this.onChangeLocation} />
                                <div className="text-danger">{this.state.errorsLocation.codigoPostal}</div>
                            </FormGroup>

                            <FormGroup>
                                <Label for="latitud">Latitud*</Label>
                                <Input style={{ 'border': this.state.errorsLocation.latitud ? '1px solid red' : '' }} type="number" step="0.00000001" id="latitud" name="latitud" placeholder="36.4651097" onChange={this.onChangeLocation} />
                                <div className="text-danger">{this.state.errorsLocation.latitud}</div>
                            </FormGroup>

                            <FormGroup>
                                <Label for="longitud">Longitud*</Label>
                                <Input style={{ 'border': this.state.errorsLocation.longitud ? '1px solid red' : '' }} type="number" step="0.00000001" id="longitud" name="longitud" placeholder="-6.1996775" onChange={this.onChangeLocation} />
                                <div className="text-danger">{this.state.errorsLocation.longitud}</div>
                            </FormGroup>
                            <hr />
                            <Button type="button" color="success" block onClick={this.handleSubmit}>Guardar cambios</Button>
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
