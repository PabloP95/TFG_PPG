import React, { Component } from 'react';

import { Form, Input, Button, FormGroup, Label } from 'reactstrap'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { FaSpinner } from 'react-icons/fa'
import '../../react-leaflet.css'
import { MarkerIcon } from '../../react-leaflet-icon';
import Trunc from '../functions/Trunc';
import 'leaflet/dist/leaflet.css';
import * as opencage from 'opencage-api-client';



const CustomMarker = props => {
    const initMarker = ref => {
        if (ref) {
            ref.leafletElement.openPopup();
        }
    }
    return <Marker ref={initMarker} {...props} />
}
export class PaginaPrueba extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            apikey: '9fe141db7f4a489fb7bdcc998923cbde',
            submittingLoad: false,
            hasSubmitted: false,
            currentLocation: { lat: 0, lng: 0 },
            zoom: 12,
            // user: {},
            paises: [],
            moneda: [],
            pictures: [],
        }
    }
    handleClick = (e) => {
        this.setState({ currentLocation: e.latlng });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ submittingLoad: true });
        opencage
            .geocode({ key: this.state.apikey, q: this.state.query })
            .then(response => {
                console.log(response);
                this.setState({
                    submittingLoad: false,
                    currentLocation: response.results[0].geometry
                });
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    submittingLoad: false,
                    response: {}
                });
            });
    }

    handleChange = (e) => {
        this.setState({ query: e.target.value });
    }


    render() {
        console.log(this.state.query);
        let moneda = localStorage.getItem('moneda');
        let dinero = localStorage.getItem('dinero');
        console.log(moneda);
        console.log(dinero);
        console.log(this.state.pictures);
        const { currentLocation, zoom } = this.state;
        return (
            <div>
                <h1>Hola a todos</h1>
                <h3>El articulo vale 50 euros, que en dolares canadienses es: {<Trunc x={dinero * 50} posiciones={2} />} {moneda}</h3>
                <hr />
                <h3>
                    Enlaces de importancia en el testeo de la página
                </h3>
                <a href="user/sonicblazer">Diseño de la página de usuario de nombreUsuario = sonicblazer</a>
                <br />
                <a href="restaurante/a">Diseño de la página de restaurante</a>
                <p>En especial del restaurante de nombre a (aunque mejor el id)</p>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="query">Localización</Label>
                        <Input type="string" id="query" name="query" value={this.state.query} onChange={this.handleChange} />
                    </FormGroup>
                    {this.state.submittingLoad ? (
                        <Button><FaSpinner className="icon-spin" /> Mandar info</Button>
                    ) : (
                        <Button>Mandar info</Button>
                    )
                    }
                </Form>
                {!this.state.submittingLoad && this.state.currentLocation.lat !== 0 && this.state.currentLocation.lng !== 0 ? (
                    <Map center={currentLocation} zoom={zoom} onClick={this.handleClick} className="leaflet-container">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="© <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
                        />
                        <CustomMarker position={currentLocation} icon={MarkerIcon}></CustomMarker>
                    </Map>
                ) : ('')
                }

            </div >
        );
    }
}

export default PaginaPrueba;
