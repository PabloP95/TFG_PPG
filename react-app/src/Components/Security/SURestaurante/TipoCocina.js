import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import authHeader from '../auth/auth-header';
import { Multiselect } from "multiselect-react-dropdown";
export class TipoCocina extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalCocina: false,
            modalCocinaNested: false,
            restaurantID: '',
            arrayTiposCocina: [],
            objectSelected: [],
            tiposCocinaSeleccionados: [],
        }
        this.handleSubmitTipoCocina = this.handleSubmitTipoCocina.bind(this);
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        this.setState({
            restaurantID: user.user.userable_id
        });
        axios.get('http://127.0.0.1:8000/api/tiposCocina/restaurant/' + user.user.userable_id,
            { headers: authHeader() }).then(res => {
                this.setState({
                    tiposCocinaSeleccionados: res.data,
                });
            });

        axios.get('http://127.0.0.1:8000/api/tiposCocina', {
            headers: authHeader()
        }).then(res => {
            this.setState({
                arrayTiposCocina: res.data,
            });
        });
    }

    onSelect = (selectedList, selectedItem) => {
        if (this.state.objectSelected.indexOf(selectedItem) === -1) {
            this.setState({ objectSelected: [...this.state.objectSelected, selectedItem] });
        }
    }
    onRemove = (selectedList, removedItem) => {
        let arr = [...this.state.objectSelected];
        let arrSelected = [...this.state.tiposCocinaSeleccionados];

        if (arrSelected.indexOf(removedItem) === 0) {
            this.setState({
                tiposCocinaSeleccionados: arrSelected.slice(0, 0).concat(arrSelected.slice(1, arrSelected.length + 1)),
            });
        }

        if (arrSelected.indexOf(removedItem) !== 0) {
            this.setState({
                tiposCocinaSeleccionados:
                    arrSelected.slice(0, arrSelected.indexOf(removedItem))
                        .concat(arrSelected.slice(arrSelected.indexOf(removedItem) + 1, arrSelected.length + 1)),
            });
        }

        if (arr.indexOf(removedItem) === 0) {
            this.setState({
                objectSelected: arr.slice(0, 0).concat(arr.slice(1, arr.length + 1)),
            });
        }
        else {
            this.setState({
                objectSelected:
                    arr.slice(0, arr.indexOf(removedItem))
                        .concat(arr.slice(arr.indexOf(removedItem) + 1, arr.length + 1)),

            });
        }

    }
    toggleCocina = () => {
        this.setState({ modalCocina: !this.state.modalCocina });
    }

    toggleCocinaNested = () => {
        this.setState({ modalCocinaNested: !this.state.modalCocinaNested });
    }

    handleSubmitTipoCocina = (e) => {
        e.preventDefault();
        let user = JSON.parse(localStorage.getItem('user'));
        let arr;
        let arrID;
        if (this.state.objectSelected === []) {
            arr = this.state.tiposCocinaSeleccionados;
            arrID = arr.map((arr) => { return arr.id });
            axios.post('http://127.0.0.1:8000/api/tiposCocina/restaurant/' + user.user.userable_id,
                {
                    tiposCocinaSelected: arrID,
                    tiposCocinaNombre: arr,
                },
                { headers: authHeader() }
            ).then(res => {
                this.setState({
                    tiposCocinaSeleccionados: res.data.data
                }, () => {
                    if (this.props.onChange) {
                        this.props.onChange(this.state.tiposCocinaSeleccionados);
                    }
                });
            });
            this.toggleCocinaNested();
        }

        else {
            let arrayDistintos = this.state.objectSelected.filter(o => this.state.tiposCocinaSeleccionados.indexOf(o) >= 0);
            if (arrayDistintos) {
                arr = this.state.objectSelected.concat(this.state.tiposCocinaSeleccionados);
                arrID = arr.map((arr) => { return arr.id });
                axios.post('http://127.0.0.1:8000/api/tiposCocina/restaurant/' + user.user.userable_id,
                    {
                        tiposCocinaSelected: arrID,
                        tiposCocinaNombre: arr,
                    },
                    { headers: authHeader() }
                ).then(res => {
                    this.setState({
                        tiposCocinaSeleccionados: res.data.data,
                        objectSelected: []
                    }, () => {
                        if (this.props.onChange) {
                            this.props.onChange(this.state.tiposCocinaSeleccionados);
                        }
                    });
                });
                this.toggleCocinaNested();
            }
        }
    }

    render() {
        return (
            <>
                <Label for="tiposCocina" hidden>Tipos de cocina (5 máx.)</Label>
                <Button block color="secondary" onClick={this.toggleCocina}>{this.state.tiposCocinaSeleccionados.length === 0 ? 'Introducir tipos de cocina' : 'Modificar tipos de cocina'}</Button>
                <Modal isOpen={this.state.modalCocina} toggle={this.toggleCocina}>
                    <ModalHeader toggle={this.toggleCocina}>Tipos de cocina</ModalHeader>
                    <ModalBody>
                        {this.state.tiposCocinaSeleccionados.map(tipococina => <div key={tipococina.id}>{tipococina.tipoCocina}</div>)}
                        <Button block color="info" onClick={this.toggleCocinaNested} className="mt-3">{this.state.tiposCocinaSeleccionados.length === 0 ? 'Introducir tipos de cocina' : 'Modificar tipos de cocina'}</Button>
                        <Modal style={{ 'height': '100%' }} scrollable isOpen={this.state.modalCocinaNested} toggle={this.toggleCocinaNested}>
                            <ModalHeader toggle={this.toggleCocinaNested}>{this.state.tiposCocinaSeleccionados.length !== 0 ? 'Modificando tipos de cocina' : 'Introduciendo tipos de cocina'}</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.handleSubmitTipoCocina}>
                                    <FormGroup>
                                        <Multiselect options={this.state.arrayTiposCocina}
                                            onSelect={this.onSelect} onRemove={this.onRemove} selectedValues={this.state.tiposCocinaSeleccionados}
                                            displayValue="tipoCocina"
                                            hidePlaceholder={true} placeholder="Elija los tipos de cocina" />
                                    </FormGroup>
                                    <Button type="button" onClick={this.handleSubmitTipoCocina} block color="success">Guardar tipos de cocina</Button>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button block color="secondary" onClick={this.toggleCocinaNested}>Cerrar</Button>
                            </ModalFooter>
                        </Modal>
                    </ModalBody>
                    <ModalFooter>
                        <Button block color="secondary" onClick={this.toggleCocina}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default TipoCocina
