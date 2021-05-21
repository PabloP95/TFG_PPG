import React, { Component } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { Row, Col, Button, UncontrolledTooltip } from 'reactstrap'
import CrearPlato from './CrearPlato'
import './menuEstilos.css'
export class RestMenu extends Component {

    checkDishDelete = () => {
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
                Swal.fire(
                    'Plato eliminado!',
                    'El plato ha sido eliminado correctamente.',
                    'success'
                )
            }
        });
    }

    eliminarPlato = () => {
        this.checkDishDelete();
    }
    render() {
        return (
            <div>
                <Row className="p-4">
                    <Col md="12" className="bg-dark text-light rounded text-center">
                        <h5>
                            Carta restaurante A
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
                            <td className="oneliner">Plato 1</td>
                            <td id="descripcionPlato" className="oneliner">
                                Plato de prueba asdadqasdasdasdasdasdasd
                                <UncontrolledTooltip fade placement="bottom" target="descripcionPlato">
                                    Plato de prueba asdadqasdasdasdasdasdasd
                                </UncontrolledTooltip>
                            </td>

                            <td>Platos principales</td>
                            <td>No</td>
                            <td className="oneliner"></td>
                            <td>7.50</td>
                            <td className="oneliner"></td>
                            <td>
                                <CrearPlato
                                    nomModal="Editar plato"
                                    nomPlato="Plato 1"
                                    descPlato="Plato de prueba"
                                    tipoPlato="Platos principales"
                                    vegano="no"
                                    alergenos=""
                                    precioPlato="7.50"
                                />
                                <Button color="danger" className="mb-1" onClick={this.eliminarPlato}><BsFillTrashFill /></Button>
                            </td>


                        </tbody>

                        <tbody>
                            <td className="oneliner">Plato 1</td>
                            <td id="descripcionPlato" className="oneliner">
                                Plato de prueba asdadqasdasdasdasdasdasd
                                <UncontrolledTooltip fade placement="bottom" target="descripcionPlato">
                                    Plato de prueba asdadqasdasdasdasdasdasd
                                </UncontrolledTooltip>
                            </td>

                            <td>Platos principales</td>
                            <td>No</td>
                            <td className="oneliner"></td>
                            <td>7.50</td>
                            <td className="oneliner"></td>
                            <td>
                                <CrearPlato
                                    nomModal="Editar plato"
                                    nomPlato="Plato 1"
                                    descPlato="Plato de prueba"
                                    tipoPlato="Platos principales"
                                    vegano="no"
                                    alergenos=""
                                    precioPlato="7.50"
                                />
                                <Button color="danger" className="mb-1" onClick={this.eliminarPlato}><BsFillTrashFill /></Button>
                            </td>


                        </tbody>
                    </table>
                </Row>
            </div>
        )
    }
}

export default RestMenu
