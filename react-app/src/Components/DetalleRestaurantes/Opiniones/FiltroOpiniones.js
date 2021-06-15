import React, { Component } from 'react';
import { Col, Form, FormGroup, Input, Button, Label, Row } from 'reactstrap';
import axios from 'axios'
export class FiltroOpiniones extends Component {
    constructor(props) {
        super(props);
        let arr = window.location.href.split('/');
        this.state = {
            opiniones: this.props.opiniones,
            qualification: '',
            idRestaurante: arr[5],
            filtrado: false,
            fecha: '',
            fechaIni: '',
            fechaFin: '',
            errors: {
                errorNota: '',
                errorFecha: '',
                errorFechaIni: '',
                errorFechaFin: ''
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

        if (typeof this.state.qualification !== 'undefined') {
            if (this.state.qualification < 0 && this.state.qualification > 5) {
                allOK = false;
                errors['errorNota'] = "La nota proporcionada no es correcta (debe estar entre 0 y 5)";
            }
        }

        if (typeof this.state.fechaIni !== 'undefined') {
            let today = new Date();
            let hoyDia = today.getDate();
            let hoyMes = today.getMonth() + 1;
            let hoyYear = today.getFullYear();
            let arrFecha = this.state.fechaIni.split('-');
            if (arrFecha[0] > hoyYear || arrFecha[1] > hoyMes || arrFecha[2] > hoyDia) {
                allOK = false;
                errors['errorFechaIni'] = "La fecha proporcionada no es válida";
            }
        }

        if (typeof this.state.fechaFin !== 'undefined') {
            let today = new Date();
            let hoyDia = today.getDate();
            let hoyMes = today.getMonth() + 1;
            let hoyYear = today.getFullYear();
            let arrFecha = this.state.fechaFin.split('-');
            if (arrFecha[0] > hoyYear || arrFecha[1] > hoyMes || arrFecha[2] > hoyDia) {
                allOK = false;
                errors['errorFechaFin'] = "La fecha proporcionada no es válida";
            }
        }

        if (typeof this.state.fechaIni !== 'undefined' && typeof this.state.fechaFin !== 'undefined') {
            const inicio = new Date(this.state.fechaIni);
            const fin = new Date(this.state.fechaFin);


            if ((fin <= inicio)) {
                allOK = false;
                errors['errorFechaIni'] = 'Debe ser anterior a la fecha de fin';
                errors['errorFechaFin'] = 'Debe ser posterior a la fecha de inicio';
            }
        }

        this.setState({
            errors: errors
        })
        return allOK;
    }
    deleteFilter = () => {
        axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/opiniones').then((res) => {
            this.setState({
                opiniones: res.data,
                filtrado: false,
                qualification: '',
                fecha: '',
                fechaIni: '',
                fechaFin: ''
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange([this.state.opiniones, this.state.filtrado]);
                }

            })
        })
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validate()) {
            if (this.state.fecha === '' && this.state.qualification !== '') {
                let qualArr = this.state.qualification.split(' ');
                axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/opinionesFiltroNota/' + qualArr[0]).then(res => {
                    this.setState({
                        opiniones: res.data,
                        filtrado: true
                    }, () => {
                        if (this.props.onChange) {
                            this.props.onChange([this.state.opiniones, this.state.filtrado]);
                        }
                    })
                })
            }

            else if (this.state.qualification === '' && this.state.fecha !== '') {
                axios.get('http://localhost:8000/api/restaurant/' + this.state.idRestaurante + '/opinionesFiltroFecha/' + this.state.fecha).then(res => {
                    this.setState({
                        opiniones: res.data,
                        filtrado: true
                    }, () => {
                        if (this.props.onChange) {
                            this.props.onChange([this.state.opiniones, this.state.filtrado]);
                        }
                    })
                })
            }

            else if (this.state.qualification !== '' && this.state.fecha !== '') {
                axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/opinionesFiltro/' + this.state.qualification + '/' + this.state.fecha).then(res => {
                    this.setState({
                        opiniones: res.data,
                        filtrado: true
                    }, () => {
                        if (this.props.onChange) {
                            this.props.onChange([this.state.opiniones, this.state.filtrado]);
                        }
                    })
                })
            }

            else if (this.state.fechaIni !== '' && this.state.fechaFin !== '' && this.state.qualification === '' && this.state.fecha === '') {
                axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/opinionesFiltroFechas/' + this.state.fechaIni + '/' + this.state.fechaFin).then(res => {
                    this.setState({
                        opiniones: res.data,
                        filtrado: true
                    }, () => {
                        if (this.props.onChange) {
                            this.props.onChange([this.state.opiniones, this.state.filtrado]);
                        }
                    })
                })
            }

            else if (this.state.fechaIni !== '' && this.state.fechaFin !== '' && this.state.qualification !== '' && this.state.fecha === '') {
                axios.get('http://localhost:8000/api/restaurant/' + this.state.idRestaurante + '/opinionesFiltroFechas/' + this.state.fechaIni + '/' + this.state.fechaFin + '/' + this.state.qualification).then(res => {
                    this.setState({
                        opiniones: res.data,
                        filtrado: true
                    }, () => {
                        if (this.props.onChange) {
                            this.props.onChange([this.state.opiniones, this.state.filtrado]);
                        }
                    })
                })
            }
        }
    }
    render() {
        return (
            <Col md="4" sm="12" className="order-1 order-md-6">
                <div className="container border">
                    <strong><h5 className="p-3">Filtro</h5></strong>
                    <Form onSubmit={this.onSubmitHandler}>
                        <FormGroup>
                            <Label for="qualification">Por nota</Label>
                            <Input type="select"
                                style={{ 'border': this.state.errors.errorNota ? '1px solid red' : '' }}
                                value={this.state.qualification}
                                id="qualification" name="qualification" onChange={this.onChangeHandler}>
                                <option hidden={true}>Seleccione la nota</option>
                                <option value="0">0 Estrellas</option>
                                <option value="1">1 Estrella</option>
                                <option value="2">2 Estrellas</option>
                                <option value="3">3 Estrellas</option>
                                <option value="4">4 Estrellas</option>
                                <option value="5">5 Estrellas</option>
                            </Input>
                            <div className="text-danger">{this.state.errors.errorNota}</div>
                        </FormGroup>

                        <FormGroup>
                            <Label for="fecha">Por intervalo de fecha</Label>
                            <Input type="select" value={this.state.fecha} id="fecha" name="fecha" onChange={this.onChangeHandler}>
                                <option hidden={true}>Seleccione el rango de fecha</option>
                                <option value="0">Hoy</option>
                                <option value="1">Ayer</option>
                                <option value="2">Hace una semana</option>
                                <option value="3">Hace un mes</option>
                                <option value="4">Hace un año</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Rango entre dos fechas</Label>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="fechaIni">Fecha inicio</Label>
                                        <Input style={{ 'border': this.state.errors.errorFechaIni ? '1px solid red' : '' }}
                                            type="date" value={this.state.fechaIni} id="fechaIni" name="fechaIni"
                                            placeholder="Introduzca la fecha de inicio (dd/mm/aaaa)"
                                            onChange={this.onChangeHandler} />
                                        <div className="text-danger">{this.state.errors.errorFechaIni}</div>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="fechaFin">Fecha fin</Label>
                                        <Input style={{ 'border': this.state.errors.errorFechaFin ? '1px solid red' : '' }}
                                            type="date" value={this.state.fechaFin} id="fechaFin" name="fechaFin"
                                            placeholder="Introduzca la fecha de fin (dd/mm/aaaa)"
                                            onChange={this.onChangeHandler} />
                                        <div className="text-danger">{this.state.errors.errorFechaFin}</div>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </FormGroup>
                        <Button color="success" className="mb-3">Filtrar opiniones</Button>
                        <br />
                        {this.state.filtrado ? (
                            <Button color="danger" className="mb-3" onClick={this.deleteFilter}>Eliminar filtros</Button>
                        ) : ('')}
                    </Form>
                </div>
            </Col>
        )
    }
}

export default FiltroOpiniones
