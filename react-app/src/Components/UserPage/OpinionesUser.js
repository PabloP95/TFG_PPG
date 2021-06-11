import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import { ImCross } from 'react-icons/im';
import axios from 'axios'

import Logout from '../Security/Logout';
import CrearOpinion from './CrearOpinion';
import authHeader from '../Security/auth/auth-header'
import './botonesStyle.css'
export class OpinionesUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opiniones: [],
            idCliente: '',
            numeroConsultas: 0
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        axios.get('http://127.0.0.1:8000/api/client/' + user.user.userable_id + '/opiniones',
            { headers: authHeader() }
        ).then((res) => {
            this.setState({
                numeroConsultas: this.state.numeroConsultas++,
                opiniones: res.data,
                idCliente: user.user.userable_id
            })
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                { Logout() };
                window.location = '/login'
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.numeroConsultas !== this.state.numeroConsultas) {
            axios.get('http://127.0.0.1:8000/api/client/' + this.state.idCliente + '/opiniones',
                { headers: authHeader() }
            ).then(res => {
                this.setState({
                    opiniones: res.data
                })
            })
        }
    }
    checkOpinionDelete = (idOpinion) => {
        Swal.fire({
            icon: 'warning',
            title: '¿Eliminar opinión?',
            text: '¿Quiere eliminar la opinión?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar opinión',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://127.0.0.1:8000/api/client/' + this.state.idCliente + '/opinion/' + idOpinion.target.id,
                    {
                        headers: authHeader()
                    }).then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Opinión eliminada',
                            text: 'Opinión eliminada con éxito.',
                            timer: 3000
                        });
                        this.setState({
                            numeroConsultas: this.state.numeroConsultas++
                        })
                    })
            }
        })
    }

    eventHandlerOpiniones = (data) => {
        this.setState({ numeroConsultas: data });
    }
    render() {
        return (
            <div>
                <Row className="p-4">
                    <Col md="12" className="bg-dark text-light rounded text-center">
                        <h5>
                            Opiniones
                        </h5>
                    </Col>
                    <CrearOpinion
                        idCliente={this.state.idCliente}
                        numeroConsultas={this.state.numeroConsultas + 1}
                        onChange={this.eventHandlerOpiniones} />
                </Row>
                {this.state.opiniones.map((opinion) => (
                    <Row key={opinion.id} className="p-4">
                        <Col md="9" className="text-justify">
                            <p>Nota: {opinion.nota} estrellas/5</p>
                            <p>Restaurante: {opinion.name}</p>
                            <p>Opinión: {opinion.comentario}</p>
                            <p>Fecha opinión: {
                                ' ' + new Date(opinion.updated_at).getDate() + '/' +
                                [new Date(opinion.updated_at).getMonth() + 1] + '/' +
                                new Date(opinion.updated_at).getFullYear()
                            }</p>
                        </Col>
                        <Col md="3" className="pr-5 pt-5">
                            <CrearOpinion
                                nomModal='Editar opinión'
                                idOpinion={opinion.id}
                                nota={opinion.nota}
                                idCliente={this.state.idCliente}
                                idRestaurante={opinion.restaurant_id}
                                comentario={opinion.comentario}
                                numeroConsultas={this.state.numeroConsultas}
                                onChange={this.eventHandlerOpiniones}
                            />
                            <Button id={opinion.restaurant_id} color="danger" className="ml-2 mb-1 noPointerEvents" onClick={this.checkOpinionDelete}><ImCross size={20} className="pb-1 icon" /></Button>
                        </Col>
                    </Row>
                ))}
            </div>
        )
    }
}

export default OpinionesUser
