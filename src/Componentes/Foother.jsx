import React from 'react'
import { Container, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Logo from '../assets/img/Logo/El_Buen_Comer_PNG.png'


export const Foother = () => {
  return (
    <div>Foother
      <footer className='p-3 rounded fondo_nav_footer'>
      <Container>
        <div className='d-flex justify-content-center align-items-center p-5 p-sm-4 mt-2'>
        <img class="logo" style={{width: '250px'}} src={Logo} alt="Logo"/>
        </div>
      
        <Row className="justify-content-center">
        <Col lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Footer Content</h5>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias.
              Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est
              atque cumque eum delectus sint!
            </p>
          </Col>

          <Col lg='3' md='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Intitucion</h5>

            <ul className='list-unstyled mb-0'>
              <li>
                <a href='#!' className='text-white'>
                  Link 1
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  Link 2
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  Link 3
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  Link 4
                </a>
              </li>
            </ul>
          </Col>


          <Col lg='3' md='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase mb-0'>Contactos</h5>

            <ul className='list-unstyled'>
              <li>
                <a href='#!' className='text-white'>
                  Link 1
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  Link 2
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  Link 3
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  Link 4
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="text-white rounded d-flex justify-content-center align-items-center">
              <p> Todos los derechos reservados. 2023 <b>El Buen Comer &copy;</b></p>  
          </div>
      </Container>
    </footer>

    </div>
  )
}
