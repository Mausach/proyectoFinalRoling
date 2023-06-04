import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import authApi from '../../api/authApi';
import { useNavigate } from 'react-router-dom';



export const RegisterScreen = () => {
  
  const [user,setUser]=useState({
    name:"",
    email: "",
    password:"",
    confirmarContraseña:"",
  })
  const [error,setError]=useState(false);
  const [errorMsg,setErrorMsg]=useState('');
  const navigate=useNavigate();


  const onInputChange=(e)=>{
    setUser({
      ...user,
      [e.target.name]:e.target.value,
    });
  }

  const onSubmit=(e)=>{

  e.preventDefault();

  if(user.name.trim()==="" || 
  user.email.trim()==="" || 
  user.password.trim()==="" || 
  user.confirmarContraseña.trim()=== ""){
    setError(true);
    return setErrorMsg("todos los campos son obligatorios");
    
  }else if(user.password != user.confirmarContraseña){
    setError(true);
    return setErrorMsg("las contraseñas deben ser iguales");
  }
    setError(false);
    starRegister(user.name,user.email,user.password);
  }

  const starRegister=async (name,email,password)=>{
    try {
      const resp=await authApi.post('/auth/new',{
        name,
        email,
        password,
      });
      
      //metodo para asignar al home o al admin

      

      navigate("/home");
      //navigate("/admin");

    } catch (error) {
      console.log(error.response.data.msg);
      setError(true);
      setErrorMsg(error.response.data.msg);
    }

  }
  
  return (
    <div className="d-flex justify-content-center align-items-center customHeigth">
	 <Form className='p-5 p-sm-4 bg-dark' onSubmit={onSubmit}> 
   {error ? <p className='bg-danger w-100 text-center p-4 text-white fs-5'>{errorMsg}</p>:''}
			<h2 className='text-white'>Register</h2>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='text-white' >Nombre Completo</Form.Label>
        <Form.Control type="text" name='name' placeholder="Introduce el nombre completo" maxLength={25} value={user.nombre} onChange={onInputChange} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='text-white'>Correo Electronico</Form.Label>
        <Form.Control type="email" name='email' placeholder="Introduce el correo electronico" maxLength={30} value={user.email} onChange={onInputChange}/>        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='text-white'>Contraseña</Form.Label>
        <Form.Control type="password" name='password' placeholder="introduce contraseña" minLength={5} maxLength={20} value={user.password} onChange={onInputChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='text-white'>Confirmar Contraseña</Form.Label>
        <Form.Control type="password" name='confirmarContraseña' placeholder="Repita la contraseña" maxLength={20} value={user.confirmarContraseña} onChange={onInputChange}/>
      </Form.Group>

      
      <Button variant="danger" type="submit" >
        registrarse
      </Button>

    </Form>
		</div>
  )
}
