import React, { Component } from 'react';
import { Row } from 'reactstrap';
import './opiniones.css';
import FiltroOpiniones from './FiltroOpiniones';
import OpinionesRestaurante from './OpinionesRestaurante';

export class Opiniones extends Component {
    render() {
        return (
            <div id="opiniones" className="p-4">
                <hr />
                <Row>
                    <OpinionesRestaurante />
                    <FiltroOpiniones />
                </Row>
            </div >
        )
    }
}

export default Opiniones
