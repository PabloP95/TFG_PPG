import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import './securityStyles.css';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signUpData: {
                email: "",
                password: "",
                confirmPassword: "",
                rol: ""
            },
            errors: {
                email: "",
                password: "",
                confirm_password: "",
                rol: ""
            }
        }
    }
    onChangeHandler = (e) => {
        const { signUpData } = this.state;
        signUpData[e.target.name] = e.target.value;
        this.setState({ signUpData });
    }


    onSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validate()) {
            this.state.signUpData.rol === "0" ?
                this.props.history.push({
                    pathname: '/signupuser',
                    state: this.state.signUpData
                })
                :
                this.props.history.push({
                    pathname: '/signuprest',
                    state: this.state.signUpData
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

        if (!this.state.signUpData.rol) {
            isValid = false;
            errors["rol"] = "Debe seleccionar un rol";
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }
    render() {
        return (
            <div className="contenedor">
                <div className="registration">
                    <div className="registration-header">
                        <h2>Register</h2>
                    </div>
                    <Form onSubmit={this.onSubmitHandler} className="formulario">
                        <FormGroup>
                            <Label for="email" hidden>Email</Label>
                            <Input style={{ 'border': this.state.errors.email ? '1px solid red' : '' }} type="email" name="email" id="email" placeholder="email" onChange={this.onChangeHandler} />
                            <div className="text-danger">{this.state.errors.email}</div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" hidden>Password</Label>
                            <Input style={{ 'border': this.state.errors.password ? '1px solid red' : '' }} type="password" name="password" id="password" placeholder="password" onChange={this.onChangeHandler} />
                            <div className="text-danger">{this.state.errors.password}</div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword" hidden>Confirm password</Label>
                            <Input style={{ 'border': this.state.errors.confirmPassword ? '1px solid red' : '' }} type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm password" onChange={this.onChangeHandler} />
                            <div className="text-danger">{this.state.errors.confirmPassword}</div>
                        </FormGroup>
                        <FormGroup tag="fieldset">
                            <legend>Rol</legend>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="rol" value="0" onChange={this.onChangeHandler} />
                                    Usuario

                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="rol" value="1" onChange={this.onChangeHandler} />
                                    Restaurante
                                    <div className="text-danger">{this.state.errors.rol}</div>
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <input type="submit" className="btn btn-secondary" value="Siguiente" />
                    </Form>
                </div>
            </div>
        );
    }
}


export default Signup;