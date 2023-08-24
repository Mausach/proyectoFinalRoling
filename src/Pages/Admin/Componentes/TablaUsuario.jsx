import React from 'react'
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';
import { AlertaInhabilitar } from '../helpers/InhabilitarUsuario';
import { AlertaHabilitar } from '../helpers/habilitarUsuario';

export const TablaUsuario = ({ cargarUsuarios, navigate }) => {

  return (
    <div>
      <Container>
        <Table striped bordered hover variant="dark" responsive="sm" className="text-white justify-content-center align-items-center p-5 p-sm-4 border border-white">

          <thead>
            <tr>
              <th colSpan={6}>
                <h3 className='text-center text-warning'>Usuarios</h3>
              </th>
            </tr>
            <tr>

              <th className='d-none d-md-table-cell'>#ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Rol</th>
              <th>Inactivar</th>
            </tr>
          </thead>

          {cargarUsuarios.map((usuario) => {
            return (
              <tbody key={usuario._id}>
                <tr>

                  <td className='d-none d-md-table-cell'>{usuario._id}</td>
                  <td>{usuario.name}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.estado}</td>
                  <td>{usuario.rol}</td>
                  <td>
                    {usuario.estado === 'activo' && (

                      <button className='btn btn-outline-danger '
                        onClick={() => AlertaInhabilitar(usuario._id, usuario.name, usuario.email, navigate)}>
                        <strong className='font-weight-bold'>
                          <h3>
                            
                            <i className='bi bi-person-fill-slash'> </i>
                          </h3>
                        </strong>
                      </button>

                    )}
                    {usuario.estado === 'Inactivo' && (

                      <button className='btn btn-outline-Secondary'
                      onClick={() => AlertaHabilitar(usuario._id, usuario.name, usuario.email, navigate)}>
                        <strong className='font-weight-bold'>
                          <h3>
                            
                            <i className='bi bi-person-fill-slash'> </i>
                          </h3>
                        </strong>
                      </button>

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
