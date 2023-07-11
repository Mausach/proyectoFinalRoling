import React, { useState } from 'react'
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import { enviarCorreo } from '../helpers/EnviarCorreo';

export const ModalLogin = ({ isModalOpen, setIsModalOpen }) => {

  const [Usemail, setUsEmail] = useState({
    email: '',
  });

  const onSubmitUsEmail = (e) => {
    e.preventDefault();
    if (Usemail.email.trim() === "") {
      swal("ERROR", "Debe ingresar su correo electronico", "error");
    } else {
      enviarCorreo(Usemail.email, setIsModalOpen)

    }
  }

  const onInputChangeUsEmail = (e) => {
    setUsEmail({
      ...Usemail,
      [e.target.name]: e.target.value,
    });
  }

  const cerrarModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen &&
        <Modal isOpen={isModalOpen} onRequestClose={cerrarModal}
          className='text-white d-flex justify-content-center align-items-center p-5 p-sm-4 mt-5 border border-white'>

          <Form className='p-5 p-sm-4 bg-dark rounded' onSubmit={onSubmitUsEmail}>

            <h1>Olvidaste tu contraseña?</h1>

            <h4 className='text-muted'> escribe tu direcciond e correo , te enviaremos un email para poder restablecerla muchas gracias</h4>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control
                type="text"
                name="email"
                className="w-60"
                maxLength={30}
                value={Usemail.email}
                onChange={onInputChangeUsEmail}
              />
            </Form.Group>

            <div className='d-grid mx-auto'>

              <Button type="submit" variant="danger" className="rounded btn btn-danger m-2">
                Restablecer
              </Button>

              <Button type="submit" variant="warning" className="rounded btn btn-danger m-2" onClick={cerrarModal}>
                cancelar
              </Button>

            </div>
          </Form>
        </Modal>}
    </div>
  )
}


