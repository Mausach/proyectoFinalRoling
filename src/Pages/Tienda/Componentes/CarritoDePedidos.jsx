import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-modal';
import { eliminarProductoDelCarrito, obtenerDatos } from '../helpers/OperacionesDelCarrito';

export const CarritoDePedidos = ({ carrito, setCarrito, cargarProductos, setCargarProductos, emailUs, navigate }) => {

    let total = 0;//valor que se muestra en la tabla del carrito para el monto total

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    if (carrito.length !== 0) {
        let cant = 'Pedidos : '+ carrito.length;
        return (
            <div className="d-flex justify-content-end me-5">

                <Button variant="success" className="mb-3 border border-warning" onClick={openModal}>
                    <h4>
                        <i className="bi bi-cart-fill"> </i>
                        {cant}
                    </h4>
                </Button>
                
                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
                    className='text-white d-flex justify-content-center align-items-center p-5 p-sm-4 mt-5'>

                    <Form className='p-5 p-sm-4 bg-dark rounded border border-white'>
                        <Table striped bordered hover variant="dark" className="text-white justify-content-center align-items-center p-5 p-sm-4 border border-white">

                            <thead>
                                <tr>
                                    <th colSpan={5}>
                                        <h3 className='text-center text-warning'>Tu Pedido</h3>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>precio</th>
                                    <th>Cantidad</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>

                            {carrito.map((producto) => {
                                total = total + (producto.precio * producto.cantidad);
                                return (

                                    <tbody key={producto._id}>
                                        <tr>
                                            <td>

                                                <img src={producto.url_img} alt={producto.categoria} width="75"></img>
                                            </td>
                                            <td>{producto.name}</td>
                                            <td>{'$' + producto.precio}</td>
                                            <td>{producto.cantidad /*esto cambiar por la cantidad que se pide*/}</td>

                                            <td>
                                                <button className='btn btn-outline-danger'
                                                    onClick={(e) => eliminarProductoDelCarrito(producto._id, e, cargarProductos, setCargarProductos, carrito, setCarrito)}>
                                                    <strong className='font-weight-bold'>
                                                        <h3>
                                                            {/*Eliminar*/}
                                                            <i className='bi bi-trash3-fill'></i>
                                                        </h3>
                                                    </strong>
                                                </button>
                                            </td>

                                        </tr>
                                    </tbody>
                                );
                            }
                            )}
                        </Table>

                        <h3>Precio Total: ${total}</h3>

                        <div className='d-grid mx-auto'>

                            <Button type="submit" variant="danger" className="d-flex rounded btn btn-danger m-2" onClick={(e) => obtenerDatos(e, 1, carrito, emailUs, navigate)}>
                                <h5>
                                    <i class="bi bi-cash"> </i>
                                    Realizar pedido
                                </h5>
                            </Button>

                            <Button type="submit" variant="danger" className="d-flex rounded btn btn-danger m-2" onClick={(e) => obtenerDatos(e, 2, carrito, emailUs, navigate)}>
                                <h5>

                                    <i class="bi bi-credit-card-2-back"> </i>
                                    Mercado Pago
                                </h5>
                            </Button>

                        </div>

                    </Form>
                </Modal>

            </div>
        )
    }
}
