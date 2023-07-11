import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { starLogin } from '../helpers/StarLogin';
import swal from 'sweetalert';
import { ModalLogin } from './ModalLogin';


export const FromularioLogin = () => {

    //para el estado del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    //state para usuario e email del usuario
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    //captura lo el formulario y verifica los campos lanzando una alerta con swal
    const onSubmit = (e) => {
        e.preventDefault();
        if (
            user.email.trim() === "" ||
            user.password.trim() === "") {
            swal("ERROR", "todos los campos son obligatorios", "error");
        } else {
            starLogin(user.email, user.password, navigate);//llama al metodo starLogin del helper 
        }
    }

    //controla los cambios que se hagan en los campos del formulario
    const onInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    //para abrir el modal desde la etiqueta a
    const abrirModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);

    }

    return (
        <div>
            <Form className='p-5 p-sm-4 bg-dark rounded text-center border border-white' onSubmit={onSubmit}>

                <h1 className='text-warning'>
                    <i className="bi bi-person-circle"> </i>
                    Login
                </h1>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='text-white'>
                        <i className="bi bi-person-fill"> </i>
                        Correo Electronico</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Introduce el email" maxLength={30} value={user.email} onChange={onInputChange} />

                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='text-white'>
                        <i className="bi bi-lock-fill"> </i>
                        Contraseña</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Introduce la contraseña" minLength={5} maxLength={20} value={user.password} onChange={onInputChange} />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='text-white'>
                        <h5>
                            <a href="#" onClick={abrirModal}>¿Olvidaste tu contraseña?</a>
                        </h5>

                    </Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Button variant="danger" type="submit" className="mb-3">
                        <h5>
                            Login
                        </h5>
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Link to={"https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Fmyaccount.google.com%3Futm_source%3Daccount-marketing-page%26utm_medium%3Dcreate-account-button&dsh=S1174787129%3A1658336401889979&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp"}>
                        <Button variant="danger" className="mb-3">
                            <h4>
                                <i className="bi bi-google"> </i>
                                Iniciá sesión con Google
                            </h4>
                        </Button>
                    </Link>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Link to={"https://es-la.facebook.com/r.php?locale=es_LA&display=page"}>
                        <Button variant="danger" className="mb-3">
                            <h4>
                                <i className="bi bi-facebook"> </i>
                                Iniciá sesión con Facebook
                            </h4>
                        </Button>
                    </Link>

                </Form.Group>
            </Form>

            <ModalLogin isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    )
}
