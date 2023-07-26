import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

export const CarouselHome = () => {
  return (
    <div>

      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.wallpapertip.com/wmimgs/4-45846_food-wallpaper-hd-wallpaper-backgrounds-food-hd-wallpapers.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h4 className='text-dark border-light texto-con-sombras-multiples'>Disfruta de la Comida</h4>
            <h5 className='text-dark border-light texto-con-sombras-multiples'>Preparada con los mas frescos ingredientes</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://wallpaperaccess.com/full/1843908.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h4 className='text-white border-light texto-con-sombras-multiples'>Dale sason a tu comida</h4>
            <h5 className='text-white border-light texto-con-sombras-multiples'>Con la gran calidad de nuestra marca de condimentos</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images3.alphacoders.com/295/2957.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h4 className='text-white border-light texto-con-sombras-multiples'>Muy pronto....</h4>
            <h5 className='text-white border-light texto-con-sombras-multiples'>
              Endulzaremos tu paladar con nuestra nueva seccion de masas finas y reposteria
            </h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </div>
  )
}
