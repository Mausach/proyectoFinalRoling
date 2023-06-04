import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import authApi from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

export const LoginScreen = () => {

  const [user,setUser]=useState({
    email: "",
    password:"",
  });

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
  
    if( 
    user.email.trim()==="" ||  
    user.password.trim()===""){
      setError(true);
      return setErrorMsg("todos los campos son obligatorios");
      
    }
      setError(false);
      starLogin(user.email,user.password);
      
    }

  const starLogin=async (email,password)=>{
    try {
      const resp=await authApi.post('/auth/login',{
        email,
        password,
      });
    
      if( resp.data.rol === 'usuario'){
        navigate("/home");
      }else{
        navigate("/admin");
      }
      

    } catch (error) {
      console.log(error.response.data.msg);
      setError(true);
      setErrorMsg(error.response.data.msg);
    }

  }
    
	return (
		<div className="d-flex align-items-center justify-content-center customHeigth">
	 <Form className='p-5 p-sm-4 bg-dark' onSubmit={onSubmit}> 
   {error ? <p className='bg-danger w-100 text-center p-4 text-white fs-5'>{errorMsg}</p>:''}
			<h2 className='text-white'>Login</h2>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='text-white'>Correo Electronico</Form.Label>
        <Form.Control type="email" name='email' placeholder="Introduce el email" maxLength={30} value={user.email} onChange={onInputChange}/>
        
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='text-white'>Contraseña</Form.Label>
        <Form.Control type="password" name='password' placeholder="Introduce la contraseña" minLength={5} maxLength={20} value={user.password} onChange={onInputChange} />
      </Form.Group>
      
      <Button variant="danger" type="submit">
        Login
      </Button>

    </Form>
		</div>
	);
}
