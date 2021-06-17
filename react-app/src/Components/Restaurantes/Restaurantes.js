import React, { Component } from 'react';
import BusquedaRestaurantes from './BusquedaRestaurantes';
import RestaurantesMejorPuntuados from './RestaurantesMejorPuntuados';

export class Restaurantes extends Component {

    render() {

        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h2 className="poppins-font">Restaurantes</h2>
                </div>

                <div className="container p-3 text-justify">
                    <BusquedaRestaurantes />
                    <br /><br />
                    <RestaurantesMejorPuntuados />
                </div>
            </div>
        );
    }
}

export default Restaurantes;
