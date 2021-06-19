import React, { Component } from 'react'
import { BsPencilSquare, BsPlusCircleFill } from 'react-icons/bs'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Col } from 'reactstrap'
import { Multiselect } from 'multiselect-react-dropdown'
import Swal from 'sweetalert2';
import axios from 'axios';
import authHeader from '../../Security/auth/auth-header';
//import ImageUploader from "react-images-upload";
export class CrearPlato extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alergenos: [],
            infoPlato: {
                nomPlato: this.props.nomPlato ? this.props.nomPlato : '',
                descPlato: this.props.descPlato ? this.props.descPlato : '',
                tipoPlato: this.props.tipoPlato ? this.props.tipoPlato : 'Entrantes',
                vegano: this.props.vegano ? this.props.vegano : '0',
                precioPlato: this.props.precioPlato ? this.props.precioPlato : '',

            },
            numeroConsultas: this.props.numeroConsultas,
            alergenosPlato: [],
            dishOpen: false,
            errors: {
                nombre: '',
                descripcionPlato: '',
                precioPlato: ''
            }
        }

    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/alergenos').then(res => (
            this.setState({
                alergenos: res.data
            })
        ))
        if (this.props.idPlato !== undefined) {
            axios.get('http://127.0.0.1:8000/api/plato/' + this.props.idPlato + '/alergenos').then(
                res => {
                    let numConsultas = this.state.numeroConsultas;
                    this.setState({
                        alergenosPlato: res.data,
                        numeroConsultas: numConsultas++
                    })
                }
            )
        }
    }


    toggleNewDish = () => {
        this.setState({ dishOpen: !this.state.dishOpen });
    }
    handleChange = (e) => {
        const { infoPlato } = this.state;
        infoPlato[e.target.name] = e.target.value;
        this.setState({ infoPlato });
    }

    onSelect = (selectedList, selectedItem) => {
        this.setState({ alergenosPlato: [...this.state.alergenosPlato, selectedItem] });
    }

    onRemove = (selectedList, removedItem) => {
        let arr = [...this.state.alergenosPlato];

        if (arr.indexOf(removedItem) === 0) {
            this.setState({ alergenosPlato: arr.slice(0, 0).concat(arr.slice(1, arr.length + 1)) });
        }

        else if (arr.indexOf(removedItem) > 0) {
            this.setState({
                alergenosPlato:
                    arr.slice(0, arr.indexOf(removedItem))
                        .concat(arr.slice(arr.indexOf(removedItem) + 1, arr.length + 1))
            });
        }
    }

    showAllOK = () => {
        Swal.fire({
            icon: 'success',
            title: this.props.nomModal ? 'Plato editado' : 'Plato creado',
            text: this.props.nomModal ? 'Plato editado satisfactoriamente.' : 'Plato creado satisfactoriamente.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Volver a la configuración del menu',
        }).then((result) => {
            if (result.isConfirmed) {

                this.setState({
                    numeroConsultas: 1 + this.state.numeroConsultas,
                    infoPlato: {},
                    alergenosPlato: []
                });
                if (this.props.onChange) {
                    this.props.onChange(this.state.numeroConsultas);
                }
                this.toggleNewDish();
            }
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            let user = JSON.parse(localStorage.getItem('user'));
            this.props.nomModal ? (
                axios.put('http://127.0.0.1:8000/api/restaurant/' + user.user.userable_id + '/plato/' + this.props.idPlato,
                    {
                        nombre: this.state.infoPlato.nomPlato,
                        descripcion: this.state.infoPlato.descPlato,
                        tipo_plato: this.state.infoPlato.tipoPlato,
                        vegano: this.state.infoPlato.vegano,
                        precio: this.state.infoPlato.precioPlato,

                    },
                    { headers: authHeader() }).then(() => {

                        let arrID = this.state.alergenosPlato.map((arr) => { return arr.id });
                        axios.post('http://127.0.0.1:8000/api/restaurant/' + user.user.userable_id + '/plato/' + this.props.idPlato + '/alergenos',
                            {
                                alergenosSelected: arrID
                            },
                            {
                                headers: authHeader()
                            }).then(() => {
                                this.setState({
                                    alergenos: this.state.alergenosPlato
                                })
                            })


                        this.showAllOK();
                    }).catch(error => {
                        if (error.response) {
                            if (error.response.status === 400) {
                                this.setState({ errors: JSON.parse(error.response.data) })
                            }
                        }
                    })
            ) : (
                axios.post('http://127.0.0.1:8000/api/plato/restaurant/' + user.user.userable_id,
                    {
                        nombre: this.state.infoPlato.nomPlato,
                        descripcion: this.state.infoPlato.descPlato,
                        tipo_plato: this.state.infoPlato.tipoPlato,
                        vegano: this.state.infoPlato.vegano,
                        precio: this.state.infoPlato.precioPlato,
                        restaurant_id: user.user.userable_id,

                    },
                    {
                        headers: authHeader()
                    }
                ).then((res) => {

                    let arrID = this.state.alergenosPlato.map((arr) => { return arr.id });
                    axios.post('http://127.0.0.1:8000/api/restaurant/' + user.user.userable_id + '/plato/' + res.data.id + '/alergenos',
                        {
                            alergenosSelected: arrID
                        },
                        {
                            headers: authHeader()
                        })
                    this.showAllOK();
                }).catch(error => {
                    if (error.response && error.response.status === 400) {
                        this.setState({ errors: JSON.parse(error.response.data) });
                    }
                })
            )
        }
    }

    handleChangeFile = (e) => {
        const { infoPlato } = this.state;
        infoPlato[e.target.name] = URL.createObjectURL(e.target.files[0]);
        this.setState({ infoPlato });
    }

    validate() {
        let allOK = true;
        let errors = {};

        if (!this.state.infoPlato.nomPlato) {
            allOK = false;
            errors['nombre'] = "Debe introducir el nombre del plato"
        }

        if (!this.state.infoPlato.descPlato) {
            allOK = false;
            errors['descPlato'] = "Debe realizar una descripción del plato";
        }

        if (!this.state.infoPlato.precioPlato) {
            allOK = false;
            errors['precioPlato'] = "Debe introducir el precio del plato";
        }

        else if (typeof this.state.infoPlato.precioPlato !== 'undefined') {
            let regex = new RegExp(/\d+\.*\d{0,2}/);
            if (!regex.test(this.state.infoPlato.precioPlato)) {
                allOK = false;
                errors['precioPlato'] = "El formato es incorrecto";
            }
        }
        this.setState({ errors });
        return allOK;
    }
    /*  onDrop = (pictureFiles, pictureDataURLs) => {
         const { infoPlato } = this.state;
         infoPlato['imgPlato'] = pictureFiles[0]
         this.setState({
             infoPlato
         });
     } */
    render() {
        return (
            <>
                {this.props.nomModal ? (
                    <Button color="info" onClick={this.toggleNewDish}><BsPencilSquare /></Button>
                ) : (
                    <Col md={{ size: 4, offset: 8 }} className="mt-3 mr-0">
                        <Button color="info" onClick={this.toggleNewDish}>< BsPlusCircleFill size={20} className="pb-1" /> Crear plato</Button>
                    </Col>
                )}

                <Modal scrollable className="pt-5" isOpen={this.state.dishOpen} toggle={this.toggleNewDish}>
                    <ModalHeader toggle={this.toggleNewDish}>{this.props.nomModal ? ('Editando plato') : ('Creando un nuevo plato')}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="nomPlato">Nombre del plato</Label>
                                <Input type="text" id="nomPlato" name="nomPlato"
                                    value={this.state.infoPlato.nomPlato}
                                    style={{ 'border': this.state.errors.nombre ? '1px solid red' : '' }}
                                    onChange={this.handleChange} />
                                <div className="text-danger">{this.state.errors.nombre}</div>
                            </FormGroup>

                            <FormGroup>
                                <Label for="descPlato">Descripción del plato</Label>
                                <Input type="textarea" id="descPlato" name="descPlato"
                                    value={this.state.infoPlato.descPlato}
                                    style={{ 'border': this.state.errors.descPlato ? '1px solid red' : '' }}
                                    onChange={this.handleChange} />
                                <div className="text-danger">{this.state.errors.descPlato}</div>
                            </FormGroup>

                            <FormGroup>
                                <Label for="tipoPlato">Tipo plato</Label>
                                <Input type="select" value={this.state.infoPlato.tipoPlato} id="tipoPlato" name="tipoPlato"
                                    onChange={this.handleChange}
                                >
                                    <option>Entrantes</option>
                                    <option>Platos principales</option>
                                    <option>Bebidas</option>
                                    <option>Postres</option>
                                </Input>
                            </FormGroup>
                            <FormGroup tag="fieldset">
                                <legend>Vegano</legend>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="vegano" id="veganoSI" value="1"
                                            checked={this.state.infoPlato.vegano === "1"}
                                            onChange={this.handleChange} />
                                        Si
                                    </Label>
                                </FormGroup>

                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="vegano" id="veganoNO" value="0"
                                            checked={this.state.infoPlato.vegano === "0"}
                                            onChange={this.handleChange} />
                                        No
                                    </Label>
                                </FormGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="alergenosPlato">
                                    Alérgenos
                                </Label>
                                <Multiselect options={this.state.alergenos} // Options to display in the dropdown
                                    onSelect={this.onSelect} // Function will trigger on select event
                                    onRemove={this.onRemove} // Function will trigger on remove event
                                    selectedValues={this.state.alergenosPlato}
                                    displayValue="nomAlergeno"
                                    hidePlaceholder={true}
                                    placeholder="Elija los alérgenos" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="precioPlato">Precio del plato (21% IVA incluido)</Label>
                                <Input type="number" id="precioPlato" name="precioPlato" placeholder="7.50"
                                    step="0.01" min="0"
                                    value={this.state.infoPlato.precioPlato}
                                    style={{ 'border': this.state.errors.precioPlato ? '1px solid red' : '' }}
                                    onChange={this.handleChange} />
                                <div className="text-danger">{this.state.errors.precioPlato}</div>
                            </FormGroup>

                            {/* <FormGroup>
                                <ImageUploader
                                    withIcon={false}
                                    withPreview={true}
                                    singleImage={true}
                                    label=""
                                    buttonText="Subir imagen plato"
                                    onChange={this.onDrop}
                                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
                                    maxFileSize={1048576}
                                    fileSizeError=" file size is too big"
                                />
                            </FormGroup> */}
                            <Button color="success" block>{this.props.nomModal ? this.props.nomModal : 'Crear plato'}</Button>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button block color="secondary" onClick={this.toggleNewDish}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default CrearPlato
