import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import { FaRegEdit } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import '../UserPage/botonesStyle.css'
export class ReservasUser extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(localStorage.getItem('user'));
        this.state = {
            reservas: [],
            clientId: user.user.userable_id,
            message: ''
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/client/' + this.state.clientId + '/reservasRealizadas').then(res => {
            this.setState(
                {
                    reservas: res.data
                }
            );
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.message !== this.state.message) {
            axios.get('http://127.0.0.1:8000/api/client/' + this.state.clientId + '/reservasRealizadas').then(res => {
                this.setState({
                    reservas: res.data,
                    message: '',
                });
            })
        }
    }

    borrarReserva = (idReserva) => {
        Swal.fire({
            icon: 'warning',
            title: '¿Eliminar reserva?',
            text: '¿Quiere eliminar la reserva?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar reserva',
            cancelButtonText: 'No',
        }).then((res) => {
            if (res.isConfirmed) {
                axios.delete('http://127.0.0.1:8000/api/client/reserva/' + idReserva.target.id).then((res) => {
                    this.setState({
                        message: res.data
                    })
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Reserva eliminada!',
                    text: 'La reserva ha sido eliminada',
                    timer: 2000
                });
            }
        })
    }


    render() {
        return (
            <div>
                <Row className="p-4">
                    <Col md="12" sm="12" className="bg-dark text-light rounded text-center">
                        <h5>
                            Reservas
                        </h5>
                    </Col>
                </Row>
                {this.state.reservas.length > 0 ? (
                    this.state.reservas.map((reserva) => (

                        <Row className="p-5 border rounded">
                            <Col md={{ size: 3 }} sm="3" >
                                <a href={"/restaurantes/restaurante/" + reserva.restaurant_id}>
                                    <figure className="figure mt-2">
                                        <img src="https://via.placeholder.com/150.png" className="figure-img img-fluid rounded" alt="Imagen restaurante 1" />
                                        <figcaption className="figure-caption text-center">Restaurante {reserva.name}</figcaption>
                                    </figure>
                                </a>
                            </Col>

                            <Col md="6" sm="9" xs="8" className="pr-5 mt-3">
                                <h5>Fecha reserva</h5>
                                <p>{' ' + new Date(reserva.diaReserva).getDate() + '/' +
                                    [new Date(reserva.diaReserva).getMonth() + 1] + '/' +
                                    new Date(reserva.diaReserva).getFullYear()} {reserva.horaReserva.split(':').slice(0, 2).join(':')}h<br />
                                    Mesa 2
                                </p>
                            </Col>
                            <Col md="3" sm="3" xs="4" className="pl-5 mt-5">
                                <Link className="btn btn-info mr-3 mb-1" to={{
                                    pathname: "/restaurantes/restaurante/" + reserva.restaurant_id + "/reserva",
                                    state: {
                                        idReserva: reserva.id,
                                        mesaReserva: reserva.numMesa,
                                        idRestaurante: reserva.restaurant_id,
                                        nomRestaurante: "Restaurante " + reserva.name,
                                        diaReserva: reserva.diaReserva,
                                        horaReserva: reserva.horaReserva,
                                        numComensales: reserva.numOcupantes,
                                    }
                                }}
                                >
                                    <FaRegEdit size={20} className="pb-1" />
                                </Link>
                                <Button id={reserva.id} color="danger" className="mb-1 mr-3 noPointerEvents" onClick={this.borrarReserva}><ImCross size={20} className="pb-1 icon" /></Button>
                            </Col>
                        </Row>
                    ))
                ) : (<h5>No se han realizado reservas</h5>)
                }
            </div>
        )
    }
}

export default ReservasUser
