
import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import './securityStyles.css';
import Horarios from './SURestaurante/Horarios';
import Location from './SURestaurante/Location';
import TipoCocina from './SURestaurante/TipoCocina';
export default class signUpRestaurante extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantData: {
                email: props.location.state.email,
                password: props.location.state.password,
                rol: props.location.state.rol,
                restaurantName: "",  //Nombre del restaurante
                contactPhone: "",  //Telefono de contacto (opcional)
                numMesas: 0,
            },
            errors: {
                restaurantName: "",
                contactPhone: "",
                numMesas: ""
            },
        };
    }

    onChangeHandler = (e) => {
        console.log(e.target.name);
        const { restaurantData } = this.state;
        restaurantData[e.target.name] = e.target.value;
        this.setState({ restaurantData });
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
        if (!this.state.restaurantData.restaurantName) {
            isValid = false;
            errors["restaurantName"] = "Introduzca el nombre del lugar";
        }

        if (typeof this.state.restaurantData.restaurantName !== "undefined") {
            let pattern = new RegExp(/^[a-zA-Z]+( [a-zA-Z]+)*$/);
            if (!pattern.test(this.state.restaurantData.restaurantName)) {
                isValid = false;
                errors["restaurantName"] = "Solo utilizar letras";
            }
        }

        if (this.state.restaurantData.contactPhone) {
            let pattern = new RegExp(/^(\+\d+ )([\d]{3} )([\d]{2} )([\d]{2} )([\d]{2})$/);
            if (!pattern.test(this.state.restaurantData.contactPhone)) {
                isValid = false;
                errors["contactPhone"] = "El formato no es correcto";
            }
        }

        if (!this.state.restaurantData.numMesas) {
            isValid = false;
            errors["numMesas"] = "Introduzca el número de mesas";
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
                        <h2>Registro como restaurante</h2>
                    </div>
                    <Form onSubmit={this.onSubmitHandler} className="formulario">
                        <FormGroup>
                            <Label for="restaurantName">Nombre restaurante</Label>
                            <Input style={{ 'border': this.state.errors.restaurantName ? '1px solid red' : '' }} type="text" name="restaurantName" id="restaurantName" placeholder="Nombre del lugar" onChange={this.onChangeHandler} />
                            <div className="text-danger">{this.state.errors.restaurantName}</div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="contactPhone">Número de contacto Opcional</Label>
                            <Input style={{ 'border': this.state.errors.contactPhone ? '1px solid red' : '' }} type="text" name="contactPhone" id="contactPhone" placeholder="+34 xxx xx xx xx" onChange={this.onChangeHandler} />
                            <div className="text-danger">{this.state.errors.contactPhone}</div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numMesas">Número de mesas</Label>
                            <Input type="number" name="numMesas" id="numMesas" placeholder="5" onChange={this.onChangeHandler} />
                            <div className="text-danger">{this.state.errors.numMesas}</div>
                        </FormGroup>
                        {/* Tipos de cocina */}
                        <FormGroup>
                            <TipoCocina />
                        </FormGroup>
                        {/* Horarios */}
                        <FormGroup>
                            <Horarios />
                        </FormGroup>
                        {/* Ubicacion */}
                        <FormGroup>
                            <Location />
                        </FormGroup>
                        <Input type="submit" className="btn btn-success btn-block" id="submitButton" value="Realizar registro" />
                    </Form>
                </div>
            </div>
        );
    }
}
