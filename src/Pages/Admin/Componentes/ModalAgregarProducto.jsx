import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-modal';
import swal from 'sweetalert';
import { AlertaGuardarProducto } from '../helpers/GuardarProducto';

export const ModalAgregarProducto = ({ isModalOpen, setIsModalOpen, navigate }) => {

  //estado para guardar los datos del producto desde la pagina de administracion
  const [formDate, setFormDate] = useState({
    name: '',
    precio: '',
    detalle: '',
    categoria: '',
    cantidad: '',
  });

  //onchange para capturar del modal
  const onChangeForm = (e) => {
    setFormDate({
      ...formDate,
      [e.target.name]: e.target.value,
    });
  };

  //cuando el admin use el boton alta de productos
  const onSubmitFormProd = (e) => {
    e.preventDefault();

    const { name, precio, url_img, detalle, categoria, cantidad } = formDate;

    //validaciones
    if (
      name.length === 0 ||
      precio.length === 0 ||
      detalle.length === 0 ||
      categoria.length === 0 ||
      cantidad.length === 0
    ) {
      swal({
        title: "faltan datos necesarios",
        icon: "error",
      });
      return console.log('todos los campos son obligatorios');
    } else {
      console.log(formDate);
      AlertaGuardarProducto(name, precio, url_img, detalle, categoria, cantidad, navigate);
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      {/* Modal para agregar producto */}

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
        className='text-white d-flex justify-content-center align-items-center p-5 p-sm-4 mt-5'>

        <Form className='p-5 p-sm-4 bg-dark rounded border border-white' onSubmit={onSubmitFormProd}>

          <h2>Agregar producto</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Nombre de este menu"
              className="w-60"
              maxLength={30}
              onChange={onChangeForm}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              className="w-60"
              max="99999"
              min="1400"
              onChange={onChangeForm}

            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="text"
              name="url_img"
              className="w-60"
              onChange={onChangeForm}

            />
          </Form.Group>
          <Form.Group className="mb-3 d-flex flex-column" controlId="formBasicEmail">
            <Form.Label>detalle</Form.Label>
            <textarea
              type="text"
              name="detalle"
              className="w-60"
              maxLength={80}
              onChange={onChangeForm}

            ></textarea>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>categoria</Form.Label>
            <Form.Control
              type="text"
              name="categoria"
              className="w-60"
              maxLength={15}
              onChange={onChangeForm}

            />

          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>cantidad</Form.Label>
            <Form.Control
              type="number"
              name="cantidad"
              className="w-60"
              maxLength={6}
              onChange={onChangeForm}

            />
          </Form.Group>

          <div className='d-grid mx-auto'>

            <Button type="submit" variant="danger" className="d-flex rounded btn btn-danger m-2">
              <h5>
                <i className='bi bi-plus-circle-fill'> </i>
                Crgar Producto
              </h5>
            </Button>

          </div>

        </Form>
      </Modal>

    </div>
  )
}
