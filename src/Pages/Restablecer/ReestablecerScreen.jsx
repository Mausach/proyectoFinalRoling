import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { FormularioRestablecer } from './Componentes/FormularioRestablecer';
import { NavBar } from '../../Componentes/NavBar';
import { Footer } from '../../Componentes/Footer';

export const ReestablecerScreen = () => {

  localStorage.removeItem('token');
  const emailUs = null;

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
        <NavBar emailUs={emailUs} />
        <div className="d-flex align-items-center justify-content-center customHeigth">
          <FormularioRestablecer />
        </div>
        <Footer emailUs={emailUs} />
      </div>

    )
  }
}
