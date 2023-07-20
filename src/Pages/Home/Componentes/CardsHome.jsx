import React from 'react'
import { AsideHome } from './AsideHome';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export const CardsHome = ({ cargarProductos, navigate, emailUs }) => {
    let cont = 1;

    const ir_tienda = () => {
        navigate('/tienda', { state: emailUs })
    }

    return (
        <div>
            <div className="card-container">
                <Row xs={1} md={2} className='g-4'>
                    {cargarProductos.map((producto) => {
                        if (producto.cantidad != 0 && cont < 4 && producto.estado != 'Inactivo') {
                            cont++;
                            return <Col className='col-12 col-md-4 col-lg-3' key={producto._id} >
                                <Card className='card fondo_card text-white' border="light" >
                                    <Card.Img variant="top" src={producto.url_img} />
                                    <Card.Body>
                                        <Card.Title>{producto.name}</Card.Title>
                                        <hr></hr>
                                        <Card.Text>
                                            {producto.detalle}
                                        </Card.Text>
                                        
                                        <Card.Text>
                                            precio: ${producto.precio}
                                        </Card.Text>

                                        <Button variant="danger" className="mb-2" onClick={ir_tienda}>
                                            <h6>
                                                <i className="bi bi-eye"> </i>
                                                Ver mas...
                                            </h6>
                                        </Button>

                                    </Card.Body>
                                </Card>
                            </Col>
                        }
                    })}

                    <AsideHome />

                </Row>
            </div>
        </div>
    )
}
