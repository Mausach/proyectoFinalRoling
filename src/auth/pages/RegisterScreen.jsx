import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import authApi from '../../api/authApi';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';



export const RegisterScreen = () => {

  //para animaciion de carga al principio de cada screen
  const [loading,setLoading]=useState(true);
  setTimeout(()=>{
      setLoading(false);
  },2000);
//fin de animacion cargando

  
  const [user,setUser]=useState({
    name:"",
    email: "",
    password:"",
    confirmarContraseña:"",
  })
  
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
    swal("ERROR", "todos los campos son obligatorios" , "error");
  }else if(user.password != user.confirmarContraseña){
    swal("ERROR", "la contraseñas no son iguales" , "error");
  }else{
    starRegister(user.name,user.email,user.password);
  }
    
  }

  const starRegister=async (name,email,password)=>{
    try {
      const resp=await authApi.post('/auth/new',{
        name,
        email,
        password,
      });
      
      navigate("/home");

    } catch (error) {
      console.log(error.response.data.msg);
      swal("ERROR" ,error.response.data.msg, "error");
    }

  }

  //condicional para la animacion de cargando
  if(loading){
    return(
        <div className="d-flex align-items-center justify-content-center customHeigth">
            <Spinner animation="border" role="status" variant="light"/>
            <span className="visually-hidden">Loading...</span>
        </div>
    )

  }else{
  
  return (
    <div className="d-flex justify-content-center align-items-center customHeigth">
	 <Form className='p-5 p-sm-4 bg-dark rounded text-center border border-white' onSubmit={onSubmit}> 
   
			<h1 className='text-warning'>
      <i className="bi bi-person-lines-fill"> </i>
        Registrarse
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
        <Form.Control type="email" name='email' placeholder="Introduce el correo electronico" maxLength={30} value={user.email} onChange={onInputChange}/>        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='text-white'>
        <i className="bi bi-lock-fill"> </i>
          Contraseña</Form.Label>
        <Form.Control type="password" name='password' placeholder="introduce contraseña" minLength={5} maxLength={20} value={user.password} onChange={onInputChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='text-white'>
        <i className="bi bi-lock-fill"> </i>
          Confirmar Contraseña</Form.Label>
        <Form.Control type="password" name='confirmarContraseña' placeholder="Repita la contraseña" maxLength={20} value={user.confirmarContraseña} onChange={onInputChange}/>
      </Form.Group>

      
      <Button variant="danger" type="submit" >
        registrarse
      </Button>

    </Form>
		</div>
  )
}
}