import React, { Component } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { Row, Col, Button, UncontrolledTooltip } from 'reactstrap'
import CrearPlato from './CrearPlato'
import AlergenosPlato from './AlergenosPlato'
import './menuEstilos.css'
import axios from 'axios'
import authHeader from '../../Security/auth/auth-header'
export class RestMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            platos: [],
            idRestaurante: '',
            nomRestaurante: ''
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        axios.get('http://127.0.0.1:8000/api/restaurant/' + user.user.userable_id + '/platos').then(res => (
            this.setState({ platos: res.data, idRestaurante: user.user.userable_id, nomRestaurante: user.user.name })
        ));

    }

    checkDishDelete = (idPlato) => {
        console.log(idPlato);
        Swal.fire({
            icon: 'warning',
            title: 'Eliminar plato?',
            text: '¿Quiere eliminar el plato?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar plato',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/plato/' + idPlato.target.id,
                    {
                        headers: authHeader()
                    }).then(() => {
                        Swal.fire(
                            'Plato eliminado!',
                            'El plato ha sido eliminado correctamente.',
                            'success'
                        )

                    })
            }
        });
    }

    render() {
        return (
            <div>
                <Row className="p-4">
                    <Col md="12" className="bg-dark text-light rounded text-center">
                        <h5>
                            Carta restaurante {this.state.nomRestaurante}
                        </h5>
                    </Col>
                </Row>

                <Row className="p-2">
                    <CrearPlato />
                </Row>

                <Row className="p-3 ml-1 container">
                    <table id="menu"
                        className="table text-white table-dark mt-4"
                        style={{ 'tableLayout': 'fixed' }}
                    >
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th>Descripción</th>
                                <th scope="col">Tipo plato</th>
                                <th scope="col">Vegano</th>
                                <th scope="col">Alérgenos</th>
                                <th scope="col">Precio (€)</th>
                                <th scope="col">Imagen plato</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.platos.map(plato => (
                                <tr key={plato.id}>
                                    <td className="oneliner">{plato.nombre}</td>
                                    <td id="descripcionPlato" className="oneliner">
                                        {plato.descripcion}
                                        <UncontrolledTooltip fade placement="bottom" target="descripcionPlato">
                                            {plato.descripcion}
                                        </UncontrolledTooltip>
                                    </td>
                                    <td>{plato.tipo_plato}</td>
                                    <td>{plato.vegano == 0 ? 'No' : 'Si'}</td>
                                    <AlergenosPlato idPlato={plato.id} />
                                    <td>{plato.precio}</td>
                                    <td className="oneliner"></td>
                                    <td>
                                        <CrearPlato
                                            nomModal="Editar plato"
                                            idPlato={plato.id}
                                            nomPlato={plato.nombre}
                                            descPlato={plato.descripcion}
                                            tipoPlato={plato.tipo_plato}
                                            vegano={plato.vegano}
                                            alergenos=""
                                            precioPlato={plato.precio}
                                        />
                                        {console.log(plato.id)}
                                        <Button id={plato.id} color="danger" className="mb-1" onClick={this.checkDishDelete}><BsFillTrashFill /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Row>
            </div>
        )
    }
}

export default RestMenu
