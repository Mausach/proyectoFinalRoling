import React from 'react'
import { Container, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Logo from '../assets/img/Logo/El_Buen_Comer_PNG.png'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


export const Footer = ({ emailUs }) => {

  const navigate = useNavigate();

  const ir_404 = (e) => {
    e.preventDefault();
    swal("Error 404", "Pagina destino no encontrada", "error");
  }


  const ir_Register = () => {
    navigate('/register')
  }

  const ir_Home = () => {
    navigate('/home', { state: emailUs })
  }

  return (
    <div>
      <footer className='p-3 rounded fondo_nav_footer mt-3 text-white'>
        <Container>
          <div className='d-flex justify-content-center align-items-center p-5 p-sm-4 mb-1'>
            <img className="logo" style={{ width: '250px' }} src={Logo} alt="Logo" onClick={ir_Home} />
          </div>

          <Row className="justify-content-center">
            <Col lg='5' md='12' className='mb-4 mb-md-0'>
              <h4 className='text-uppercase'>El BUEN COMER</h4>

              <p>
                Deléitate con nuestros platos
                en la comodidad de tu hogar
              </p>

              <p>
                <a href='#' className='text-white' onClick={ir_Register}>
                  Registreate para aprovechar las promociones
                </a>
              </p>
            </Col>

            <Col lg='3' md='6' className='mb-4 mb-md-0'>
              <h4 className='text-uppercase'>Metodos de Pagos:</h4>

              <ul className='list-unstyled mb-0'>
                <li>

                  <i className="bi bi-cash text-success">  </i> En efectivo al momento de recibir tu pedido


                </li>
                <li>

                  <i className="bi bi-credit-card text-warning"> </i>Tarjeta de credito,debito y mercadopago




                </li>

              </ul>
            </Col>


            <Col lg='3' md='6' className='mb-4 mb-md-0'>
              <h4 className='text-uppercase mb-0'>Nuestras Redes</h4>

              <ul className='list-inline mt-3'>
                <li className="list-inline-item m-3">
                  <h3>
                    <a href="" className='text-light'>
                      <i className="bi bi-instagram" onClick={(e) => ir_404(e)}> </i>
                    </a>
                  </h3>

                </li>
                <li className="list-inline-item m-3">
                  <h3>
                    <a href="" className='text-light'>
                      <i className="bi bi-facebook" onClick={(e) => ir_404(e)}> </i>
                    </a>
                  </h3>
                </li>
                <li className="list-inline-item m-3">
                  <h3>
                    <a href="" className='text-light'>
                      <i className="bi bi-twitter" onClick={(e) => ir_404(e)}> </i>
                    </a>
                  </h3>
                </li>

              </ul>
            </Col>
          </Row>
          <hr></hr>
          <div className="text-white rounded d-flex justify-content-center align-items-center">
            <p> Todos los derechos reservados. 2023 <b>El Buen Comer &copy;</b></p>
          </div>
        </Container>
      </footer>

    </div>
  )
}
