import React, { Component } from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'
import authHeader from '../auth/auth-header';
export class Horarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalHorario: false,
            nestedModal: false,
            closeAll: false,
            horarios: [],
            dias: [],
            restaurantID: '',
            dia: '',
            horaAperturaP1: '',
            horaAperturaP2: '',
            horaCierreP1: '',
            horaCierreP2: '',
            errors: {
                horarioAperturaP1: '',
                horarioAperturaP2: '',
                horarioCierreP1: '',
                horarioCierreP2: '',
            }
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            axios.get('http://127.0.0.1:8000/api/horarios/restaurant/' + user.user.userable_id).then(
                res => {
                    this.setState({
                        horarios: res.data,
                        restaurantID: user.user.userable_id
                    })
                }
            );
            if (this.state.dia !== '') {
                axios.get('http://127.0.0.1:8000/api/restaurant/' + user.user.userable_id + '/horario/' + this.state.dia, {
                    headers: authHeader()
                }).then(res => {
                    this.setState({
                        horaAperturaP1: res.data[0].horarioAperturaP1 !== null ? res.data[0].horarioAperturaP1 : '',
                        horaAperturaP2: res.data[0].horarioAperturaP2 !== null ? res.data[0].horarioAperturaP2 : '',
                        horaCierreP1: res.data[0].horarioCierreP1 !== null ? res.data[0].horarioCierreP1 : '',
                        horaCierreP2: res.data[0].horarioCierreP2 !== null ? res.data[0].horarioCierreP2 : '',
                    })
                })
            }
            else {
                this.setState({
                    horaAperturaP1: '',
                    horaAperturaP2: '',
                    horaCierreP1: '',
                    horaCierreP2: '',
                })
            }
        }
        else {
            window.location = '/login'
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.dia !== this.state.dia) && this.state.dia !== '') {
            let user = JSON.parse(localStorage.getItem('user'));
            axios.get('http://127.0.0.1:8000/api/restaurant/' + user.user.userable_id + '/horario/' + this.state.dia, {
                headers: authHeader()
            }).then(res => {
                this.setState({
                    horaAperturaP1: res.data[0].horarioAperturaP1 !== null ? res.data[0].horarioAperturaP1 : '',
                    horaAperturaP2: res.data[0].horarioAperturaP2 !== null ? res.data[0].horarioAperturaP2 : '',
                    horaCierreP1: res.data[0].horarioCierreP1 !== null ? res.data[0].horarioCierreP1 : '',
                    horaCierreP2: res.data[0].horarioCierreP2 !== null ? res.data[0].horarioCierreP2 : '',
                })

            }).catch(() => {
                this.setState({
                    horaAperturaP1: '',
                    horaAperturaP2: '',
                    horaCierreP1: '',
                    horaCierreP2: '',
                })
            });
        }
    }
    onChangeDay = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }
    onChangeHours = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }
    toggleHorario = () => {
        this.setState({ modalHorario: !this.state.modalHorario });
    }
    toggleNested = () => {
        let arr = this.state.horarios.map((horario) => { return horario.dia });
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: !this.state.closeAll,
            dias: arr
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            if (this.state.dias.indexOf(this.state.dia) !== -1) {
                let arrHA1 = this.state.horaAperturaP1.split(':').slice(0, 2);
                let arrHA2 = this.state.horaAperturaP2.split(':').slice(0, 2);
                let arrHC1 = this.state.horaCierreP1.split(':').slice(0, 2);
                let arrHC2 = this.state.horaCierreP2.split(':').slice(0, 2);
                axios.put('http://127.0.0.1:8000/api/restaurant/' + this.state.restaurantID + '/horario/' + this.state.dia, {
                    horarioAperturaP1: arrHA1.join(':'),
                    horarioAperturaP2: arrHA2.join(':'),
                    horarioCierreP1: arrHC1.join(':'),
                    horarioCierreP2: arrHC2.join(':'),
                },
                    { headers: authHeader() }
                ).then((res => {
                    this.setState({
                        horarios: res.data
                    }, () => {
                        if (this.props.onChange) {
                            this.props.onChange(this.state.horarios);
                        }
                    })
                })
                ).catch()
            }

            else {
                if (this.state.dia !== '') {
                    axios.post('http://127.0.0.1:8000/api/horarios/restaurant/' + this.state.restaurantID,
                        {
                            dia: this.state.dia,
                            horarioAperturaP1: this.state.horaAperturaP1,
                            horarioAperturaP2: this.state.horaAperturaP2,
                            horarioCierreP1: this.state.horaCierreP1,
                            horarioCierreP2: this.state.horaCierreP2,
                            restaurant_id: this.state.restaurantID,
                        },
                        {
                            headers: authHeader()
                        }
                    ).then((res => {
                        this.setState({
                            horarios: res.data,
                        }, () => {
                            if (this.props.onChange) {
                                this.props.onChange(this.state.horarios);
                            }
                        });
                        this.toggleNested();
                    })
                    ).catch()
                }
            }
        }
    }
    validate() {
        let allOK = true;
        let errors = {};

        if (this.state.horaAperturaP1 !== '' && this.state.horaCierreP1 !== '') {
            if (this.state.horaCierreP1 <= this.state.horaAperturaP1) {
                allOK = false;
                errors['horarioAperturaP1'] = "La hora de apertura debe ser anterior a la hora de cierre";
                errors['horarioCierreP1'] = 'La hora de cierre debe ser posterior a la hora de apertura';
            }
        }

        if (this.state.horaAperturaP1 !== '' && this.state.horaCierreP1 !== '' && this.state.horaAperturaP2 !== '') {
            if (this.state.horaCierreP1 > this.state.horaAperturaP1) {
                if (this.state.horaCierreP1 >= this.state.horaAperturaP2) {
                    errors['horarioCierreP1'] = "Debe ser anterior a la hora de apertura del segundo turno";
                    errors['horarioAperturaP2'] = "Debe ser posterior a la hora de cierre del primer turno";
                }
            }
        }

        if (this.state.horaAperturaP1 !== '' && this.state.horaCierreP1 !== '' && this.state.horaAperturaP2 !== '') {
            if (this.state.horaCierreP1 > this.state.horaAperturaP1 && this.state.horaAperturaP2 > this.state.horaCierreP1) {
                if (this.state.horaAperturaP2 >= this.state.horaCierreP2) {
                    errors['horaAperturaP2'] = "Debe ser anterior a la hora de cierre del segundo turno";
                    errors['horaCierreP2'] = "Debe ser posterior a la hora de cierre del primer turno";
                }
            }
        }

        this.setState({
            errors: errors
        });
        return allOK;
    }
    render() {
        return (
            <>
                <Label for="horarios" hidden>Horario</Label>
                <Button block color="secondary" onClick={this.toggleHorario}>{this.state.horarios.length === 0 ? 'Introducir horarios' : 'Modificar horarios'}</Button>
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
                        <hr />
                        <Button block color="info" onClick={this.toggleNested}>{this.state.horarios.length === 0 ? 'Introducir horarios' : 'Modificar horarios'}</Button>
                        <Modal scrollable isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                            <ModalHeader>{this.state.horarios.length === 0 ? 'Introduciendo horarios' : 'Modificando horarios'}</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <Input type="select" name="dia" id="dia" value={this.state.dia} onChange={this.onChangeDay}>
                                        <option hidden={true}>Escoja un día</option>
                                        <option>Lunes</option>
                                        <option>Martes</option>
                                        <option>Miércoles</option>
                                        <option>Jueves</option>
                                        <option>Viernes</option>
                                        <option>Sábado</option>
                                        <option>Domingo</option>
                                    </Input>
                                    <Row form className="pt-3">
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="horaAperturaP1">Apertura</Label>
                                                <Input
                                                    style={{ 'border': this.state.errors.horarioAperturaP1 ? '1px solid red' : '' }}
                                                    type="time" name="horaAperturaP1" id="horaAperturaP1" placeholder="--:--"
                                                    value={this.state.horaAperturaP1} onChange={this.onChangeHours} />
                                                <div className="text-danger">{this.state.errors.horarioAperturaP1}</div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="horaCierreP1">Cierre</Label>
                                                <Input
                                                    style={{ 'border': this.state.errors.horarioCierreP1 ? '1px solid red' : '' }}
                                                    type="time" name="horaCierreP1" id="horaCierreP1" placeholder="--:--"
                                                    value={this.state.horaCierreP1} onChange={this.onChangeHours} />
                                                <div className="text-danger">{this.state.errors.horarioCierreP1}</div>
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="horaAperturaP2">Segunda apertura</Label>
                                                <Input
                                                    style={{ 'border': this.state.errors.horarioAperturaP2 ? '1px solid red' : '' }}
                                                    type="time" name="horaAperturaP2" id="horaAperturaP2" placeholder="--:--" value={this.state.horaAperturaP2} onChange={this.onChangeHours} />
                                                <div className="text-danger">{this.state.errors.horarioAperturaP2}</div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="horaCierreP2">Segundo cierre</Label>
                                                <Input
                                                    style={{ 'border': this.state.errors.horarioCierreP2 ? '1px solid red' : '' }}
                                                    type="time" name="horaCierreP2" id="horaCierreP2" placeholder="--:--" value={this.state.horaCierreP2} onChange={this.onChangeHours} />
                                                <div className="text-danger">{this.state.errors.horarioCierreP2}</div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    {this.state.dia !== '' ? (
                                        <Button type="button" onClick={this.handleSubmit} block color="success">Guardar cambios</Button>
                                    ) : (<Button type="button" disabled onClick={this.handleSubmit} block color="success">Guardar cambios</Button>)}
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button block color="secondary" onClick={this.toggleNested}>Cerrar</Button>
                            </ModalFooter>
                        </Modal>
                    </ModalBody>
                    <ModalFooter>
                        <Button block color="secondary" onClick={this.toggleHorario}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default Horarios
