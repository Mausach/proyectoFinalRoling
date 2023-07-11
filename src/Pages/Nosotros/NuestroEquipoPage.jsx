import React from 'react'
import { Container } from 'react-bootstrap'
import { NavBar } from '../../Componentes/NavBar'
import { Footer } from '../../Componentes/Footer'
import { useLocation } from 'react-router-dom'
import { CardNuestroEquipo } from './Componentes/CardNuestroEquipo'

export const NuestroEquipoPage = () => {

    const location = useLocation();

    const emailUs = location.state;//recibe el email del loguin
    return (
        <div>
            <NavBar emailUs={emailUs} />
            <div className='text-white d-flex justify-content-center align-items-center'>

                <Container>
                    <CardNuestroEquipo />
                </Container>

            </div>
            <Footer emailUs={emailUs} />

        </div>
    )
}
