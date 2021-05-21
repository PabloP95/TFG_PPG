import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Horarios from '../../Security/SURestaurante/Horarios'
export class ConfigHorarios extends Component {
    render() {
        return (
            <div>
                <br />
                <h5>Horario actual</h5>
                <Row>
                    <Col md="6" sm="6" xs="6" className="p-2">
                        <h5>Lunes</h5>
                        16:00 - 22:00
                    </Col>
                    <Col md="6" sm="6" xs="6" className="p-2">
                        <h5>Martes</h5>
                        16:00 - 22:00
                    </Col>
                    <Col md="6" sm="6" xs="6" className="p-2">
                        <h5>Miércoles</h5>
                        16:00 - 22:00
                    </Col>
                    <Col md="6" sm="6" xs="6" className="p-2">
                        <h5>Jueves</h5>
                        Cerrado
                    </Col>
                    <Col md="6" sm="6" xs="6" className="p-2">
                        <h5>Viernes</h5>
                        15:00 - 22:00
                    </Col>
                    <Col md="6" sm="6" xs="6" className="p-2">
                        <h5>Sábado</h5>
                        14:00 - 22:00
                    </Col>
                    <Col md="12" sm="12" xs="12" className="p-2">
                        <h5>Domingo</h5>
                        Cerrado
                    </Col>
                </Row>
                <br />
                <Horarios nomBoton="Modificar horarios" />
            </div>
        )
    }
}

export default ConfigHorarios
