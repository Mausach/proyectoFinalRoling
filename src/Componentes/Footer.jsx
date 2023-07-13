import React from 'react'
import { Container, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Logo from '../assets/img/Logo/El_Buen_Comer_PNG.png'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


export const Footer = ({emailUs}) => {

  const navigate = useNavigate();

  const ir_404 = (e) => {
    e.preventDefault();
    swal("Error 404", "Pagina destino no encontrada", "error");
  }

  const ir_Restablecer = () => {
    navigate('/restablecer')
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
          <div className='d-flex justify-content-center align-items-center p-5 p-sm-4 mt-2'>
            <img className="logo" style={{ width: '250px' }} src={Logo} alt="Logo" onClick={ir_Home}/>
          </div>

          <Row className="justify-content-center">
            <Col lg='5' md='12' className='mb-4 mb-md-0'>
              <h4 className='text-uppercase'>El Buen Comer</h4>

              <h5>
              Deléitate con nuestros platos
              </h5>

              <h5>
              en la comodidad de tu hogar
              </h5>
            </Col>

            <Col lg='3' md='6' className='mb-4 mb-md-0 '>
              <h4 className='text-uppercase'>Metodos de Pagos:</h4>

              <ul className='list-unstyled mb-0'>
                <li>
                  <h5>
                    <i className="bi bi-cash text-success">  </i>En efectivo al momento de recibir tu pedido
                  </h5>

                </li>
                <li>
                  <h5>
                    <i className="bi bi-credit-card text-warning"> </i>Tarjeta de credito,debito y mercadopago
                  </h5>



                </li>
                <li>
                  <h5>
                    <a href='#' className='text-white' onClick={ir_Register}>
                      Registreate para aprovechar las promociones
                    </a>
                  </h5>

                </li>
              </ul>
            </Col>


            <Col lg='3' md='6' className='mb-4 mb-md-0'>
              <h4 className='text-uppercase mb-0'>Nuestras Redes</h4>

              <ul className='list-unstyled mt-3'>
                <li>
                  <h3>
                    <a href="" className='text-light'>
                      <i className="bi bi-instagram" onClick={(e) => ir_404(e)}> </i>
                    </a>
                  </h3>

                </li>
                <li>
                  <h3>
                    <a href="" className='text-light'>
                      <i className="bi bi-facebook" onClick={(e) => ir_404(e)}> </i>
                    </a>
                  </h3>
                </li>
                <li>
                  <h3>
                    <a href="" className='text-light'>
                      <i className="bi bi-twitter" onClick={ir_Restablecer}> </i>
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
