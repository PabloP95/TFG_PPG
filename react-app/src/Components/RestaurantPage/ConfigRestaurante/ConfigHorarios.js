import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import axios from 'axios'
import Horarios from '../../Security/SURestaurante/Horarios'
export class ConfigHorarios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            horarios: [],
            idRestaurante: ''
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        axios.get('http://127.0.0.1:8000/api/horarios/restaurant/' + user.user.userable_id).then(
            res => {
                this.setState({
                    horarios: res.data,
                    idRestaurante: res.data.restaurant_id,
                })
            }
        )
    }
    eventHandler = (data) => {
        this.setState({ horarios: data });
    }
    render() {
        return (
            <div>
                <br />
                <h5>Horario actual</h5>
                <Row>
                    {this.state.horarios.map(horario => (
                        <Col md="6" sm="6" xs="6" className="p-2" key={horario.id}>
                            <h5>{horario.dia}</h5>
                            {horario.horarioAperturaP1 === null && horario.horarioCierreP1 === null && horario.horarioAperturaP2 === null && horario.horarioCierreP2 === null ?
                                (
                                    'Cerrado'
                                ) :
                                <div>{horario.horarioAperturaP1.split(':').slice(0, 2).join(':')} - {horario.horarioCierreP1.split(':').slice(0, 2).join(':')} | {horario.horarioAperturaP2.split(':').slice(0, 2).join(':')} - {horario.horarioCierreP2.split(':').slice(0, 2).join(':')}</div>
                            }
                        </Col>
                    ))}
                </Row>
                <br />
                <Horarios onChange={this.eventHandler} />
            </div>
        )
    }
}

export default ConfigHorarios
