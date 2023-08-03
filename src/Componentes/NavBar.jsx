import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../assets/img/Logo/El_Buen_Comer_PNG.png'
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

export const NavBar = ({ emailUs, carritoDePedidos }) => {

  const navigate = useNavigate();

  const ir_tienda = () => {
    navigate('/tienda', { state: emailUs })
  }

  const ir_Login = () => {
    emailUs = null;
    navigate('/login', { state: emailUs })
  }

  const ir_Register = () => {
    navigate('/register', { state: emailUs })
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
    <div >


      <Navbar expand="lg" className="navbar-dark navbar-expand-lg fondo_nav_footer" id="navbar">
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
              <Nav.Link className='text-light'>
                <Button className="m-2" variant="outline-light" onClick={ir_Home}>
                  INICIO
                </Button>

              </Nav.Link>

              <Nav.Link className='text-light'>
                <Button className="m-2" variant="outline-light" onClick={ir_tienda}>
                  MENU
                </Button>
              </Nav.Link>

              <Nav.Link>
                <Dropdown className="m-2">

                  <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                    QUIENES SOMOS
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <NavDropdown.Item onClick={ir_Nosotros}>Nosotros</NavDropdown.Item>
                    <NavDropdown.Item onClick={ir_NuestroEquipo}>Equipo de desarrollo</NavDropdown.Item>
                  </Dropdown.Menu>

                </Dropdown>
              </Nav.Link>

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
                      INICIAR SESIÒN
                    </Button>
                    <Button className="m-2" variant="outline-warning" onClick={ir_Register}>
                      REGÌSTRARSE
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
