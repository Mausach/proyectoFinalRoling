import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Logo from '../../../assets/img/Logo/El_Buen_Comer_PNG.png'


export const CardNosotros = () => {
    return (
        <div>
            <Card className="text-center mt-3 card text-white bg-dark border border-white">
      <Card.Header></Card.Header>
      <Card.Body>
      <div className='d-flex justify-content-center align-items-center p-5 p-sm-4 mt-2'>
            <img className="logo" style={{ width: '700px' }} src={Logo} alt="Logo"/>
          </div>
        <Card.Title>Deléitate con nuestros platos, directo a tu hogar</Card.Title>
        <Card.Text>
        Somos una tienda completamente Online, preparada para brindarte los mejores platos en la modalidad de Delivery.
                permitiendonos administrar los pedidos con envios a domicilio. Espero disfruten nuestros servicios
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted"></Card.Footer>
    </Card>
        </div>
    )
}
