import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Button, Row, Col } from 'reactstrap';
import Swal from "sweetalert2";
import axios from 'axios';
import authHeader from '../Security/auth/auth-header';
import Logout from '../Security/Logout';

export class ConfigUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: '',
            userableId: '',
            emailUser: '',
            nameSurname: '',
            newPassword: '',
            repeatNewPassword: '',
            nickname: '',
            errorsConfig: {
                email: '',
                name: '',
                errorNickname: '',
                errorPassword: '',
            }
        };
    }

    componentDidMount = () => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user !== null) {
            this.setState({
                idUser: user.user.id,
                nickname: user.user.name,
                emailUser: user.user.email,
                userableId: user.user.userable_id,
            })
            axios.get('http://127.0.0.1:8000/api/client/' + user.user.userable_id)
                .then(res => {
                    this.setState({
                        nameSurname: res.data.nombreCompleto
                    });
                });
        }
    }
    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }
    modifyOKUser = (name) => {
        Swal.fire({
            icon: 'success',
            title: 'Modificación realizada',
            text: 'Modificación realizada correctamente',
            timer: 2000,
        }).then(() => {
            window.location = '/user/' + name
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            axios.put('http://127.0.0.1:8000/api/user/' + this.state.idUser, {
                name: this.state.nickname,
                email: this.state.emailUser,
                password: this.state.newPassword,
                password_confirmation: this.state.repeatNewPassword
            },
                { headers: authHeader() }
            ).then(res => {
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(res.data));
                axios.put('http://127.0.0.1:8000/api/client/' + res.data.user.userable_id, {
                    nombreCompleto: this.state.nameSurname
                }, {
                    headers: authHeader()
                }).catch(error => {
                    console.log(error);
                    if (error.response) {
                        if (error.response.status === 400) {
                            this.setState({ errorsConfig: JSON.parse(error.response.data) });
                        }
                    }
                });
                this.modifyOKUser(res.data.user.name);
            }).catch(error => {
                console.log(error);
                if (error.response) {
                    if (error.response.status === 400) {
                        this.setState({ errorsConfig: JSON.parse(error.response.data) });
                    }
                }
            });
        }
    }

    validate() {
        let errorsConfig = {};
        let allOK = true;
        if (!this.state.nameSurname) {
            allOK = false;
            errorsConfig['errorName'] = "Introduzca su nombre y apellidos";
        }
        /* Comprobamos que, en caso de haber modificado nameSurname, este solo tenga letras*/
        if (typeof this.state.nameSurname !== 'undefined') {
            let pattern = new RegExp(/^[a-zA-Z]+( [a-zA-Z]+)*$/);
            if (!pattern.test(this.state.nameSurname)) {
                allOK = false;
                errorsConfig["errorName"] = "Solo utilizar letras";
            }
        }

        if (!this.state.emailUser) {
            allOK = false;
            errorsConfig['email'] = 'Introduzca su correo electrónico';
        }

        /* Comprobamos que, en caso de haber modificado emailUser, este sea una dirección de correo electrónico*/
        if (typeof this.state.emailUser !== 'undefined') {
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.emailUser)) {
                allOK = false;
                errorsConfig["email"] = "Introduzca un correo electrónico válido";
            }
        }

        if (!this.state.nickname) {
            allOK = false;
            errorsConfig['name'] = "Introduzca su nombre de usuario";
        }

        if (typeof this.state.nickname !== 'undefined') {
            let pattern = new RegExp(/([A-Z])\w+/i);
            if (!pattern.test(this.state.nickname)) {
                allOK = false;
                errorsConfig['name'] = "Nombre de usuario incorrecto";
            }
        }
        if (!this.state.newPassword || !this.state.repeatNewPassword) {
            allOK = false;
            errorsConfig['errorPassword'] = 'Contraseña necesaria';
        }
        if (typeof this.state.newPassword !== 'undefined') {
            let patternMySql = new RegExp(/select/i);
            if (patternMySql.test(this.state.newPassword)) {
                allOK = false;
                errorsConfig['errorPassword'] = "Pruebe otra contraseña";
            }
        }

        /* Comprobamos que en caso de haber modificado la contraseña, que newPassword === repeatNewPassword*/
        if (typeof this.state.newPassword !== 'undefined' && typeof this.state.repeatNewPassword !== 'undefined') {
            if (this.state.newPassword !== this.state.repeatNewPassword) {
                allOK = false;
                errorsConfig['errorPassword'] = "Las contraseñas no coinciden";
            }
        }
        this.setState({ errorsConfig });
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
                axios.delete('http://127.0.0.1:8000/api/client/' + this.state.userableId, {
                    headers: authHeader()
                });
                axios.delete('http://127.0.0.1:8000/api/user/' + this.state.idUser, {
                    headers: authHeader()
                });
                Swal.fire({
                    title: 'Cuenta eliminada!',
                    text: 'Su cuenta ha sido eliminada correctamente.',
                    icon: 'success',
                    timer: 2000,
                }).then(() => {
                    { Logout() };
                    window.location = '/'
                })
            }
        });
    }
    render() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user.user.userable_type === 'App\\Models\\Restaurant') {
            window.location = '/'
        }
        else {
            return (
                <div>
                    <Row className="p-4">
                        <Col md="12" className="bg-dark text-light rounded text-center">
                            <h5>
                                Configuración básica
                            </h5>
                        </Col>

                        <Col md={{ size: 6, offset: 3 }} className="pt-4">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="emailUser">
                                        Correo electrónico
                                    </Label>
                                    <Input type="email" name="emailUser" id="emailUser" style={{ 'border': this.state.errorsConfig.email ? '1px solid red' : '' }}
                                        value={this.state.emailUser} onChange={this.handleChange} />
                                    <div className="text-danger">
                                        {this.state.errorsConfig.email}
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="nameSurname">
                                        Nombre y apellidos
                                    </Label>
                                    <Input type="text" name="nameSurname" id="nameSurname" style={{ 'border': this.state.errorsConfig.errorName ? '1px solid red' : '' }}
                                        value={this.state.nameSurname} onChange={this.handleChange} />
                                    <div className="text-danger">
                                        {this.state.errorsConfig.errorName}
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="nickname">
                                        Nombre de usuario/nickname
                                    </Label>
                                    <Input style={{ 'border': this.state.errorsConfig.name ? '1px solid red' : '' }}
                                        type="text" name="nickname" id="nickname"
                                        value={this.state.nickname} onChange={this.handleChange} />
                                    <div className="text-danger">{this.state.errorsConfig.name}</div>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="newPassword">
                                        Nueva contraseña
                                    </Label>
                                    <Input type="password" name="newPassword" id="newPassword" style={{ 'border': this.state.errorsConfig.errorPassword ? '1px solid red' : '' }}
                                        value={this.state.newPassword} onChange={this.handleChange} />

                                </FormGroup>

                                <FormGroup>
                                    <Label for="repeatNewPassword">
                                        Confirmar contraseña
                                    </Label>
                                    <Input type="password" name="repeatNewPassword" id="repeatNewPassword" style={{ 'border': this.state.errorsConfig.errorPassword ? '1px solid red' : '' }}
                                        value={this.state.repeatNewPassword} onChange={this.handleChange} />
                                    <div className="text-danger">
                                        {this.state.errorsConfig.errorPassword}
                                    </div>
                                </FormGroup>
                                <Row>
                                    <Col md="6" sm="6" xs="6">
                                        <Button color="primary" className="mb-2 text-center">Guardar cambios</Button>
                                    </Col>
                                    <Col md="6" sm="6" xs="6">
                                        <Button color="danger" onClick={this.checkProfileDelete} className="mb-2 text-center">Eliminar cuenta</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </div>
            )
        }
    }
}

export default ConfigUser
