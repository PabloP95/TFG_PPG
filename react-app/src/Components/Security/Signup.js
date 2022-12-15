import axios from 'axios';
import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { FaSpinner } from 'react-icons/fa'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import './securityStyles.css';
import '../../react-leaflet.css'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submittingLoad: false,
            users: [],
            signUpData: {
                email: "",
                password: "",
                confirmPassword: "",
                name: "",
                userable_type: ""
            },
            errors: {
                email: "",
                password: "",
                confirm_password: "",
                name: "",
                userable_type: ""
            },
        }
    }


    onChangeHandler = (e) => {
        const { signUpData } = this.state;
        signUpData[e.target.name] = e.target.value;
        this.setState({ signUpData });
    }

    signedUpClient() {
        let user = JSON.parse(localStorage.getItem('user'));
        Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            timer: 3000,
        }).then(() => {
            this.setState({
                submittingLoad: false
            });
            window.location = '/user/' + user.user.name

        });
    }

    signedUpRestaurant() {
        let user = JSON.parse(localStorage.getItem('user'));
        Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            timer: 3000,
        }).then(() => {
            this.setState({
                submittingLoad: false
            });
            window.location = '/restaurante/' + user.user.name
        }
        );
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validate()) {
            this.setState({
                submittingLoad: true
            });
            axios.post('http://127.0.0.1:8000/api/auth/register', {
                email: this.state.signUpData.email,
                password: this.state.signUpData.password,
                password_confirmation: this.state.signUpData.confirmPassword,
                name: this.state.signUpData.name,
                userable_type: this.state.signUpData.userable_type
            }).then(res => {
                if (res.data.access_token) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    if (this.state.signUpData.userable_type === "App\\Models\\Restaurant") {
                        this.signedUpRestaurant();
                    }

                    if (this.state.signUpData.userable_type === "App\\Models\\Client") {
                        this.signedUpClient();
                    }
                }
            }).catch(error => {
                if (error.response) {
                    if (error.response.status === 400) {
                        this.setState({
                            errors: JSON.parse(error.response.data),
                            submittingLoad: false
                        });
                    }
                }
            })

        }
    }
    validate() {
        let errors = {};
        let isValid = true;


        if (!this.state.signUpData.email) {
            isValid = false;
            errors["email"] = "Introduzca su correo electrónico";
        }

        else if (typeof this.state.signUpData.email !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.signUpData.email)) {
                isValid = false;
                errors["email"] = "Introduzca un correo electrónico válido";
            }
        }

        if (!this.state.signUpData.password) {
            isValid = false;
            errors["password"] = "Introduzca una contraseña";
        }

        if (!this.state.signUpData.confirmPassword) {
            isValid = false;
            errors["confirm_password"] = "Vuelva a introducir la contraseña";
        }

        if (typeof this.state.signUpData.password !== "undefined" && typeof this.state.signUpData.confirmPassword !== "undefined") {
            let patternMySql = new RegExp(/select/i);
            if (patternMySql.test(this.state.signUpData.password)) {
                isValid = false;
                errors["password"] = "Pruebe otra contraseña";
            }

            if (this.state.signUpData.password !== this.state.signUpData.confirmPassword) {
                isValid = false;
                errors["password"] = "Las contraseñas no coinciden";
            }
        }

        if (!this.state.signUpData.userable_type) {
            isValid = false;
            errors["userable_type"] = "Debe seleccionar un rol";
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }
    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let name = user.user.name.replace(" ", "-");
            if (user.user.userable_type === 'App\\Models\\Client') {
                return <Redirect to={'/user/' + name} />
            }

            if (user.user.userable_type === 'App\\Models\\Restaurant') {
                return <Redirect to={'/restaurante/' + name} />
            }
        }
        else {
            return (
                <div className="contenedor">
                    <div className="registration">
                        <div className="registration-header">
                            <h2>Dando de alta</h2>
                        </div>
                        <Form onSubmit={this.onSubmitHandler} className="formulario">
                            <FormGroup>
                                <Label for="email" hidden>Email</Label>
                                <Input style={{ 'border': this.state.errors.email ? '1px solid red' : '' }} type="email" name="email" id="email" placeholder="Correo electrónico" onChange={this.onChangeHandler} />
                                <div className="text-danger">{this.state.errors.email}</div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password" hidden>Password</Label>
                                <Input style={{ 'border': this.state.errors.password ? '1px solid red' : '' }}
                                    type="password" name="password" id="password"
                                    placeholder="Contraseña" onChange={this.onChangeHandler} />
                                <div className="text-danger">{this.state.errors.password}</div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirmPassword" hidden>Confirm password</Label>
                                <Input style={{ 'border': this.state.errors.confirmPassword ? '1px solid red' : '' }}
                                    type="password" name="confirmPassword" id="confirmPassword"
                                    placeholder="Repetir contraseña" onChange={this.onChangeHandler} />
                                <div className="text-danger">{this.state.errors.confirmPassword}</div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="name" hidden>Nombre</Label>
                                {
                                    this.state.signUpData.userable_type === "App\\Models\\Client" ? (
                                        <Input style={{ 'border': this.state.errors.name ? '1px solid red' : '' }}
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Nombre usuario"
                                            onChange={this.onChangeHandler}
                                        />
                                    ) :
                                        this.state.signUpData.userable_type === "App\\Models\\Restaurant" ?
                                            (<Input style={{ 'border': this.state.errors.name ? '1px solid red' : '' }}
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Nombre restaurante"
                                                onChange={this.onChangeHandler}
                                            />
                                            ) : (<Input
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="nombre"
                                                onChange={this.onChangeHandler} />)
                                }
                                <div className="text-danger">{this.state.errors.name}</div>


                            </FormGroup>
                            <FormGroup tag="fieldset">
                                <legend>Rol</legend>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="userable_type" value="App\Models\Client"
                                            onChange={this.onChangeHandler} />
                                        Cliente

                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="userable_type" value="App\Models\Restaurant"
                                            onChange={this.onChangeHandler} />
                                        Restaurante
                                        <div className="text-danger">{this.state.errors.userable_type}</div>
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                            {this.state.submittingLoad ? (
                                <Button disabled={true} style={{ 'textAlign': 'center' }}><FaSpinner className="icon-spin" /> Creando y accediendo a su página</Button>
                            ) : (
                                <Button style={{ 'textAlign': 'center' }}>Registrarse</Button>
                            )}
                        </Form>
                    </div>
                </div>
            );
        }
    }
}


export default Signup;