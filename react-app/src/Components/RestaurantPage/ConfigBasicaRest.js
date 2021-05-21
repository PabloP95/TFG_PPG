import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import Swal from 'sweetalert2';
export class ConfigBasicaRest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameRest: '',
            emailRest: '',
            phoneRest: '',
            newPassword: '',
            repeatNewPassword: '',
            errors: {
                nameRest: '',
                emailRest: '',
                phoneRest: '',
                errorPassword: ''
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            console.log(this.state);
        }
    }

    validate() {
        let allOK = true;
        let errors = {};
        if (!this.state.nameRest) {
            allOK = false;
            errors['nameRest'] = "Introduzca el nombre del restaurante";
        }
        /* Comprobamos que, en caso de haber modificado nameSurname, este solo tenga letras*/
        else if (typeof this.state.nameRest !== 'undefined') {
            let pattern = new RegExp(/^[a-zA-Z]+( [a-zA-Z]+)*$/);
            if (!pattern.test(this.state.nameRest)) {
                allOK = false;
                errors["nameRest"] = "Solo utilizar letras";
            }
        }

        if (!this.state.emailRest) {
            allOK = false;
            errors['emailRest'] = 'Introduzca su correo electrónico';
        }

        /* Comprobamos que, en caso de haber modificado emailUser, este sea una dirección de correo electrónico*/
        else if (typeof this.state.emailRest !== 'undefined') {
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.emailRest)) {
                allOK = false;
                errors["emailRest"] = "Introduzca un correo electrónico válido";
            }
        }

        if (!this.state.phoneRest) {
            allOK = false;
            errors['phoneRest'] = "Introduzca su teléfono de contacto";
        }

        else if (typeof this.state.phoneRest !== 'undefined') {
            let pattern = new RegExp(/([\d]{3} )([\d]{2} )([\d]{2} )([\d]{2})$/);
            if (!pattern.test(this.state.phoneRest)) {
                allOK = false;
                errors["phoneRest"] = "El formato no es correcto (xxx xx xx xx)";
            }
        }
        if (typeof this.state.newPassword !== 'undefined') {
            let patternMySql = new RegExp(/select/i);
            if (patternMySql.test(this.state.newPassword)) {
                allOK = false;
                errors['errorPassword'] = "Pruebe otra contraseña";
            }
        }

        if (!this.state.newPassword || !this.state.repeatNewPassword) {
            allOK = false;
            errors['errorPassword'] = "Debe introducir una contraseña";
        }
        /* Comprobamos que en caso de haber modificado la contraseña, que newPassword === repeatNewPassword*/
        else if (typeof this.state.newPassword !== 'undefined' && typeof this.state.repeatNewPassword !== 'undefined') {
            if (this.state.newPassword !== this.state.repeatNewPassword) {
                allOK = false;
                errors['errorPassword'] = "Las contraseñas no coinciden";
            }


        }
        this.setState({
            errors: errors
        });
        return allOK;

    }

    checkProfileDelete = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Eliminar cuenta?',
            text: '¿Quiere eliminar la cuenta?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar cuenta',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Cuenta eliminada!',
                    'Su cuenta ha sido eliminada correctamente.',
                    'success'
                )
            }
        });
    }
    render() {
        return (
            <Row>
                <Col md={{ size: 6, offset: 3 }} sm={{ size: 9, offset: 1 }} xs={{ size: 9, offset: 1 }} className="pt-4">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="nameRest">Nombre restaurante</Label>
                            <Input style={{ 'textTransform': 'capitalize', 'border': this.state.errors.nameRest ? '1px solid red' : '' }} type="text" name="nameRest" id="nameRest"
                                value={this.state.nameRest} onChange={this.handleChange} />
                            <div className="text-danger">{this.state.errors.nameRest}</div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="emailRest">Correo electrónico</Label>
                            <Input style={{ 'border': this.state.errors.emailRest ? '1px solid red' : '' }} type="email" name="emailRest" id="emailRest"
                                value={this.state.emailRest} onChange={this.handleChange} />
                            <div className="text-danger">{this.state.errors.emailRest}</div>
                        </FormGroup>


                        <FormGroup>
                            <Label for="phoneRest">Telefono de contacto</Label>
                            <Input style={{ 'border': this.state.errors.phoneRest ? '1px solid red' : '' }} type="text" name="phoneRest" id="phoneRest"
                                value={this.state.phoneRest} onChange={this.handleChange} />
                            <div className="text-danger">{this.state.errors.phoneRest}</div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="newPassword">
                                Nueva contraseña
                            </Label>
                            <Input type="password" name="newPassword" id="newPassword" style={{ 'border': this.state.errors.errorPassword ? '1px solid red' : '' }}
                                value={this.state.newPassword} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="repeatNewPassword">
                                Confirmar contraseña
                            </Label>
                            <Input type="password" name="repeatNewPassword" id="repeatNewPassword" style={{ 'border': this.state.errors.errorPassword ? '1px solid red' : '' }}
                                value={this.state.repeatNewPassword} onChange={this.handleChange} />
                            <div className="text-danger">
                                {this.state.errors.errorPassword}
                            </div>
                        </FormGroup>
                        <Row>
                            <Col md="6" sm="6" xs="6">
                                <Button color="primary" className=" mb-2 text-center">Guardar cambios</Button>
                            </Col>
                            <Col md="6" sm="6" xs="6">
                                <Button color="danger" onClick={this.checkProfileDelete} className="mb-2">Eliminar cuenta</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

        );
    }
}

export default ConfigBasicaRest
