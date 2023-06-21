import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import authApi from '../../api/authApi';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';

import Modal from 'react-modal';
import emailjs from 'emailjs-com';
import { Spinner } from 'react-bootstrap';


export const LoginScreen = () => {

  //para animaciion de carga al principio de cada screen
  const [loading,setLoading]=useState(true);
  setTimeout(()=>{
      setLoading(false);
  },2000);
//fin de animacion cargando


  const [isModalOpen,setIsModalOpen]=useState(false);

  const [Usemail, setUsEmail] = useState({
    email:'',
  });

  const [user,setUser]=useState({
    email: "",
    password:"",
  });

  

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
      swal("ERROR", "todos los campos son obligatorios" , "error");
      }else{
        starLogin(user.email,user.password);
      }
      
      
      
    }

  const starLogin=async (email,password)=>{
    try {
      const resp=await authApi.post('/auth/login',{
        email,
        password,
      });
    
      if( resp.data.rol === 'usuario'){
        navigate('/home',{ state: resp.data.email });
      }else{
        navigate("/admin",{ state: resp.data.name });
      }
      

    } catch (error) {
      
      swal("ERROR" ,error.response.data.msg, "error");
    }
  }


  const onInputChangeUsEmail=(e)=>{
    setUsEmail({
      ...Usemail,
      [e.target.name]:e.target.value,
    });
  }

  const onSubmitUsEmail=(e)=>{

    e.preventDefault();
  
    if(Usemail.email.trim()===""){

      swal("ERROR" ,"Debe ingresar su correo electronico", "error");
      
    }else{
      enviarCorreo(Usemail.email)
    }
      
    }


  function abrirModal() {
   setIsModalOpen(true);
  }


  const enviarCorreo = async (email) => {

    try {

      const resp=await authApi.post('/auth/validar_email',{
        email,
      });
    
      if( resp.data.ok === true){
  
        const dest=resp.data.email
        const serv_id=resp.data.server_id
        const temp_id=resp.data.template_id
        const public_k=resp.data.public_key
  
        let templateParams = {
          from_name: 'EL Buen Comer devs',//mensaje de
          user_name: dest,//para el destinatario
          destinatario:dest,//email del destinatario
          message:'Si decea restablecer su contraseña por favor...',//mensaje
          
      };
       
      emailjs.send(serv_id, temp_id, templateParams, public_k)
          .then(function(response) {
             console.log('el email fue enviado!', response.status, response.text);
             swal("Email enviado a...", dest+" ingresa a tu correo electronico y sigue las intrucciones para restablecer tu contraseña", "success");
             //aqui va una alerta diciendo que todo salio bien yq ue revice su correo electronico
          }, function(error) {
             console.log('ocurrio un error al enviar el email...', error);
             swal("ocurrio un error al enviar el email...'", "error");
             //aqui va alerta de error
          });
  
          setIsModalOpen(false);    
      
    }
      
    } catch (error) {
      console.log(error.response.data.msg)
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
		<div className="d-flex align-items-center justify-content-center customHeigth">
	 <Form className='p-5 p-sm-4 bg-dark rounded text-center border border-white' onSubmit={onSubmit}> 
   
			<h1 className='text-warning'>
      <i className="bi bi-person-circle"> </i>
      Login
      </h1>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='text-white'>
        <i className="bi bi-person-fill"> </i> 
          Correo Electronico</Form.Label>
        <Form.Control type="email" name='email' placeholder="Introduce el email" maxLength={30} value={user.email} onChange={onInputChange}/>
        
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
          <Button variant="danger"  className="mb-3">
           <h4>
             <i className="bi bi-google"> </i>
              Iniciá sesión con Google
           </h4>
          </Button> 
        </Link>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Link to={"https://es-la.facebook.com/r.php?locale=es_LA&display=page"}>
          <Button variant="danger"  className="mb-3">
            <h4>
              <i className="bi bi-facebook"> </i>
              Iniciá sesión con Facebook
            </h4>
          </Button>  
        </Link>
            
      </Form.Group>
    </Form>


    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
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

            <Button type="submit" variant="warning" className="rounded btn btn-danger m-2" onClick={() => setIsModalOpen(false)}>
						cancelar
						</Button>

					</div>
				</Form>
			</Modal>
		</div>
	);
}
}
