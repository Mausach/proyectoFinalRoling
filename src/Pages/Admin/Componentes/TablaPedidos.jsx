import React from 'react'
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { AlertaRealizar } from '../helpers/PedidoRealizado';

export const TablaPedidos = ({ cargarPedidos, navigate }) => {


  return (
    <div>
      <Container>
        <Table striped bordered hover variant="dark" className="p-3 align-items-center justify-content-center border border-white">

          <thead>
            <tr>
              <th colSpan={7}>
                <h3 className='text-center text-warning'>Pedidos</h3>
              </th>
            </tr>

            <tr>
              <th className='d-none d-md-table-cell'>#ID</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Menu</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Realizar</th>

            </tr>
          </thead>

          {cargarPedidos.map((pedidos) => { //cambiar esto para que traiga pedidos
            const Menus = pedidos.menu.map((dato) => `${dato.cantidad} - ${dato.name}`).join(', ');
            return (
              <tbody key={pedidos._id}>
                <tr>
                  <td className='d-none d-md-table-cell'>{pedidos._id}</td>
                  <td>{pedidos.usuario}</td>
                  <td>{pedidos.fecha}</td>
                  <td>{Menus}</td>
                  <td>{'$ ' + pedidos.precio_total}</td>
                  <td>{pedidos.estado}</td>
                  <td>
                    {pedidos.estado != 'Realizado' && (
                      <button className='btn btn-outline-success '
                        onClick={() => AlertaRealizar(pedidos._id, pedidos.usuario, pedidos.menu, navigate)}>
                        <strong className='font-weight-bold'>
                          <h3>
                            {/*Realizar*/}
                            <i className='bi bi-cart-check'></i>
                          </h3>
                        </strong>
                      </button>
                    )}
                    {pedidos.estado === 'Realizado' && (
                      <strong className='font-weight-bold text-Light'>
                        <h3>
                          {/*Realizar*/}
                          <i className='bi bi-cart-check-fill'></i>
                        </h3>
                      </strong>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}

        </Table>
      </Container>
    </div>
  )
}
