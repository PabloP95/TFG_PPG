import React, { Component } from 'react';
import axios from 'axios';
//import authHeader from './Security/auth/auth-header';

import Trunc from '../functions/Trunc';
export class PaginaPrueba extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // user: {},
            paises: [],
            moneda: [],
            pictures: [],
        }
    }

    componentDidMount() {
        /*axios.get('http://127.0.0.1:8000/api/auth/userProfile',
            {
                headers: authHeader()
            }
        ).then(res => {
            this.setState({ user: res.data });
        });
*/
    }

    onDrop = (picture) => {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
    render() {
        let moneda = localStorage.getItem('moneda');
        let dinero = localStorage.getItem('dinero');
        console.log(moneda);
        console.log(dinero);
        console.log(this.state.pictures);
        return (
            <div>
                <h1>Hola a todos</h1>
                <h2>Esta es la página de este usuario:</h2>
                <h3>El articulo vale 50 euros, que en dolares canadienses es: {<Trunc x={dinero * 50} posiciones={2} />} {moneda}</h3>
                <hr />
                <h3 underline>
                    Enlaces de importancia en el testeo de la página
                </h3>
                <a href="user/sonicblazer">Diseño de la página de usuario de nombreUsuario = sonicblazer</a>
                <br />
                <a href="restaurante/a">Diseño de la página de restaurante</a>
                <p>En especial del restaurante de nombre a (aunque mejor el id)</p>

            </div>
        )
    }
}

export default PaginaPrueba;
