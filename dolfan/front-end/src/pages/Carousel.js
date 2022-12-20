import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import '../components/Header.css';
import straykids from '../images/straykids.jpg';
import twice from '../images/twice.jpg';
import redvelvet from '../images/redvelvet.jpg';
function MyCarousel() {
    
    return (
        <Carousel>
          <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={twice} alt="First slide"/>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={straykids} alt="Second slide"/>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={redvelvet} alt="Third slide"/>
          </Carousel.Item>
        </Carousel>
    );

}

export default MyCarousel;