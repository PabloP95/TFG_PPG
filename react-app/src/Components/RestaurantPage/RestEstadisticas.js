import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
export class RestEstadisticas extends Component {
    render() {
        return (
            <div>
                <Row className="p-4">
                    <Col md="12" className="bg-dark text-light rounded text-center">
                        <h5>
                            Panel de estadisticas
                        </h5>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default RestEstadisticas
