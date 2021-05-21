import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import './securityStyles.css';
import axios from 'axios';
export default class signUpUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                email: props.location.state.email,
                password: props.location.state.password,
                rol: props.location.state.rol,
                realname: "",  //Nombre y apellidos del usuario
                username: ""  //Nombre de usuario
            },
            errors: {
                realname: "",
                username: ""
            }
        };
    }

    onChangeHandler = (e) => {
        const { userData } = this.state;
        userData[e.target.name] = e.target.value;
        this.setState({ userData });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validate()) {
            console.log("Todo ok por aqui :D");
        }
    }

    validate() {
        let errors = {};
        let isValid = true;
        if (!this.state.userData.realname) {
            isValid = false;
            errors["realname"] = "Introduzca su nombre y apellidos";
        }
        if (typeof this.state.userData.realname !== "undefined") {
            let pattern = new RegExp(/^[a-zA-Z]+( [a-zA-Z]+)*$/);
            if (!pattern.test(this.state.userData.realname)) {
                isValid = false;
                errors["realname"] = "Solo utilizar letras";
            }
        }
        if (typeof this.state.userData.username !== "undefined") {
            if (!this.state.userData.username) {
                isValid = false;
                errors["username"] = "Introduzca un nombre de usuario";
            }
        }
        this.setState({
            errors: errors
        });
        return isValid;
    }

    enableSubmit = (rgpdCheckbox) => {
        if (document.getElementById("RGPD").checked) {
            document.getElementById("submitButton").disabled = false;
        }
        else {
            document.getElementById("submitButton").disabled = true;
        }
    }
    render() {
        console.log(this.state.userData.email);
        return (
            <div className="contenedor">
                <div className="registration">
                    <div className="registration-header">
                        <h2>Registro como usuario</h2>
                    </div>
                    <Form onSubmit={this.onSubmitHandler} className="formulario">
                        <FormGroup>
                            <Label for="realname" hidden>Nombre y apellidos</Label>
                            <Input style={{ 'border': this.state.errors.realname ? '1px solid red' : '' }} type="text" name="realname" id="realname" placeholder="Nombre y apellidos" onChange={this.onChangeHandler} />
                            <div className="text-danger">{this.state.errors.realname}</div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="username" hidden>username</Label>
                            <Input style={{ 'border': this.state.errors.username ? '1px solid red' : '' }} type="text" name="username" id="username" placeholder="Nombre de usuario" onChange={this.onChangeHandler} />
                            <div className="text-danger">{this.state.errors.username}</div>
                        </FormGroup>

                        <FormGroup tag="fieldset">
                            <legend>RGPD</legend>
                            <FormGroup check>
                                <Label for="RGPD" check>
                                    <Input type="checkbox" id="RGPD" value="1" onClick={this.enableSubmit} />
                                    Doy mi consentimiento
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <input type="submit" className="btn btn-secondary" id="submitButton" value="Realizar registro" disabled />
                    </Form>
                </div>
            </div>
        );
    }
}
