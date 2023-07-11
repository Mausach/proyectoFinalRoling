import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';
import { AlertaEliminar } from '../helpers/EliminarProducto';
import { ModalEditarProducto } from './ModalEditarProducto';


export const TablaMenus = ({ cargarProductos, navigate }) => {

  //estado para almacenar los datos del producto que quiero editar
  const [productoEditar, setProductoEditar] = useState({});

  //estado para abrir y cerrar el modal de editar producto
  const [isModalOpenEditar, setIsModalOpenEditar] = useState(false);

  const editarProductoClick = (producto) => {
    setProductoEditar(producto);
    setIsModalOpenEditar(true);
  };

  return (
    <div>
      <Container>
        <Table striped bordered hover variant="dark" responsive="sm" className="text-white justify-content-center align-items-center p-5 p-sm-4 border border-white">

          <thead>

            <tr>
              <th colSpan={9}>
                <h3 className='text-center text-warning'>Productos</h3>
              </th>
            </tr>

            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>estado</th>
              <th>precio</th>
              <th className='d-none d-md-table-cell'>detalle</th>
              <th>categoria</th>
              <th>cantidad</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>

          {cargarProductos.map((producto) => {
            return (
              <tbody key={producto._id}>
                <tr>
                  <td>

                    <img src={producto.url_img} alt={producto.categoria} width="75"></img>
                  </td>
                  <td>{producto.name}</td>
                  <td>{producto.estado}</td>
                  <td>{'$' + producto.precio}</td>
                  <td className='d-none d-md-table-cell'>{producto.detalle}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.cantidad}</td>
                  <td>
                    <button className='btn btn-outline-warning'
                      onClick={() => editarProductoClick(producto)}>
                      <strong className='font-weight-bold'>
                        <h3>
                          {/*Editar*/}
                          <i className='bi bi-pencil-square'></i>
                        </h3>
                      </strong>

                    </button>
                  </td>
                  <td>
                    <button className='btn btn-outline-danger '
                      onClick={() => AlertaEliminar(producto._id, producto.name, navigate)}>
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
          })}

        </Table>
      </Container>

      <ModalEditarProducto isModalOpenEditar={isModalOpenEditar} setIsModalOpenEditar={setIsModalOpenEditar}
        productoEditar={productoEditar} setProductoEditar={setProductoEditar} />


    </div>
  )
}
