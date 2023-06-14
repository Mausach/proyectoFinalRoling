import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import authApi from '../../api/authApi';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import emailjs from 'emailjs-com';


export const LoginScreen = () => {

  const [isModalOpen,setIsModalOpen]=useState(false);

  const [Usemail, setUsEmail] = useState({
    email:'',
  });

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


  const onInputChangeUsEmail=(e)=>{
    setUsEmail({
      ...Usemail,
      [e.target.name]:e.target.value,
    });
  }

  const onSubmitUsEmail=(e)=>{

    e.preventDefault();
  
    if(Usemail.email.trim()===""){
      setError(true);
      return setErrorMsg("debe ingresar su correo electronico");
      
    }
      setError(false);
      enviarCorreo(Usemail.email)

      
      
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
          message:'despues para probar iria el ipervinculo a la parte donde actualizo una passwword',//mensaje
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
      setError(true);
      setErrorMsg(error.response.data.msg);

      
    }

  }
  

    
	return (
		<div className="d-flex align-items-center justify-content-center customHeigth">
	 <Form className='p-5 p-sm-4 bg-dark rounded text-center' onSubmit={onSubmit}> 
   {error ? <p className='bg-danger w-100 text-center p-4 text-white fs-5'>{errorMsg}</p>:''}
			<h1 className='text-warning'>
      <i class="bi bi-person-circle"> </i>
      Login
      </h1>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='text-white'>
        <i class="bi bi-person-fill"> </i> 
          Correo Electronico</Form.Label>
        <Form.Control type="email" name='email' placeholder="Introduce el email" maxLength={30} value={user.email} onChange={onInputChange}/>
        
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='text-white'>
        <i class="bi bi-lock-fill"> </i>
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
             <i class="bi bi-google"> </i>
              Iniciá sesión con Google
           </h4>
          </Button> 
        </Link>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Link to={"https://es-la.facebook.com/r.php?locale=es_LA&display=page"}>
          <Button variant="danger"  className="mb-3">
            <h4>
              <i class="bi bi-facebook"> </i>
              Iniciá sesión con Facebook
            </h4>
          </Button>  
        </Link>
            
      </Form.Group>


      

      

      
    </Form>


    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
      className='text-white d-flex justify-content-center align-items-center p-5 p-sm-4 mt-5'>
				
				<Form className='p-5 p-sm-4 bg-dark rounded' onSubmit={onSubmitUsEmail}>
				{error ? <p className='bg-danger w-100 text-center p-4 text-white fs-5'>{errorMsg}</p>:''}
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
