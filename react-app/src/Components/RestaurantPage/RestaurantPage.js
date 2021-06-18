import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import NavRest from './NavRest'
import RestInicio from './RestInicio'
import RestConfig from './RestConfig'
import RestMenu from './ConfigMenu/RestMenu'
import RestOpiniones from './RestOpiniones'


export class RestaurantPage extends Component {
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        let arr = window.location.href.split('/');
        if (user === null) {
            window.location = '/login'
        }
        else if (user.user.name !== arr[4] || user.user.userable_type !== 'App\\Models\\Restaurant') {
            window.location = '/404'
        }
    }

    render() {
        return (
            <div className="container">
                <Row className="p-3">
                    <Col md="3" className="p-3">
                        <NavRest />
                    </Col>
                    <Col md="9" className="p-3">
                        <div className="tab-content bg-light" id="pills-tabContentRest">
                            <div className="tab-pane fade show active" id="pills-inicioRest" role="tabpanel" aria-labelledby="pills-inicioRest-tab">
                                <RestInicio />
                            </div>
                            <div className="tab-pane fade" id="pills-configRest" role="tabpanel" aria-labelledby="pills-configRest-tab">
                                <RestConfig />
                            </div>
                            <div className="tab-pane fade" id="pills-menuRest" role="tabpanel" aria-labelledby="pills-menuRest-tab">
                                <RestMenu />
                            </div>
                            <div className="tab-pane fade" id="pills-opinionesRest" role="tabpanel" aria-labelledby="pills-opinionesRest-tab">
                                <RestOpiniones />
                            </div>

                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default RestaurantPage
