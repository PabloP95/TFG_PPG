import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import { BsSearch } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import axios from 'axios';
import { Multiselect } from 'multiselect-react-dropdown';
export class BusquedaRestaurantes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreRestaurante: '',
            selectTipoCocina: '',
            resBusqueda: [],
            tiposCocina: [],

            tiposCocinaSeleccionados: [],
            errors: {
                nombreRestaurante: ''
            }
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/tiposCocina').then(res => { this.setState({ tiposCocina: res.data }) })
    }

    onSelect = (selectedList, selectedItem) => {
        this.setState({ tiposCocinaSeleccionados: [...this.state.tiposCocinaSeleccionados, selectedItem] });
    }

    onRemove = (selectedList, removedItem) => {
        let arr = [...this.state.tiposCocinaSeleccionados];

        if (arr.indexOf(removedItem) === 0) {
            this.setState({
                tiposCocinaSeleccionados: arr.slice(0, 0).concat(arr.slice(1, arr.length + 1))
            });
        }
        if (arr.indexOf(removedItem) !== 0) {
            this.setState({
                tiposCocinaSeleccionados: arr.slice(0, arr.indexOf(removedItem)).concat(arr.slice(arr.indexOf(removedItem) + 1, arr.length + 1))
            })
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
        if (this.state.nombreRestaurante !== '') {
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
            let arrID = this.state.tiposCocinaSeleccionados.map((arr) => { return arr.id });
            let stringArrID = arrID.join(',');
            let nomRestaurante = this.state.nombreRestaurante;
            let nom = '';
            if (this.state.tiposCocinaSeleccionados.length === 0) {
                stringArrID = '0';
            }
            if (nomRestaurante === '') {
                nom = '0'
            }
            console.log(stringArrID);
            console.log(nomRestaurante);
            axios.get('http://localhost:8000/api/restaurants/search/' + nom + '/' + stringArrID).then(
                res => {
                    console.log(res.data);
                    this.setState({
                        resBusqueda: res.data
                    })
                    localStorage.setItem('resBusqueda', JSON.stringify(res.data));
                    window.location = '/restaurantes'
                }
            );
        }
    }
    deleteSearch = () => {
        localStorage.removeItem('resBusqueda');
        window.location = '/restaurantes'
    }
    render() {
        let resBusqueda = JSON.parse(localStorage.getItem('resBusqueda'));
        return (
            <div>
                <div className="p-2">
                    <h5>Búsqueda de restaurantes</h5>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col md={4}>
                                <FormGroup >
                                    <Label for="nomRestaurante"></Label>
                                    <Input style={{
                                        'border': this.state.errors.nombreRestaurante ? '1px solid red' : '',
                                    }}
                                        type="text" value={this.state.nombreRestaurante} name="nombreRestaurante"
                                        id="nomRestaurante" placeholder='Nombre' onChange={this.handleChange} />

                                </FormGroup>
                                <div className="text-danger pr-3">
                                    {this.state.errors.nombreRestaurante}
                                </div>
                            </Col>
                            <Col md={4}>
                                <FormGroup >
                                    <Label for="estiloCocina"></Label>
                                    <Multiselect options={this.state.tiposCocina}
                                        displayValue="tipoCocina"
                                        onSelect={this.onSelect} onRemove={this.onRemove}
                                        hidePlaceholder={true} placeholder="Elija los tipos de cocina" />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <Button block className="rounded mt-4"><BsSearch /></Button>
                            </Col>
                            {resBusqueda ? (
                                <Col md={2}>
                                    <Button color="danger" block className="rounded mt-4" onClick={this.deleteSearch}>Eliminar búsqueda</Button>
                                </Col>
                            ) : ('')}
                        </Row>
                    </Form >
                </div >
            </div >
        )
    }
}

export default BusquedaRestaurantes
