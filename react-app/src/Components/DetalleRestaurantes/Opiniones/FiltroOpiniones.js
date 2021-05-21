import React, { Component } from 'react';
import { Col, Form, FormGroup, Input, Button, Label } from 'reactstrap';

export class FiltroOpiniones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qualification: '0',
            fechaOpinion: '',
            errors: {
                errorFecha: ''
            }
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }
    validate() {
        let allOK = true;
        let errors = {};
        if (!this.state.fechaOpinion) {
            allOK = false;
            errors['errorFecha'] = "Debe proporcionar una fecha";
        }

        else if (typeof this.state.fechaOpinion !== 'undefined') {
            let today = new Date();
            let hoyDia = today.getDate();
            let hoyMes = today.getMonth() + 1;
            let hoyYear = today.getFullYear();
            let arrFecha = this.state.fechaOpinion.split('-');
            if (arrFecha[0] > hoyYear || arrFecha[1] > hoyMes || arrFecha[2] > hoyDia) {
                allOK = false;
                errors['errorFecha'] = "La fecha proporcionada no es válida";
            }
        }

        this.setState({
            errors: errors
        })
        return allOK;
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validate()) {
            console.log(this.state.qualification);
            console.log(this.state.fechaOpinion);
        }
    }
    render() {
        return (
            <Col md="4" sm="12" className="order-1 order-md-6">
                <div className="container border">
                    <br />
                    <h6>Filtro</h6>
                    <br />
                    <Form onSubmit={this.onSubmitHandler}>
                        <FormGroup>
                            <Label for="qualification">Por nota</Label>
                            <Input type="select" value={this.state.qualification} id="qualification" name="qualification" onChange={this.onChangeHandler}>
                                <option>0 Estrellas</option>
                                <option>1 Estrella</option>
                                <option>2 Estrellas</option>
                                <option>3 Estrellas</option>
                                <option>4 Estrellas</option>
                                <option>5 Estrellas</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="fechaOpinion">Por fecha</Label>
                            <Input style={{ 'border': this.state.errors.errorFecha ? '1px solid red' : '' }}
                                type="date" value={this.state.fechaOpinion} id="fechaOpinion" name="fechaOpinion"
                                placeholder="Introduzca la fecha en la que se ha realizado la opinion (dd/mm/aaaa)"
                                onChange={this.onChangeHandler} />
                            <div className="text-danger">{this.state.errors.errorFecha}</div>
                        </FormGroup>
                        <Button color="success" className="mb-3">Filtrar opiniones</Button>
                    </Form>
                </div>
            </Col>
        )
    }
}

export default FiltroOpiniones
