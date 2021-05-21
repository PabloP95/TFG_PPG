import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';
export class BusquedaRestaurantes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreRestaurante: '',
            selectEstablecimiento: '',
            selectPrecio: '',
            selectTipoCocina: '',
            errors: {
                nombreRestaurante: ''
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    validate = () => {
        /* Suponemos que el nombre de restaurante no puede tener caracteres especiales*/
        /* Tales como @, #, $, !, ...*/
        /* Tampoco puede tener números*/
        let errors = {};
        let isValid = true;
        if (typeof this.state.nombreRestaurante !== 'undefined') {
            let pattern = new RegExp(/^[a-zA-Z]+( [a-zA-Z]+)*$/);
            let patternMySql = new RegExp(/select/i);
            if (!pattern.test(this.state.nombreRestaurante)) {
                isValid = false;
                errors["nombreRestaurante"] = "Solo utilizar letras";
            }

            if (patternMySql.test(this.state.nombreRestaurante)) {
                isValid = false;
                errors["nombreRestaurante"] = "Error, término no permitido";
            }
        }
        this.setState({ errors: errors });
        return isValid;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            console.log(this.state.nombreRestaurante);
            console.log(this.state.selectEstablecimiento);
            console.log(this.state.selectPrecio);
            console.log(this.state.selectTipoCocina);
            this.setState({
                nombreRestaurante: '',
                selectEstablecimiento: '',
                selectPrecio: '',
                selectTipoCocina: '',
                errors: {
                    nombreRestaurante: ''
                }
            });
        }
    }

    render() {
        return (
            <div>
                <div className="rounded border d-flex justify-content-center p-2">
                    <Form inline onSubmit={this.handleSubmit}>
                        <div className="text-danger pr-3">
                            {this.state.errors.nombreRestaurante}
                        </div>
                        <FormGroup className="mb-2 mr-md-2 mb-md-0 mr-sm-2">
                            <Label for="nomRestaurante"></Label>
                            <Input style={{
                                'border': this.state.errors.nombreRestaurante ? '1px solid red' : '',
                            }}
                                type="text" value={this.state.nombreRestaurante} name="nombreRestaurante"
                                id="nomRestaurante" placeholder='Nombre' onChange={this.handleChange} />

                        </FormGroup>
                        <FormGroup className="mb-2 mr-md-2 mb-md-0 mr-sm-2">
                            <Label for="tipoEstablecimiento"></Label>
                            <Input type="select" value={this.state.valueTipoEstablecimiento} name="selectEstablecimiento" onChange={this.handleChange} placeholder="Tipo establecimiento">
                                <option>Restaurante</option>
                                <option>Bar</option>
                                <option>Freidor</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-md-2 mb-md-0 ml-sm-3 mr-sm-3 ml-xs-3 mr-xs-3">
                            <Label for="precioEstimado"></Label>
                            <Input type="select" value={this.state.valuePrecio} onChange={this.handleChange} name="selectPrecio" placeholder="Precio estimado">
                                <option>€ - €€</option>
                                <option>€€ - €€€</option>
                                <option>€€€ - €€€€</option>
                                <option>€€€€ - €€€€€</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-md-2 mb-md-0 mr-sm-3 ml-sm-5 mr-xs-3 ml-xs-5">
                            <Label for="estiloCocina"></Label>
                            <Input type="select" value={this.state.valueTipoCocina} onChange={this.handleChange} name="selectTipoCocina" placeholder="Estilo cocina">
                                <option>Italiano</option>
                                <option>Español</option>
                                <option>Japones</option>
                            </Input>
                        </FormGroup>
                        <Button className="rounded mb-2 mr-md-2 mb-md-0 ml-sm-5 ml-xs-5"><BsSearch /></Button>
                    </Form >
                </div >
            </div >
        )
    }
}

export default BusquedaRestaurantes
