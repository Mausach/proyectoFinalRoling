import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { FormularioRegister } from './Componentes/FormularioRegister';
import { NavBar } from '../../Componentes/NavBar';
import { Footer } from '../../Componentes/Footer';



export const RegisterScreen = () => {

  //para animaciion de carga al principio de cada screen
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  //fin de animacion cargando

  //condicional para la animacion de cargando
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
        <NavBar/>
        <div className="d-flex justify-content-center align-items-center customHeigth">
        <FormularioRegister />
      </div>
      <Footer/>
      </div>
      
    )
  }
}