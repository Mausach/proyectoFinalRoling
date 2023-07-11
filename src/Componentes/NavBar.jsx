import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../assets/img/Logo/El_Buen_Comer_PNG.png'
import { useNavigate } from 'react-router-dom';

export const NavBar = ({ emailUs, carritoDePedidos}) => {

  const navigate = useNavigate();

  const ir_tienda = () => {
    navigate('/tienda', { state: emailUs })
  }

  const ir_Login = () => {
    emailUs = null;
    navigate('/login', { state: emailUs })
  }

  const ir_Register = () => {
    navigate('/register' ,{ state: emailUs })
  }

  const ir_Home = () => {
    navigate('/home', { state: emailUs })
  }

  const ir_Nosotros = () => {
    navigate('/Nosotros', { state: emailUs })
  }

  const ir_NuestroEquipo = () => {
    navigate('/NuestroEquipo', { state: emailUs })
  }

  const ir_LogOut = () => {
    localStorage.removeItem('token');
    emailUs = null;
    navigate('/home')
  }

  return (
    <div>


      <Navbar expand="lg" className="navbar-dark navbar-expand-lg fondo_nav_footer">
        <Container fluid>
          <Navbar.Brand className='text-light d-flex mx-4' onClick={ir_Home}>
            <img className="logo" style={{ width: '300px' }} src={Logo} alt="Logo" />{' '}

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className='text-light' />
          <Navbar.Collapse id="navbarScroll" >

            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link className='text-light' onClick={ir_Home}>
                <h2>
                  <i className="bi bi-house-fill text-warning"> </i>
                </h2>

              </Nav.Link>
              <Nav.Link className='text-light' onClick={ir_tienda}>
                <h4>
                  Menu
                </h4>
              </Nav.Link>

              <h4>
                <NavDropdown title="Quienes Somos" id='custom-drow'>
                  <NavDropdown.Item onClick={ir_Nosotros}>Nosotros</NavDropdown.Item>
                  <NavDropdown.Item onClick={ir_NuestroEquipo}>Nuestro Equipouipo</NavDropdown.Item>
                </NavDropdown>
              </h4>

              <Nav.Link className='text-light'>
                {carritoDePedidos}
              </Nav.Link>

            </Nav>

            <Form className="d-flex">
              <div className='me-5'>

                {emailUs !== null ? (
                  <Button className="m-2" variant="outline-danger" onClick={ir_LogOut}>
                    <i className="bi bi-box-arrow-left"> </i>
                    Salir
                  </Button>
                ) : (
                  <>
                    <Button className="m-2" variant="outline-warning" onClick={ir_Login}>
                      Login
                    </Button>
                    <Button className="m-2" variant="outline-warning" onClick={ir_Register}>
                      Registrate
                    </Button>
                  </>
                )}

              </div>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </div>
  )
}
