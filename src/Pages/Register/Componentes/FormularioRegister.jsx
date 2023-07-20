import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { starRegister } from '../helpers/StarRegister';

export const FormularioRegister = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmarContraseña: "",
    })

    const navigate = useNavigate();

    const onInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (user.name.trim() === "" ||
            user.email.trim() === "" ||
            user.password.trim() === "" ||
            user.confirmarContraseña.trim() === "") {
            swal("ERROR", "todos los campos son obligatorios", "error");
        } else if (user.password != user.confirmarContraseña) {
            swal("ERROR", "la contraseñas no son iguales", "error");
        } else {
            starRegister(user.name, user.email, user.password, navigate);
        }
    }

    return (
        <div>
            <Form className='p-5 p-sm-4 bg-dark rounded text-center border border-white m-3' onSubmit={onSubmit}>

                <h1 className='text-warning'>
                    <i className="bi bi-person-lines-fill"> </i>
                    CREAR CUENTA
                </h1>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='text-white' >
                        <i className="bi bi-person-vcard"> </i>
                        Nombre Completo</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Introduce el nombre completo" maxLength={25} value={user.nombre} onChange={onInputChange} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='text-white'>
                        <i className="bi bi-person-fill"> </i>
                        Correo Electronico</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Introduce el correo electronico" maxLength={30} value={user.email} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='text-white'>
                        <i className="bi bi-lock-fill"> </i>
                        Contraseña</Form.Label>
                    <Form.Control type="password" name='password' placeholder="introduce contraseña" minLength={5} maxLength={20} value={user.password} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='text-white'>
                        <i className="bi bi-lock-fill"> </i>
                        Confirmar Contraseña</Form.Label>
                    <Form.Control type="password" name='confirmarContraseña' placeholder="Repita la contraseña" maxLength={20} value={user.confirmarContraseña} onChange={onInputChange} />
                </Form.Group>

                <Button variant="danger" type="submit" >
                    Registrarse
                </Button>

            </Form>
        </div>
    )
}
