import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-modal';
import swal from 'sweetalert';
import { AlertaGuardarUs } from '../helpers/GuardarUsuario';

export const ModalAgregarUsuario = ({ isModalOpenUs, setIsModalOpenUs, navigate }) => {

  //estado para guardar los datos del Usuario desde la pagina de administracion
  const [formDateUs, setFormDateUs] = useState({
    name: '',
    email: '',
    password: '',
  });

  //cuando el admin use el boton alta de Usuarios
  const onSubmitFormUs = (e) => {
    e.preventDefault();

    const { name, email, password, rol } = formDateUs;

    //validaciones
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      rol.length === 0
    ) {
      swal({
        title: "todos los campos son obligatorios",
        icon: "error",
      });
      return console.log('todos los campos son obligatorios');
    } else {
      console.log(formDateUs);
      AlertaGuardarUs(name, email, password, rol, navigate);
      setIsModalOpenUs(false);
    }
  };

  // onChange es leer los datos cuando vea cambios en el formulario
  const onChangeFormUs = (e) => {
    setFormDateUs({
      ...formDateUs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* Modal para agregar Usuarios */}
      <Modal isOpen={isModalOpenUs} onRequestClose={() => setIsModalOpenUs(false)}
        className='text-white d-flex justify-content-center align-items-center p-5 p-sm-4 mt-5 border'>

        <Form className='p-5 p-sm-4 bg-dark rounded border border-white' onSubmit={onSubmitFormUs}>
          <h2>Alta del Usuario</h2>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Nombre"
              className="w-60"
              maxLength={30}
              onChange={onChangeFormUs}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control
              type="text"
              name="email"
              className="w-60"
              maxLength={30}
              onChange={onChangeFormUs}
            />

          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              className="w-60"
              onChange={onChangeFormUs}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Rol :</Form.Label>
            <select name="rol" onChange={onChangeFormUs} className='rounded mt-3 ms-3'>
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </Form.Group>

          <div className='d-grid mx-auto'>
            <Button type="submit" variant="danger" className="rounded btn btn-danger m-2 ">
              <h5>
                <i className='bi bi-person-fill-add'> </i>
                Guardar Usuario
              </h5>
            </Button>
          </div>

        </Form>
      </Modal>

    </div>
  )
}
