import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap'
import { GoClock } from "react-icons/go";
import axios from 'axios';
export class VerHorario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalHorario: false,
            horarios: [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/horarios/restaurant/' + this.props.idRestaurante).then(
            res => {
                this.setState({
                    horarios: res.data,
                })
            }
        );
    }

    toggleHorario = () => {
        this.setState({
            modalHorario: !this.state.modalHorario
        });
    }
    render() {
        return (
            <>
                <Col sm="6" md="3" xs="7">
                    <Button shadow rounded color="white" onClick={this.toggleHorario}><GoClock className="mb-1" /> Horario</Button>
                </Col>
                <Modal scrollable isOpen={this.state.modalHorario} toggle={this.toggleHorario}>
                    <ModalHeader toggle={this.toggleHorario}>Horarios</ModalHeader>
                    <ModalBody>
                        {this.state.horarios.map(horario => (
                            <div key={horario.id}>
                                <h5>{horario.dia}</h5>
                                {horario.horarioAperturaP1 === null && horario.horarioCierreP1 === null && horario.horarioAperturaP2 === null && horario.horarioCierreP2 === null ?
                                    (
                                        'Cerrado'
                                    ) :
                                    <div>
                                        {horario.horarioAperturaP1.split(':').slice(0, 2).join(':')} - {horario.horarioCierreP1.split(':').slice(0, 2).join(':')} | {horario.horarioAperturaP2.split(':').slice(0, 2).join(':')} - {horario.horarioCierreP2.split(':').slice(0, 2).join(':')}
                                    </div>
                                }
                                <br />
                            </div>
                        ))}
                    </ModalBody>
                </Modal>
            </>

        )
    }
}

export default VerHorario
