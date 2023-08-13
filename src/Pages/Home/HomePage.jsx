import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { NavBar } from '../../Componentes/NavBar';
import { Footer } from '../../Componentes/Footer';
import { CarouselHome } from './Componentes/CarouselHome';
import { CardsHome } from './Componentes/CardsHome';
import { cargarProductosDB } from './helpers/CargarProductos';

export const HomePage = () => {

  const location = useLocation();

  const emailUs = location.state;
  
  const [cargarProductos, setCargarProductos] = useState([]);
  
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1500);

  const navigate = useNavigate();

  useEffect(() => {
    cargarProductosDB(setCargarProductos, navigate);
  }, []);
  
  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center customHeigth">
        <Spinner animation="border" role="status" variant="light" />
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  } else {
    return (
      <div className='text-white'>
        <NavBar emailUs={emailUs}/>

        <div className='carousel-inner main-carousel'>
          <CarouselHome />
        </div>

        
        <main id='container-main'>
          <CardsHome cargarProductos={cargarProductos} navigate={navigate} emailUs={emailUs} />
        </main>

        <Footer emailUs={emailUs}/>
      </div>
    )
  }

}
