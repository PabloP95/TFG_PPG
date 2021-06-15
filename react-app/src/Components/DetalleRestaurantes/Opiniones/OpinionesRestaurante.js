import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios'
export class OpinionesRestaurante extends Component {

    constructor(props) {
        super(props);
        let arr = window.location.href.split('/');
        console.log(arr);
        this.state = {
            opiniones: [],
            idRestaurante: arr[5]
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/opiniones').then((res) => {
            this.setState({
                opiniones: res.data
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.opiniones !== this.props.opiniones || prevProps.filtrado !== this.props.filtrado) {
            this.setState({
                opiniones: this.props.opiniones
            });
        }
    }
    render() {
        return (
            <Col md="8" sm="12" className="order-2 order-md-6">
                <h5 className="text-left p-3">Opiniones</h5>
                {this.state.opiniones.length !== 0 ? (
                    this.state.opiniones.map((opinion) => (
                        <Row key={opinion.id}>
                            <Col md="4">
                                <figure className="figure">
                                    <img src="https://via.placeholder.com/100.png" className="figure-img img-fluid figure-rounded" alt="Foto usuario" />
                                    <figcaption className="figure-caption text-center">{opinion.name}<br />Fecha publicación:
                                        {
                                            ' ' + new Date(opinion.updated_at).getDate() + '/' +
                                            [new Date(opinion.updated_at).getMonth() + 1] + '/' +
                                            new Date(opinion.updated_at).getFullYear()
                                        }
                                    </figcaption>
                                </figure>
                            </Col>
                            <Col md="6">
                                <p className="text-left">Nota: {opinion.nota}/5</p>
                                <p className="text-justify comments">{opinion.comentario}</p>
                            </Col>
                        </Row>
                    ))
                ) : this.props.filtrado ? (
                    <h5>Aún no existen opiniones que concuerden con el filtro realizado.
                        <br />Pruebe filtrar con otros valores o intentelo más tarde
                    </h5>) : (
                    <h5>Ningún usuario ha realizado una opinión de este restaurante
                    </h5>)
                }
            </Col>
        )
    }
}

export default OpinionesRestaurante
