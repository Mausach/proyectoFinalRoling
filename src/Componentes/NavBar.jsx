import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../assets/img/Logo/El_Buen_Comer_PNG.png'
import { useLocation , useNavigate } from 'react-router-dom';

export const NavBar = () => {

  const navigate = useNavigate();

  const ir_tienda=()=>{
    navigate('/tienda')
  }

  const ir_Login=()=>{
    navigate('/login')
  }

  const ir_Register=()=>{
    navigate('/register')
  }
  return (
    <div>


<Navbar expand="lg" className="navbar-dark navbar-expand-lg fondo_nav_footer">
      <Container fluid>
        <Navbar.Brand href="#" className='text-light d-flex mx-4'>
        <img class="logo" style={{width: '300px'}} src={Logo} alt="Logo"/>{' '}
        
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className='text-light'/>
        <Navbar.Collapse id="navbarScroll" >

          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className='text-light' href="#action1" >
            <i className="bi bi-house-fill text-warning"> </i>
              </Nav.Link>
            <Nav.Link className='text-light' href="#action2" onClick={ir_tienda}>
              Menu
              </Nav.Link>

            <NavDropdown title="Quienes Somos" id='custom-drow'>
              <NavDropdown.Item href="#action3" >Nosotros</NavDropdown.Item>
              <NavDropdown.Item href="#action4" >Contactanos</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
          <Form className="d-flex">
            <div className='me-5'>
            <Button className="m-2" variant="outline-warning" onClick={ir_Login}>Login</Button>
            <Button className="m-2" variant="outline-warning" onClick={ir_Register}>Registrate</Button>
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    
    </div>
  )
}
