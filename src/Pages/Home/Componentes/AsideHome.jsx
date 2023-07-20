import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export const AsideHome = () => {
  return (

    <Col className="col-12 col-md-12 col-lg-3">
      <aside className="card-propaganda" >


        <Card className='bg-warning'>
          <Card.Body className='text-dark text-center card-propaganda-links'>
            <Card.Title>Encontra lo que buscas</Card.Title>

            <Carousel data-bs-theme="dark" className='w-100 d-none d-md-block'>
              <Carousel.Item>
                <img
                  className="w-100 d-none d-md-block"
                  src="https://media.istockphoto.com/id/477567550/es/foto/bebidas-helada.jpg?s=612x612&w=0&k=20&c=utvO5blVI8Ti37mn4vHsxxDo5ZvWlQO1RV6mh5e_Uvs="
                  alt="First slide"
                />
                <h4 className='text-dark border-light texto-con-sombras-multiples'>Aprovecha de nuestras promociones</h4>
                <h5 className='text-dark border-light texto-con-sombras-multiples'>
                  Disfruta de las mejores bebidas!!!
                </h5>

              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="w-100 d-none d-md-block"
                  src="https://comoinvestir.thecap.com.br/medias/2022/10/heineken-reduz-lucro-e-decepciona-em-receita-no-3t22.webp"
                  alt="Second slide"
                />
                <h4 className='text-dark border-light texto-con-sombras-multiples'>Aprovecha de nuestras promociones</h4>
                <h5 className='text-dark border-light texto-con-sombras-multiples'>
                  Disfruta de las mejores bebidas!!!
                </h5>


              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="w-100 d-none d-md-block"
                  src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/USCI4T475ZAUROG3DXOSOSY6QY.jpg"
                  alt="Third slide"
                />

                <h4 className='text-dark border-light texto-con-sombras-multiples'>Aprovecha de nuestras promociones</h4>
                <h5 className='text-dark border-light texto-con-sombras-multiples'>
                  Disfruta de las mejores bebidas!!!
                </h5>

              </Carousel.Item>
            </Carousel>

          </Card.Body>
        </Card>

      </aside>
    </Col>

  )
}
