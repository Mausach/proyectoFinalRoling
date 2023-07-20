import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-modal';
import swal from 'sweetalert';
import { AlertaEditar } from '../helpers/EditarProducto';

export const ModalEditarProducto = ({ isModalOpenEditar, setIsModalOpenEditar, productoEditar, setProductoEditar }) => {

  //funcion para cuando se ejecuta el submit del editar
  const onSubmitFormEditar = (e) => {
    e.preventDefault();
    const { _id, name, estado, precio, url_img, detalle, categoria, cantidad } = productoEditar;

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
      setIsModalOpenEditar(false);
      AlertaEditar(_id, name, estado, precio, url_img, detalle, categoria, cantidad);
    }
  };

  //on change para leer los datos del edit
  const onChangeFormEditar = (e) => {
    setProductoEditar({
      ...productoEditar,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* Modal de Editar */}
      <Modal isOpen={isModalOpenEditar}
        onRequestClose={() => setIsModalOpenEditar(false) }
        className='text-white d-flex justify-content-center align-items-center mt-2 border'
        >

        <Form className='p-4 p-sm-4 bg-dark rounded border border-white' onSubmit={onSubmitFormEditar}>
          
          <h2 className='text-white'>
          <i className='bi bi-pencil-square'> </i>
            Editar producto</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Nombre de este menu"
              className="w-60"
              maxLength={30}
              value={productoEditar.name}
              onChange={onChangeFormEditar}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Estado :</Form.Label>
            <select name="estado" onChange={onChangeFormEditar} className=' rounded mt-3 ms-3' value={productoEditar.estado}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              className="w-60"
              max="99999"
              min="1400"
              value={productoEditar.precio}
              onChange={onChangeFormEditar}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="text"
              name="url_img"
              className="w-60"
              value={productoEditar.url_img}
              onChange={onChangeFormEditar}
            />
          </Form.Group>

          <Form.Group className="mb-3 d-flex flex-column" controlId="formBasicEmail">
            <Form.Label>detalle</Form.Label>
            <textarea
              type="text"
              name="detalle"
              className="w-60"
              maxLength={80}
              value={productoEditar.detalle}
              onChange={onChangeFormEditar}>
            </textarea>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>categoria</Form.Label>
            <Form.Control
              type="text"
              name="categoria"
              className="w-60"
              maxLength={15}
              value={productoEditar.categoria}
              onChange={onChangeFormEditar}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>cantidad</Form.Label>
            <Form.Control
              type="number"
              name="cantidad"
              className="w-60"
              maxLength={6}
              value={productoEditar.cantidad}
              onChange={onChangeFormEditar}
            />
          </Form.Group>

          <div className='d-grid mx-auto'>
            <Button type="submit" variant="danger" className="rounded btn btn-danger">
              <h6>
                <i className='bi bi-save'> </i>
                Guardar cambios
              </h6>
            </Button>
          </div>

        </Form>
      </Modal>

    </div>
  )
}
