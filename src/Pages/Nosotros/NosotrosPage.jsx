import React from 'react'
import { CardNosotros } from './Componentes/CardNosotros'
import { Container } from 'react-bootstrap'
import { NavBar } from '../../Componentes/NavBar'
import { Footer } from '../../Componentes/Footer'
import { useLocation } from 'react-router-dom'



export const NosotrosPage = () => {

  const location = useLocation();

  const emailUs = location.state;//recibe el email del loguin

  return (
    <div>
      <NavBar emailUs={emailUs}/>
      <div className='text-white d-flex justify-content-center align-items-center'>
      
      <Container>
        <CardNosotros />
      </Container>
      
    </div>
    <Footer emailUs={emailUs}/>
    </div>
    
  )
}
