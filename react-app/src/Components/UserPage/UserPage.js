import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import NavUser from './NavUser'
import ConfigUser from './ConfigUser'
import OpinionesUser from './OpinionesUser'
import PedidosUser from './PedidosUser'
import ReservasUser from './ReservasUser'
import UserInicio from './UserInicio'
export class UserPage extends Component {
    render() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            window.location = '/'
        }
        else {
            return (
                <div className="container">
                    <Row className="p-3">
                        <Col md="3" className="p-3">
                            <NavUser />
                        </Col>
                        <Col md="9" className="p-3">
                            <div className="tab-content bg-light" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-inicio" role="tabpanel" aria-labelledby="pills-inicio-tab">
                                    <UserInicio />
                                </div>
                                <div className="tab-pane fade" id="pills-config" role="tabpanel" aria-labelledby="pills-config-tab">
                                    <ConfigUser />
                                </div>
                                <div className="tab-pane fade" id="pills-reservas" role="tabpanel" aria-labelledby="pills-reservas-tab">
                                    <ReservasUser />
                                </div>
                                <div className="tab-pane fade" id="pills-opiniones" role="tabpanel" aria-labelledby="pills-opiniones-tab">
                                    <OpinionesUser />
                                </div>
                                <div className="tab-pane fade" id="pills-pedidos" role="tabpanel" aria-labelledby="pills-pedidos-tab">
                                    <PedidosUser />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            )
        }
    }
}

export default UserPage
