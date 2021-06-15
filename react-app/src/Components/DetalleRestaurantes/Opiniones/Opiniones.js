import React, { Component } from 'react';
import { Row } from 'reactstrap';
import './opiniones.css';
import FiltroOpiniones from './FiltroOpiniones';
import OpinionesRestaurante from './OpinionesRestaurante';

export class Opiniones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opiniones: [],
            filtrado: false,
        }
    }
    eventHandler = (data) => {
        this.setState({ opiniones: data[0], filtrado: data[1] })
    }
    render() {
        return (
            <div id="opiniones" className="p-4">
                <hr />
                <Row>
                    <OpinionesRestaurante filtrado={this.state.filtrado} opiniones={this.state.opiniones} />
                    <FiltroOpiniones onChange={this.eventHandler} filtrado={this.state.filtrado} opiniones={this.state.opiniones} />
                </Row>
            </div >
        )
    }
}

export default Opiniones
