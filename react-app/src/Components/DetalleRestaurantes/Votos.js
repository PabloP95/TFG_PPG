import React, { Component } from 'react';
import axios from 'axios';
import './votos.css';
export class Votos extends Component {
    constructor(props) {
        super(props);
        let arr = window.location.href.split('/');

        this.state = {
            idRestaurante: arr[5],
            maximoPosible: 0,
            porcentaje: 0
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante + '/porcentajeNotas').then((res) => {
            this.setState({
                porcentaje: res.data[0].porcentaje
            });
        }).catch(error => {
            if (error.response && error.response.status === 422) {
                window.location = '/404'
            }
        })
    }
    render() {
        return (
            <ul className="stars">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <div className="stat" style={{ 'width': this.state.porcentaje + 'px' }}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </ul>
        )
    }
}

export default Votos;
