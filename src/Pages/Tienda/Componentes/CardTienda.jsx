import React from 'react'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { guardarDatosEnCarrito } from '../helpers/OperacionesDelCarrito';

export const CardTienda = ({ producto, carrito, setCarrito, cargarProductos, emailUs, navigate }) => {




    return (
        <div>

            <Card className='card fondo_card text-white m-3 col-3 p-2 col-md-4 col-xl-3' border="light" style={{ width: '20rem' }}>
                <Card.Img variant="top" src={producto.url_img} />
                <Card.Body>
                    <Card.Title>{producto.name}</Card.Title>
                    <Card.Text>
                        {producto.detalle}
                    </Card.Text>
                    <Card.Text>
                        cantidad : {producto.cantidad}
                    </Card.Text>
                    <Card.Text>
                        precio: ${producto.precio}
                    </Card.Text>

                    <Button variant="danger" className="mb-3" onClick={(e) => guardarDatosEnCarrito(producto._id, e, carrito, setCarrito, cargarProductos, emailUs, navigate)}>
                        <h4>
                            <i className="bi bi-cart-plus"> </i>
                            añadir al pedido
                        </h4>
                    </Button>
                </Card.Body>
            </Card>

        </div>
    )
}
