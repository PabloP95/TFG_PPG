import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaSpinner } from 'react-icons/fa'
import axios from 'axios';
import Swal from "sweetalert2";
import '../../react-leaflet.css'
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submittingLoad: false,
            loginInfo: {
                email: "",
                password: ""
            },
            errors: {
                email: "",
                password: ""
            }
        }
    }
    handleError() {
        this.setState({
            submittingLoad: false,
        })
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encuentra registrado',
            footer: '<a href="/signup">Registrese ahora</a>'
        });
    }

    handleLoginClient() {
        let user = JSON.parse(localStorage.getItem('user'));
        Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            timer: 2000,
        }).then(() => {
            this.setState({
                submittingLoad: false
            });
            window.location = '/user/' + user.user.name.replace(" ", "-");
        });

    }

    handleLoginRestaurant() {
        let user = JSON.parse(localStorage.getItem('user'));
        Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            timer: 2000,
        }).then(() => {
            this.setState({
                submittingLoad: false
            });
            window.location = '/restaurante/' + user.user.name.replace(" ", "-");
        });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validate()) {
            this.setState({
                submittingLoad: true
            });
            axios.post("http://127.0.0.1:8000/api/auth/login", {
                email: this.state.loginInfo.email,
                password: this.state.loginInfo.password
            }).then(res => {
                if (res.data.access_token) {
                    localStorage.setItem("user", JSON.stringify(res.data));

                    if (res.data.user.userable_type === 'App\\Models\\Client') {
                        this.handleLoginClient();
                    }

                    if (res.data.user.userable_type === 'App\\Models\\Restaurant') {
                        this.handleLoginRestaurant();
                    }
                }
            }).catch(error => {
                if (error.response) {
                    if (error.response.status === 401) {
                        this.handleError();
                    }
                    if (error.response.status === 422) {
                        console.log("ERROR en el formato");
                    }
                }
            });
        }
    }

    onChangeHandler = (e) => {
        const { loginInfo } = this.state;
        loginInfo[e.target.name] = e.target.value;
        this.setState({ loginInfo });
    }

    validate() {
        let errors = {};
        let isValid = true;

        if (!this.state.loginInfo.email) {
            isValid = false;
            errors["email"] = "Proporcione un correo electrónico";
        }
        else if (typeof this.state.loginInfo.email !== "undefined") {
            let patternEmail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!patternEmail.test(this.state.loginInfo.email)) {
                isValid = false;
                errors["email"] = "Proporcione un correo electrónico válido";
            }
        }

        if (!this.state.loginInfo.password) {
            isValid = false;
            errors["password"] = "Introduzca su contraseña";
        }

        else if (typeof this.state.loginInfo.password !== "undefined") {
            if (this.state.loginInfo.password.length < 6) {
                isValid = false;
                errors["password"] = "La contraseña debe tener al menos 6 caracteres";
            }

            let patternMySql = new RegExp(/select/i);
            if (patternMySql.test(this.state.loginInfo.password)) {
                isValid = false;
                errors["password"] = "Pruebe otra contraseña";
            }
        }

        this.setState({ errors: errors });
        return isValid;
    }

    render() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            if (user.user.userable_type === 'App\\Models\\Client') {
                window.location = '/user/' + user.user.name
            }

            if (user.user.userable_type === 'App\\Models\\Restaurant') {
                window.location = '/restaurante/' + user.user.name
            }
        }
        else {
            return (
                <div className="contenedor">
                    <div className="registration">
                        <div className="registration-header">
                            <h3>Login</h3>
                        </div>
                        <Form onSubmit={this.onSubmitHandler} className="formulario">
                            <FormGroup>
                                <Label for="email" hidden>Email</Label>
                                <Input style={{ 'border': this.state.errors.email ? '1px solid red' : '' }} type="email" name="email" id="email" placeholder="Correo electrónico" onChange={this.onChangeHandler} />
                                <div className="text-danger">{this.state.errors.email}</div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password" hidden>Password</Label>
                                <Input style={{ 'border': this.state.errors.password ? '1px solid red' : '' }} type="password" name="password" id="password" placeholder="Contraseña" onChange={this.onChangeHandler} />
                                <div className="text-danger">{this.state.errors.password}</div>
                            </FormGroup>
                            {this.state.submittingLoad ? (
                                <Button disabled={true} style={{ 'textAlign': 'center' }}><FaSpinner className="icon-spin" /> Accediendo a su página</Button>

                            ) : (<Button style={{ 'textAlign': 'center' }}>Login</Button>)}
                            <div className="mt-2">
                                <p><a href="/signup" style={{ textDecoration: 'none' }}>Registrese ahora</a></p>
                            </div>
                        </Form>
                    </div>
                </div>
            );
        }
    }
}

export default Login;
