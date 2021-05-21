import React, { Component } from 'react';
//import axios from 'axios';
import './votos.css';
export class Votos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maximoPosible: 0,
            porcentaje: 0
        }
    }
    render() {
        return (
            <ul className="stars">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
        )
    }
}

export default Votos;
