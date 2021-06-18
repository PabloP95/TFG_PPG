import React from 'react';
import { Row, Col } from 'reactstrap'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Home = () => {
    return (
        <div >
            <Carousel
                autoPlay={true}
                emulateTouch={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
            >
                <div>
                    <img src="img/spencer-davis-jZ2lhAhy2ZI-unsplash.jpg" alt="Imagen carousel 1" width="1800" height="450" />
                </div>
                <div>
                    <img src="img/jay-wennington-N_Y88TWmGwA-unsplash.jpg" alt="Imagen carousel 2" width="1800" height="450" />

                </div>
                <div>
                    <img src="img/tim-mossholder-FH3nWjvia-U-unsplash.jpg" alt="Imagen carousel 3" width="1800" height="450" />
                </div>
                <div>
                    <img src="img/jerry-shen-a_5A4yOojlE-unsplash.jpg" alt="Imagen carousel 4" width="1800" height="450" />

                </div>
                <div>
                    <img src="img/whitney-wright-6G98hiCJETA-unsplash.jpg" alt="Imagen carousel 5" width="1800" height="450" />
                </div>

            </Carousel>

            <div className="container pt-5">
                <Row>
                    <Col lg={4}>
                        <img src="img/user.png" className="rounded-circle" alt="Imagen de usuario" width="140" height="140" />
                        <h2>Usuarios</h2>
                        <p>Todos los usuarios podrán visualizar los datos de los restaurantes, entre los que están la ubicación, los tipos de cocina y el horario, ver lo que opinan los usuarios del restaurante y buscar restaurantes.</p>

                    </Col>

                    <Col lg={4} className="pt-2">
                        <img src="img/registeredUser.png" width="140" height="140" alt="Imagen de usuario registrado" className="rounded-circle" />
                        <h2>Usuarios registrados</h2>
                        <p>
                            Una vez que se haya dado de alta, podrá modificar sus datos, realizar reservas en un restaurante, realizar una opinión sobre los restaurantes a los que haya ido, entre otras cosas.
                        </p>

                    </Col>

                    <Col lg={4}>
                        <img src="img/restaurant.png" className="rounded-circle" alt="Imagen de restaurante" width="140" height="140" />
                        <h2>Restaurantes</h2>
                        <p>
                            Una vez que se haya dado de alta, podrá modificar sus datos, modificar la carta e incluso obtener un feedback directo de los clientes a través de las opiniones que hayan realizado estos.</p>

                    </Col>
                </Row>
                <hr className="featurette-divider" />
                <Row className="featurette">
                    <Col md={7}>
                        <h2 className="featurette-heading">Carta, <span className="text-muted">creación y modificación</span></h2>
                        <p className="lead">Si eres un restaurante, podrás colocar tu carta en tu usuario, de manera que los usuarios puedan consultar los platos que tengas en carta. Incluso podrás modificar la carta, cambiando el precio o borrando un plato que ya no se prepare, de manera fácil.</p>
                    </Col>
                    <Col md={5}>
                        <img className="featurette-image img-fluid mx-auto" src="img/menu.png" alt="Imagen de una carta de restaurante" width="500" height="500" />
                    </Col>
                </Row>
                <hr className="featurette-divider" />
                <Row className="featurette">
                    <Col md={7} className="order-md-2">
                        <h2 className="featurette-heading">Opiniones y reservas, <span className="text-muted">creación y modificación</span></h2>
                        <p className="lead">Si eres un usuario registrado, podrás dejar una opinión a los restaurantes a los que hayas ido y realizar reservas a restaurantes a los que quieras ir. Además, podrás modificar tanto las opiniones como la reserva, pudiendo incluso eliminarlas con tan solo un par de clics.</p>
                    </Col>
                    <Col md={5} className="order-md-1">
                        <img className="featurette-image img-fluid mx-auto" src="img/opinion.png" alt="Opiniones" />
                    </Col>
                </Row>
                <hr className="featurette-divider" />
                <Row className="featurette">
                    <Col md={7}>
                        <h2 className="featurette-heading">Usuarios, <span className="text-muted">¿qué pueden hacer?</span></h2>
                        <p className="lead">
                            Los usuarios podrán:
                            <ul className="text-left">
                                <li style={{ 'listStyleType': 'none' }}>Visualizar los datos de los restaurantes (como la ubicación, la carta o los tipos de cocina, entre otros).</li>
                                <li style={{ 'listStyleType': 'none' }}>Visualizar las opiniones que han realizado los usuarios de un restaurante, si es que existiesen.</li>
                                <li style={{ 'listStyleType': 'none' }}>Realizar una búsqueda de los restaurantes, tanto en la misma página de restaurantes como utilizando la barra de búsqueda que se encuentra en el encabezado de la página.</li>
                            </ul>
                        </p>
                    </Col>
                    <Col md={5}>
                        <img className="featurette-image img-fluid mx-auto" src="img/busqueda.png" alt="Búsqueda de restaurantes" />
                    </Col>
                </Row>
            </div>
        </div>


    );
}


export default Home;