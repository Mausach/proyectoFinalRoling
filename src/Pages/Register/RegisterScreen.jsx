import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { FormularioRegister } from './Componentes/FormularioRegister';
import { NavBar } from '../../Componentes/NavBar';
import { Footer } from '../../Componentes/Footer';
import { useLocation } from 'react-router-dom';



export const RegisterScreen = () => {

  const location = useLocation();

  const emailUs = location.state;
  
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  
  
  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center customHeigth">
        <Spinner animation="border" role="status" variant="light" />
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  } else {
    return (
      <div>
        <NavBar emailUs={emailUs}/>
        <div className="d-flex justify-content-center align-items-center customHeigth">
        <FormularioRegister />
      </div>
      <Footer emailUs={emailUs}/>
      </div>
      
    )
  }
}