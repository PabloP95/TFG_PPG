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
            arrayTiposCocina: [],
            objectSelected: []
        }
        this.handleSubmitTipoCocina = this.handleSubmitTipoCocina.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/tiposCocina', {
            headers: authHeader()
        }).then(res => {
            console.log(res.data);
            this.setState({
                arrayTiposCocina: res.data,
            });
        })
    }

    onSelect = (selectedList, selectedItem) => {
        this.setState({ objectSelected: [...this.state.objectSelected, selectedItem] });
    }
    onRemove = (selectedList, removedItem) => {
        let arr = [...this.state.objectSelected];
        if (arr.indexOf(removedItem) === 0) {
            this.setState({
                objectSelected: arr.slice(0, 0).concat(arr.slice(1, arr.length + 1))
            });
        }
        else {
            this.setState({
                objectSelected:
                    arr.slice(0, arr.indexOf(removedItem))
                        .concat(arr.slice(arr.indexOf(removedItem) + 1, arr.length + 1))
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
        /*axios.post('http://127.0.0.1:8000/api/restaurant/' + user.user.userable_id + '/tiposCocina',
            {
                tiposCocinaSelected: this.state.objectSelected,
            },
            { headers: authHeader() }
        );*/

        console.log(this.state.objectSelected);
    }

    render() {
        return (
            <>
                <Label for="tiposCocina" hidden>Tipos de cocina (5 máx.)</Label>
                <Button block color="secondary" onClick={this.toggleCocina}>{this.state.objectSelected.length === 0 ? 'Introducir tipos de cocina' : 'Modificar tipos de cocina'}</Button>
                <Modal isOpen={this.state.modalCocina} toggle={this.toggleCocina}>
                    <ModalHeader toggle={this.toggleCocina}>Tipos de cocina</ModalHeader>
                    <ModalBody>
                        {this.state.objectSelected.map(tipococina => <div>{tipococina.tipoCocina}</div>)}
                        <Button block color="info" onClick={this.toggleCocinaNested} className="mt-3">{this.state.objectSelected.length === 0 ? 'Introducir tipos de cocina' : 'Modificar tipos de cocina'}</Button>
                        <Modal style={{ 'height': '100%' }} scrollable isOpen={this.state.modalCocinaNested} toggle={this.toggleCocinaNested}>
                            <ModalHeader toggle={this.toggleCocinaNested}>{this.state.objectSelected.length !== 0 ? 'Modificando tipos de cocina' : 'Introduciendo tipos de cocina'}</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.handleSubmitTipoCocina}>
                                    <FormGroup>
                                        <Multiselect options={this.state.arrayTiposCocina}
                                            onSelect={this.onSelect} onRemove={this.onRemove} selectedValues={this.state.objectSelected}
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
