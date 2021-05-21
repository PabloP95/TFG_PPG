import React from 'react';
import {
    Row
} from 'reactstrap';

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
                    <img src="img/felicidad.png" alt="Imagen carousel 1" />

                </div>
                <div>
                    <img src="img/promo_amigo.png" alt="Imagen carousel 2" />

                </div>
                <div>
                    <img src="img/promo_nuevo.png" alt="Imagen carousel 3" />

                </div>
            </Carousel>
        </div >
    );
}


export default Home;