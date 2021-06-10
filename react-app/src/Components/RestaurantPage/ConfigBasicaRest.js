import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import axios from 'axios';
import authHeader from '../Security/auth/auth-header';
import Swal from 'sweetalert2';
import Logout from '../Security/Logout';
export class ConfigBasicaRest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: 0,
            nameRest: '',
            emailRest: '',
            phoneRest: '',
            newPassword: '',
            repeatNewPassword: '',
            errors: {
                name: '',
                email: '',
                phoneRest: '',
                errorPassword: ''
            }
        }
    }
    componentDidMount = () => {
        let user = JSON.parse(localStorage.getItem('user'));
        this.setState({
            idUser: user.user.id,
            nameRest: user.user.name,
            emailRest: user.user.email
        });
        axios.get('http://127.0.0.1:8000/api/restaurant/' + user.user.userable_id)
            .then(res => {
                this.setState({
                    phoneRest: res.data.numTelefono
                });
            });
    }
    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    modifyOK = (name) => {
        Swal.fire({
            icon: 'success',
            title: 'Modificación realizada',
            text: 'Modificación realizada correctamente',
            timer: 3000,
        }).then(() => {
            window.location = '/restaurante/' + name
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            axios.put('http://127.0.0.1:8000/api/user/' + this.state.idUser, {
                name: this.state.nameRest,
                email: this.state.emailRest,
                password: this.state.newPassword,
                password_confirmation: this.state.repeatNewPassword
            },
                {
                    headers: authHeader()
                }).then(res => {
                    localStorage.removeItem('user');
                    localStorage.setItem('user', JSON.stringify(res.data));
                    axios.put('http://127.0.0.1:8000/api/restaurant/' + res.data.user.userable_id, {
                        numTelefono: this.state.phoneRest
                    }, {
                        headers: authHeader()
                    }).catch(error => {
                        if (error.response) {
                            if (error.response.status === 400) {
                                this.setState({ errors: JSON.parse(error.response.data) });
                            }
                            if (error.response.status === 401) {
                                { Logout() };
                                window.location = '/login'
                            }
                        }
                    });
                    this.modifyOK(res.data.user.name);
                }).catch(error => {
                    if (error.response) {
                        if (error.response.status === 400) {
                            this.setState({ errors: JSON.parse(error.response.data) });
                        }

                        if (error.response.status === 401) {
                            { Logout() };
                            window.location = '/login'
                        }
                    }
                });
        }
    }

    validate() {
        let allOK = true;
        let errors = {};
        if (!this.state.nameRest) {
            allOK = false;
            errors['name'] = "Introduzca el nombre del restaurante";
        }
        /* Comprobamos que, en caso de haber modificado nameSurname, este solo tenga letras*/
        else if (typeof this.state.nameRest !== 'undefined') {
            let pattern = new RegExp(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/);
            if (!pattern.test(this.state.nameRest)) {
                allOK = false;
                errors["name"] = "Solo utilizar letras o números";
            }
        }

        if (!this.state.emailRest) {
            allOK = false;
            errors['email'] = 'Introduzca su correo electrónico';
        }

        /* Comprobamos que, en caso de haber modificado emailUser, este sea una dirección de correo electrónico*/
        else if (typeof this.state.emailRest !== 'undefined') {
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.emailRest)) {
                allOK = false;
                errors["email"] = "Introduzca un correo electrónico válido";
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

        if (!this.state.newPassword || !this.state.repeatNewPassword) {
            allOK = false;
            errors['errorPassword'] = 'Contraseña necesaria';
        }

        if (typeof this.state.newPassword !== 'undefined') {
            let patternMySql = new RegExp(/select/i);
            if (patternMySql.test(this.state.newPassword)) {
                allOK = false;
                errors['errorPassword'] = "Pruebe otra contraseña";
            }
        }


        /* Comprobamos que en caso de haber modificado la contraseña, que newPassword === repeatNewPassword*/
        if (typeof this.state.newPassword !== 'undefined' && typeof this.state.repeatNewPassword !== 'undefined') {
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
                axios.delete('http://127.0.0.1:8000/api/restaurant/' + this.state.idUser, {
                    headers: authHeader()
                }).then(() => {
                    axios.delete('http://127.0.0.1:8000/api/user/' + this.state.idUser, {
                        headers: authHeader()
                    }).then(() => {
                        Swal.fire({
                            title: 'Cuenta eliminada!',
                            text: 'Su cuenta ha sido eliminada correctamente.',
                            icon: 'success',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                { Logout() };
                                window.location = '/'
                            }
                        })
                    })
                })
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
                            <Input style={{ 'textTransform': 'capitalize', 'border': this.state.errors.name ? '1px solid red' : '' }} type="text" name="nameRest" id="nameRest"
                                value={this.state.nameRest} onChange={this.handleChange} />
                            <div className="text-danger">{this.state.errors.name}</div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="emailRest">Correo electrónico</Label>
                            <Input style={{ 'border': this.state.errors.email ? '1px solid red' : '' }} type="email" name="emailRest" id="emailRest"
                                value={this.state.emailRest} onChange={this.handleChange} />
                            <div className="text-danger">{this.state.errors.email}</div>
                        </FormGroup>


                        <FormGroup>
                            <Label for="phoneRest">Teléfono de contacto</Label>
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
                                <Button color="primary" className="mb-2 text-center">Guardar cambios</Button>
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
