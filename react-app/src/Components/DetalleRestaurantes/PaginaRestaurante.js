import React, { Component } from 'react';
import axios from 'axios'; //Necesario para obtener datos del restaurante
//por base de datos
import { Row, Col } from 'reactstrap';
import { GoLocation } from "react-icons/go";
import { FaPhoneAlt, FaUtensils } from "react-icons/fa";
import Votos from './Votos';
import VerHorario from './VerHorario';
import DetallesCard from './DetallesCard';
import Opiniones from './Opiniones/Opiniones';
import '../RestaurantPage/ConfigRestaurante/showTipoCocina.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
export class PaginaRestaurante extends Component {
    constructor(props) {
        super(props);
        let arr = window.location.href.split('/');
        this.state = {
            idRestaurante: arr[5],
            nomRestaurante: '',
            numTelefono: '',
            email: '',
            tiposCocina: [],
            ubicacion: [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/restaurant/' + this.state.idRestaurante).then((res) => {
            this.setState({
                nomRestaurante: res.data[0].name,
                numTelefono: res.data[0].numTelefono,
                email: res.data[0].email,
            })
        })

        axios.get('http://127.0.0.1:8000/api/tiposCocina/restaurant/' + this.state.idRestaurante).then((res) => {
            this.setState({
                tiposCocina: res.data
            })
        });
    }
    render() {
        return (
            <div className="p-4">
                <div id="detalles">
                    <h2 className="poppins-font">Restaurante {this.state.nomRestaurante}</h2>
                    <Row className="p-3">
                        <Col sm="6" md="4" xs="6">
                            <Votos />
                        </Col>
                        <Col sm="6" md="4" xs="6">
                            <p>x opiniones</p>
                        </Col>
                        <Col sm="12" md="4" xs="12">
                            <p className="text-center">€€ - €€€, Tipos de cocina:
                                <ul className="pr-5">
                                    {this.state.tiposCocina.map((tipoCocina) => (
                                        <li className="showTypes" key={tipoCocina.id}>
                                            {tipoCocina.tipoCocina}
                                        </li>
                                    ))}
                                </ul>
                            </p>
                        </Col>
                    </Row>

                    <Row className="p-4">
                        <Col sm="6" md="3" xs="5">
                            <p> <GoLocation /> Ubicación</p>
                        </Col>
                        <Col sm="6" md="3" xs="7">
                            <p> <FaPhoneAlt /> {this.state.numTelefono}</p>
                        </Col>
                        <Col sm="6" md="3" xs="5">
                            <Link to={{
                                pathname: "/restaurantes/restaurante/" + this.state.idRestaurante + "/menu"
                            }}>
                                <p><FaUtensils /> Carta</p>
                            </Link>
                        </Col>
                        <VerHorario idRestaurante={this.state.idRestaurante} />
                    </Row>

                    <Row>
                        <Col md="6" sm="12" xs="12">
                            <figure className="figure ml-2 mt-2">
                                <img src="https://via.placeholder.com/150.png?text=Img1Restaurante"
                                    className="figure-img img-fluid rounded" alt="Imagen 1" />
                            </figure>

                        </Col>
                        <Col md="6" sm="12" xs="12">
                            <figure className="figure ml-2 mt-2">
                                <img src="https://via.placeholder.com/150.png?text=Img2Restaurante"
                                    className="figure-img img-fluid rounded" alt="Imagen 2" />
                            </figure>
                        </Col>
                    </Row>
                </div>
                <DetallesCard
                    idRestaurante={this.state.idRestaurante}
                    nomRestaurante={this.state.nomRestaurante}
                    tiposCocina={this.state.tiposCocina}
                    numTelefono={this.state.numTelefono}
                    ubicacion={this.state.ubicacion}
                    email={this.state.email}
                />
                <Opiniones idRestaurante={this.state.idRestaurante} />
            </div>
        )
    }
}

export default PaginaRestaurante;
