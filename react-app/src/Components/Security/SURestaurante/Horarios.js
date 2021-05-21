import React, { Component } from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
export class Horarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalHorario: false,
            nestedModal: false,
            closeAll: false,
            restaurantData: {
                horario: {
                    lunes: {
                        l_apertura: "",
                        l_cierre: ""
                    },
                    martes: {
                        m_apertura: "",
                        m_cierre: ""
                    },
                    miercoles: {
                        x_apertura: "",
                        x_cierre: ""
                    },
                    jueves: {
                        j_apertura: "",
                        j_cierre: ""
                    },
                    viernes: {
                        v_apertura: "",
                        v_cierre: ""
                    },
                    sabado: {
                        s_apertura: "",
                        s_cierre: ""
                    },
                    domingo: {
                        d_apertura: "",
                        d_cierre: ""
                    }
                }
            }
        }
    }
    onChangeTimeHandler = (e) => {
        const { restaurantData } = this.state;
        let arrHorario = e.target.name.split("_");
        switch (arrHorario[0]) {
            case 'l': {
                if (arrHorario[1] === "apertura") {
                    restaurantData["horario"]["lunes"][e.target.name] = e.target.value;
                }
                if (arrHorario[1] === "cierre") {
                    restaurantData["horario"]["lunes"][e.target.name] = e.target.value;
                }
                break;
            }
            case 'm': {
                if (arrHorario[1] === "apertura") {
                    restaurantData["horario"]["martes"][e.target.name] = e.target.value;
                }
                if (arrHorario[1] === "cierre") {
                    restaurantData["horario"]["martes"][e.target.name] = e.target.value;
                }
                break;
            }

            case 'x': {
                if (arrHorario[1] === "apertura") {
                    restaurantData["horario"]["miercoles"][e.target.name] = e.target.value;
                }
                if (arrHorario[1] === "cierre") {
                    restaurantData["horario"]["miercoles"][e.target.name] = e.target.value;
                }
                break;
            }
            case 'j': {
                if (arrHorario[1] === "apertura") {
                    restaurantData["horario"]["jueves"][e.target.name] = e.target.value;
                }
                if (arrHorario[1] === "cierre") {
                    restaurantData["horario"]["jueves"][e.target.name] = e.target.value;
                }
                break;
            }
            case 'v': {
                if (arrHorario[1] === "apertura") {
                    restaurantData["horario"]["viernes"][e.target.name] = e.target.value;
                }
                if (arrHorario[1] === "cierre") {
                    restaurantData["horario"]["viernes"][e.target.name] = e.target.value;
                }
                break;
            }
            case 's': {
                if (arrHorario[1] === "apertura") {
                    restaurantData["horario"]["sabado"][e.target.name] = e.target.value;
                }
                if (arrHorario[1] === "cierre") {
                    restaurantData["horario"]["sabado"][e.target.name] = e.target.value;
                }
                break;
            }
            case 'd': {
                if (arrHorario[1] === "apertura") {
                    restaurantData["horario"]["domingo"][e.target.name] = e.target.value;
                }
                if (arrHorario[1] === "cierre") {
                    restaurantData["horario"]["domingo"][e.target.name] = e.target.value;
                }
                break;
            }
            default: {

            }
        }
        this.setState({ restaurantData });
    }
    toggleHorario = () => {
        this.setState({ modalHorario: !this.state.modalHorario });
    }
    toggleNested = () => {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: !this.state.closeAll
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.restaurantData.horario);
    }
    render() {
        return (
            <>
                <Label for="horarios" hidden>Horario</Label>
                <Button block color="secondary" onClick={this.toggleHorario}>{this.props.nomBoton ? this.props.nomBoton : 'Introducir horarios'}</Button>
                <Modal isOpen={this.state.modalHorario} toggle={this.toggleHorario}>
                    <ModalHeader toggle={this.toggleHorario}>Horarios</ModalHeader>
                    <ModalBody>
                        Lunes: {this.state.restaurantData.horario.lunes.l_apertura} - {this.state.restaurantData.horario.lunes.l_cierre}
                        <br />
                        Martes: {this.state.restaurantData.horario.martes.m_apertura} - {this.state.restaurantData.horario.martes.m_cierre}
                        <br />
                        Miércoles: {this.state.restaurantData.horario.miercoles.x_apertura} - {this.state.restaurantData.horario.miercoles.x_cierre}
                        <br />
                        Jueves: {this.state.restaurantData.horario.jueves.j_apertura} - {this.state.restaurantData.horario.jueves.j_cierre}
                        <br />
                        Viernes: {this.state.restaurantData.horario.viernes.v_apertura} - {this.state.restaurantData.horario.viernes.v_cierre}
                        <br />
                        Sábado: {this.state.restaurantData.horario.sabado.s_apertura} - {this.state.restaurantData.horario.sabado.s_cierre}
                        <br />
                        Domingo: {this.state.restaurantData.horario.domingo.d_apertura} - {this.state.restaurantData.horario.domingo.d_cierre}
                        <br />
                        <hr />
                        <Button block color="info" onClick={this.toggleNested}>{this.props.nomBoton ? this.props.nomBoton : 'Introducir horarios'}</Button>
                        <Modal scrollable isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                            <ModalHeader>{this.props.nomBoton ? 'Modificando horarios' : 'Introduciendo horarios'}</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <Row form>
                                        <Col md={3}></Col>
                                        <Col md={6}>
                                            <h3 style={{ 'textAlign': 'center' }}>Lunes</h3>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="l_apertura">Horario apertura</Label>
                                                <Input type="time" name="l_apertura" id="l_apertura" placeholder="--:--" onChange={this.onChangeTimeHandler} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="l_cierre">Horario cierre</Label>
                                                <Input type="time" name="l_cierre" id="l_cierre" placeholder="--:--" onChange={this.onChangeTimeHandler} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={3}></Col>
                                        <Col md={6}>
                                            <h3 style={{ 'textAlign': 'center' }}>Martes</h3>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="m_apertura">Horario apertura</Label>
                                                <Input type="time" name="m_apertura" id="m_apertura" placeholder="--:--" onChange={this.onChangeTimeHandler} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="m_cierre">Horario cierre</Label>
                                                <Input type="time" name="m_cierre" id="m_cierre" placeholder="--:--" onChange={this.onChangeTimeHandler} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={3}></Col>
                                        <Col md={6}>
                                            <h3 style={{ 'textAlign': 'center' }}>Miércoles</h3>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="x_apertura">Horario apertura</Label>
                                                <Input type="time" name="x_apertura" id="x_apertura" placeholder="--:--" onChange={this.onChangeTimeHandler} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="x_cierre">Horario cierre</Label>
                                                <Input type="time" name="x_cierre" id="x_cierre" placeholder="--:--" onChange={this.onChangeTimeHandler} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={3}></Col>
                                        <Col md={6}>
                                            <h3 style={{ 'textAlign': 'center' }}>Jueves</h3>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="j_apertura">Horario apertura</Label>
                                                <Input type="time" name="j_apertura" id="j_apertura" placeholder="--:--" onChange={this.onChangeTimeHandler} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="j_cierre">Horario cierre</Label>
                                                <Input type="time" name="j_cierre" id="j_cierre" placeholder="--:--" onChange={this.onChangeTimeHandler} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={3}></Col>
                                        <Col md={6}>
                                            <h3 style={{ 'textAlign': 'center' }}>Viernes</h3>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="v_apertura">Horario apertura</Label>
                                                <Input type="time" name="v_apertura" id="v_apertura" placeholder="--:--" onChange={this.onChangeTimeHandler} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="v_cierre">Horario cierre</Label>
                                                <Input type="time" name="v_cierre" id="v_cierre" placeholder="--:--" onChange={this.onChangeTimeHandler} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={3}></Col>
                                        <Col md={6}>
                                            <h3 style={{ 'textAlign': 'center' }}>Sábado</h3>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="s_apertura">Horario apertura</Label>
                                                <Input type="time" name="s_apertura" id="s_apertura" placeholder="--:--" onChange={this.onChangeTimeHandler} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="s_cierre">Horario cierre</Label>
                                                <Input type="time" name="s_cierre" id="s_cierre" placeholder="--:--" onChange={this.onChangeTimeHandler} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={3}></Col>
                                        <Col md={6}>
                                            <h3 style={{ 'textAlign': 'center' }}>Domingo</h3>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="d_apertura">Horario apertura</Label>
                                                <Input type="time" name="d_apertura" id="d_apertura" placeholder="--:--" onChange={this.onChangeTimeHandler} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="d_cierre">Horario cierre</Label>
                                                <Input type="time" name="d_cierre" id="d_cierre" placeholder="--:--" onChange={this.onChangeTimeHandler} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button type="button" onClick={this.handleSubmit} block color="success">Guardar cambios</Button>
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
