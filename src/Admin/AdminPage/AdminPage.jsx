import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-modal';
import authApi from '../../api/authApi';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';






export const AdminPage = () => {
  const [isModalOpen,setIsModalOpen]=useState(false);

  const [isModalOpenUs,setIsModalOpenUs]=useState(false);

  const [isModalOpenEditar, setIsModalOpenEditar] = useState(false);

  //estado para guardar los productos traidos del backend
	const [cargarProductos, setCargarProductos] = useState([]);

	//estado para almacenar los datos del producto que quiero editar
	const [productoEditar, setProductoEditar] = useState({});

  //estado para guardar los usuarios traidos del backend
	const [cargarUsuarios, setCargarUsuarios] = useState([]);


	//estado para guardar los pedidos traidos del backend
	const [cargarPedidos, setCargarPedidos] = useState([]);

	//estado para opcion desplegada de la lista
	const [opcionSeleccionada, setOpcionSeleccionada] = useState('usuario');

	const [error,setError]=useState(false);
  	const [errorMsg,setErrorMsg]=useState('');

  

  const navigate = useNavigate();
  
  //estado para guardar los datos del producto desde la pagina de administracion
	const [formDate, setFormDate] = useState({
		name: '',
		precio: '',
    	detalle:'',
    	categoria:'',
		cantidad: '',
	});

	//estado para guardar los datos del Usuario desde la pagina de administracion
	const [formDateUs, setFormDateUs] = useState({
		name: '',
		email: '',
    	password:'',
    	
		
	});

	// onChange es leer los datos cuando vea cambios en el formulario
	const onChangeFormUs = (e) => {
		setFormDateUs({
			...formDateUs,
			[e.target.name]: e.target.value,
		});
	};

	
	const onChangeForm = (e) => {
		setFormDate({
			...formDate,
			[e.target.name]: e.target.value,
		});
	};

	//cuando el admin use el boton alta de Usuarios
	const onSubmitFormUs = (e) => {
		e.preventDefault();

		const { name, email, password, rol } = formDateUs;

		//validaciones
		if (
			name.length === 0 ||
			email.length === 0 ||
      		password.length === 0 ||
      		rol.length === 0 
		) {
			swal({
				title: "todos los campos son obligatorios",
				icon: "error",
			  });
			return console.log('todos los campos son obligatorios');
		}
		console.log(formDateUs);

		setError(false);
		AlertaGuardarUs(name, email, password, rol);

		setIsModalOpenUs(false);
	};

	//Alerta guardar usuario
	const AlertaGuardarUs = (name, email, password, rol,)=>{
		swal(
			{
			title: "¿Estas seguro de guardar al Usuario... ?",
			text: name+' - '+email+' - '+rol,
			icon: "warning",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
			if (willDelete) {
				guardarUsuarioDB(name, email, password, rol);
			  swal("El usuario se creo correctamente", {
				
				icon: "success",
			  });
			} else {
			  swal("Solicitud cancelada");
			}
		  });
	
	}

	 //guardar Usuario en DB
	 const guardarUsuarioDB = async (name, email, password, rol) => {
		try {
			const resp = await authApi.post('/auth/new', {
				name,
				email,
        		password,
    			rol,
			});

			console.log(resp);
		} catch (error) {
			console.log(error.response.data.msg);
      		setError(true);
      		setErrorMsg(error.response.data.msg);
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
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
		}
		console.log(formDate);

		setError(false);
		AlertaGuardarProducto(name, precio, url_img, detalle, categoria, cantidad);

		setIsModalOpen(false);
	};

	//Alerta guardar producto
	const AlertaGuardarProducto = (name, precio, url_img, detalle, categoria, cantidad)=>{
		swal(
			{
			title: "¿Estas seguro de cargar el siguiente producto... ?",
			text: name+' -  $'+precio+' - '+categoria+' - '+cantidad,
			icon: "warning",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
			if (willDelete) {
				guardarProductoDB(name, precio, url_img, detalle, categoria, cantidad);
			  swal("El menu se guardo correctamente", {
				
				icon: "success",
			  });
			} else {
			  swal("Solicitud cancelada");
			}
		  });
	
	}

  //guardar Producto en DB
	const guardarProductoDB = async (name, precio, url_img, detalle, categoria, cantidad) => {
		try {
			const resp = await authApi.post('/admin/new', {
				name,
				precio,
        		url_img,
    			detalle,
        		categoria,
				cantidad,
			});

			console.log(resp);
		} catch (error) {
			console.log(error.response.data.msg);
      		setError(true);
      		setErrorMsg(error.response.data.msg);
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};


	

  //////////////////////////////////////////////////////

	//cargarUsuarios desde DB
	const cargarUser = async () => {
		try {
			const resp = await authApi.get('/admin/usuarios');

			setCargarUsuarios(resp.data.usuarios);
		} catch (error) {
			console.log(error.response.data.msg);
      		setError(true);
      		setErrorMsg(error.response.data.msg);
			console.log(error);
		}
	};

	//cargarProductos desde DB
	const cargarProductosDB = async () => {
		try {
			const resp = await authApi.get('/admin/productos');

			setCargarProductos(resp.data.productos);
		} catch (error) {
			console.log(error.response.data.msg);
      		setError(true);
      		setErrorMsg(error.response.data.msg);
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};

	//carga de pedidos desde DB
	const cargadePedidos = async () => {
		try {
			const resp = await authApi.get('/admin/pedidos');

			setCargarPedidos(resp.data.pedidos);
		} catch (error) {
			console.log(error.response.data.msg);
      		setError(true);
      		setErrorMsg(error.response.data.msg);
			
		}
	};

  //////////////////////////////////////////////////////

  //metodo para inhabilitar usuario (recordatorio falta controlar que el usuario este activo)


  //on change para leer los datos del edit
	const onChangeFormEditar = (e) => {
		setProductoEditar({
			...productoEditar,
			[e.target.name]: e.target.value,
		});
	};

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
		}

		setIsModalOpenEditar(false);

		setError(false);
		AlertaEditar(_id, name, estado, precio, url_img, detalle, categoria, cantidad);
	};

	//Alerta Editar
	const AlertaEditar = (_id, name, estado, precio, url_img, detalle, categoria, cantidad)=>{
		swal(
			{
			title: "¿Estas seguro de guardar los cambios?",
			text: '-',
			icon: "warning",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
			if (willDelete) {
				editarProductoDB(_id, name, estado, precio, url_img, detalle, categoria, cantidad);
			  swal("Se guardaron los cambios correctamente", {
				
				icon: "success",
			  });
			} else {
			  swal("Solicitud cancelada");
			}
		  });
	
	}
  
  //metodo de modificar menu (falta hacer el backend de esto)
  const editarProductoDB = async (_id, name, estado, precio, url_img, detalle, categoria, cantidad) => {
	try {
		const resp = await authApi.put('/admin/edit', {
			_id,
			name,
			estado,
			precio,
        	url_img,
    		detalle,
        	categoria,
			cantidad,
		});

		console.log(resp);
	} catch (error) {
			console.log(error.response.data.msg);
      		setError(true);
      		setErrorMsg(error.response.data.msg);
	}
};

const editarProductoClick = (producto) => {
	setProductoEditar(producto);
	setIsModalOpenEditar(true);
};

//Alerta Eliminar
const AlertaEliminar = (_id,name)=>{
	swal(
		{
		title: "¿Estas seguro de Eliminar este menu?",
		text: name,
		icon: "warning",
		buttons: true,
		dangerMode: true,
	  })
	  .then((willDelete) => {
		if (willDelete) {
			eliminarProductoClick(_id);
		  swal("El menu se ah eliminado", {
			
			icon: "success",
		  });
		} else {
		  swal("Solicitud cancelada");
		}
	  });
	
}


  //metodo de eliminar menu (falta hacer el back de esto)
  const eliminarProductoClick = async (id) => {
	try {
		const resp = await authApi.delete(`/admin/eliminar/${id}`);
		console.log(resp);
	} catch (error) {
			console.log(error.response.data.msg);
      		setError(true);
      		setErrorMsg(error.response.data.msg);
		if (error.response.status === 401) {
			localStorage.removeItem('token');
			navigate('/login');
		}
	}
};

//Alerta Inhabilitar
const AlertaInhabilitar = (_id,name,email)=>{
	swal(
		{
		title: "¿Estas seguro de inhabilitar a este usuario?",
		text: name+'  -  '+email,
		icon: "warning",
		buttons: true,
		dangerMode: true,
	  })
	  .then((willDelete) => {
		if (willDelete) {
			deshabilitarUsuarioClick(_id);
		  swal("El usuario elegido fue inhabilitado", {
			
			icon: "success",
		  });
		} else {
		  swal("Solicitud cancelada");
		}
	  });
}

//metodo para dehabilitar a un usuario
const deshabilitarUsuarioClick = async (_id) => {

	try {
		const resp = await authApi.put('/admin/Deshabilitar',{
			_id,
		});
		console.log(resp);
	} catch (error) {
		console.log(error.response.data.msg);
		setError(true);
		setErrorMsg(error.response.data.msg);
		if (error.response.status === 401) {
			localStorage.removeItem('token');
			navigate('/login');
		}
	}
	
	
};

//Alerta Realizar
const AlertaRealizar = (_id,usuario,menu)=>{
	swal(
		{
		title: "¿Estas seguro de completar el pedido de... ?",
		text: usuario+'  -  '+menu,
		icon: "warning",
		buttons: true,
		dangerMode: true,
	  })
	  .then((willDelete) => {
		if (willDelete) {
			confirmarPedidoClick(_id);
		  swal("El pedido se ah completado", {
			
			icon: "success",
		  });
		} else {
		  swal("Solicitud cancelada");
		}
	  });

}


  //metodo de cambiar el pedido a realizado
const confirmarPedidoClick  = async (_id) => {


	try {
		const resp = await authApi.put('/admin/confirmar',{
			_id,
		});
		console.log(resp);
	} catch (error) {
		console.log(error.response.data.msg);
		setError(true);
		setErrorMsg(error.response.data.msg);
		if (error.response.status === 401) {
			localStorage.removeItem('token');
			navigate('/login');
		}
	}
	
};

const handleSelectChange = (e) => {
    setOpcionSeleccionada(e.target.value);
  };

  

const CargarTabla=()=>{
	if(opcionSeleccionada==="usuario"){
		return(
			<div>
				<Table striped bordered hover variant="dark" className="p-3 m-2 align-items-center justify-content-center table table-responsive ">
      
      <thead>
		<tr>
		<th colSpan={6}>
		<h3 className='text-center text-warning'>Usuarios</h3>
		</th>
		</tr>
        <tr>
          <th>#ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Estado</th>
		  <th>Rol</th>
		  <th>Inactivar</th>
        </tr>
      </thead>
     
	  {cargarUsuarios.map((usuario) => {
					return (
						<tbody key={usuario._id}>
							<tr>
								<td>{usuario._id}</td>
								<td>{usuario.name}</td>
								<td>{usuario.email}</td>
								<td>{usuario.estado}</td>
								<td>{usuario.rol}</td>
								<td>
									<button className='btn btn-outline-danger '
									onClick={() => AlertaInhabilitar(usuario._id, usuario.name,usuario.email)}>
										<strong className='font-weight-bold'>
											<h3>
												{/*Inhabilitar*/}
											<i className='bi bi-person-fill-slash'> </i>
											</h3>
										
										</strong>
										
										
									</button>
								</td>
							</tr>
						</tbody>
					);
				})}
    </Table>


	<div className="d-flex justify-content-end me-5">
				<button
					className="rounded p-2 btn btn-danger m-2"
					onClick={() => setIsModalOpenUs(true)}
				>
					<h4>
					<i className='bi bi-person-fill-add'> </i>Alta de Usuario
					</h4>
					
					
				</button>
			</div>

			{/* Modal para agregar Usuarios */}

      <Modal isOpen={isModalOpenUs} onRequestClose={() => setIsModalOpenUs(false)}
      className='text-white d-flex justify-content-center align-items-center p-5 p-sm-4 mt-5'>
				
				<Form className='p-5 p-sm-4 bg-dark rounded' onSubmit={onSubmitFormUs}>
				{error ? <p className='bg-danger w-100 text-center p-4 text-white fs-5'>{errorMsg}</p>:''}
        			<h2>Alta del Usuario</h2>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							type="text"
							name="name"
							placeholder="Nombre"
							className="w-60" 
              				maxLength={30}
              				onChange={onChangeFormUs}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Correo Electronico</Form.Label>
						<Form.Control
							type="text"
							name="email"
							className="w-60"
             				 maxLength={30}
							 onChange={onChangeFormUs}
							
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Contraseña</Form.Label>
						<Form.Control
							type="password"
							name="password"
							className="w-60"
							onChange={onChangeFormUs}

						/>
					</Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Rol :</Form.Label>
						<select name="rol" onChange={onChangeFormUs} className='rounded mt-3 ms-3'>
							<option value="usuario">Usuario</option>
                        	<option value="admin">Administrador</option>
						</select>
				
					</Form.Group>

					<div className='d-grid mx-auto'>

					<Button type="submit" variant="danger" className="rounded btn btn-danger m-2 ">
						<h5>
						<i className='bi bi-person-fill-add'> </i> 
						Guardar Usuario
						</h5>
						</Button>

					</div>
					
					
				</Form>
			</Modal>
			</div>
		);
		

	}else if(opcionSeleccionada=="menus"){
		return(
			<div>
				<Table striped bordered hover variant="dark" className="text-white justify-content-center align-items-center p-5 p-sm-4">
      
      <thead>

	  <tr>
		<th colSpan={9}>
		<h3 className='text-center text-warning'>Productos</h3>
		</th>
		</tr>

        <tr>
		  <th>Imagen</th>		
          <th>Nombre</th>
          <th>estado</th>
		  <th>precio</th>
          <th>detalle</th>
		  <th>categoria</th>
		  <th>cantidad</th>
		  <th>Editar</th>
		  <th>Eliminar</th>
        </tr>
      </thead>
      
	  {cargarProductos.map((producto) => {
					return (
						<tbody key={producto._id}>
							<tr>
								<td>
								
								<img src={producto.url_img} alt={producto.categoria} width="75"></img>
								</td>
								<td>{producto.name}</td>
								<td>{producto.estado}</td>
								<td>{'$'+producto.precio}</td>
								<td>{producto.detalle}</td>
								<td>{producto.categoria}</td>
								<td>{producto.cantidad}</td>
								<td>
									<button className='btn btn-outline-warning' 
									onClick={() => editarProductoClick(producto)}> 
									<strong className='font-weight-bold'>
										<h3>
											{/*Editar*/}
										<i className='bi bi-pencil-square'></i>
										</h3>
									</strong>
										
									</button>
								</td>
								<td>
									<button className='btn btn-outline-danger '
									onClick={() => AlertaEliminar(producto._id,producto.name)}>
										<strong className='font-weight-bold'>
											<h3>
												{/*Eliminar*/}
											<i className='bi bi-trash3-fill'></i>
											</h3>
										</strong>
										
									</button>
								</td>
							</tr>
						</tbody>
					);
				}) }
    </Table>


	<div className="d-flex justify-content-end me-5">
				<button
					className="rounded p-2 btn btn-danger m-2"
					onClick={() => setIsModalOpen(true)}
				>
					<h4><i class="bi bi-plus-circle-fill"> </i>
						 Alta de Menu</h4>
					
				</button>
			</div>

			{/* Modal para agregar producto */}

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
      className='text-white d-flex justify-content-center align-items-center p-5 p-sm-4 mt-5'>
				
				<Form className='p-5 p-sm-4 bg-dark rounded' onSubmit={onSubmitFormProd}>
				{error ? <p className='bg-danger w-100 text-center p-4 text-white fs-5'>{errorMsg}</p>:''}
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
              maxLength={10}
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

					<Button type="submit" variant="danger"className="d-flex rounded btn btn-danger m-2">
					<h5>
						<i className='bi bi-plus-circle-fill'> </i> 
						Crgar Producto
						</h5>
						</Button>

					</div>
					
					
				</Form>
			</Modal>


			{/* Modal de Editar */}
	<Modal	isOpen={isModalOpenEditar}
				onRequestClose={() => setIsModalOpenEditar(false)}
				className='text-white d-flex justify-content-center align-items-center p-5 p-sm-4 mt-5'>

				<h2>Editar producto</h2>
				<Form className='p-5 p-sm-4 bg-dark rounded' onSubmit={onSubmitFormEditar}>
				{error ? <p className='bg-danger w-100 text-center p-4 text-white fs-5'>{errorMsg}</p>:''}
        			<h2>Editar producto</h2>
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
			  onChange={onChangeFormEditar}
							
						></textarea>
					</Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>categoria</Form.Label>
						<Form.Control
							type="text"
							name="categoria"
							className="w-60"
              maxLength={10}
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
					<Button type="submit" variant="danger" className="rounded btn btn-danger ms-3">
						<h5>
						<i className='bi bi-pencil-square'> </i>
						Guardar cambios
						</h5> 
						</Button>
					</div>
					
					
				</Form>
			</Modal>
			</div>
		);
		
		

	}else if(opcionSeleccionada=="pedidos"){
		return(
			<div>
				<Table striped bordered hover variant="dark" className="p-3 align-items-center justify-content-center">
      
      <thead>

	  <tr>
		<th colSpan={6}>
		<h3 className='text-center text-warning'>Pedidos</h3>
		</th>
		</tr>

        <tr>
          <th>#ID</th>
          <th>Usuario</th>
          <th>Fecha</th>
		  <th>Menu</th>
          <th>Estado</th>
		  <th>Realizar</th>
		  
		  
        </tr>
      </thead>
     
	  {cargarPedidos.map((pedidos) => { //cambiar esto para que traiga pedidos
					return (
						<tbody key={pedidos._id}>
							<tr>
								<td>{pedidos._id}</td>
								<td>{pedidos.usuario}</td>
								<td>{pedidos.fecha}</td>
								<td>{pedidos.menu}</td>
								<td>{pedidos.estado}</td>
								<td>
									<button className='btn btn-outline-success '
									onClick={() => AlertaRealizar(pedidos._id,pedidos.usuario,pedidos.menu)}>
										<strong className='font-weight-bold'>
											<h3>
												{/*Realizar*/}
											<i className='bi bi-cart-check-fill'></i>
											</h3>
										</strong>
									</button>
								</td>
							</tr>
						</tbody>
					);
				})}
    </Table>


	


			</div>
		);
		
		
	}
	

}


  





   //useEfect sirve de esta manera para que las tablas se carguen a penas entren al screen de admin
  //si en corchete ponemos otra funcion ejemplo la de agregar hacemos que el cargar se ejecute cuando termine de agregar el usuario oproducto
  	useEffect(() => {
	cargarUser();
	cargarProductosDB();
	cargadePedidos();
	}, []);


  
  return (
    <div>
		<h1 className="text-center p-3 text-white">Admin Page</h1>

<div>
      
	  <div  className=' d-flex justify-content-end me-5'>
	  <h1 className='text-warning'>Selección de tabla</h1>
	 	 <select value={opcionSeleccionada} onChange={handleSelectChange}
	 		className='bg-warning rounded p-2 m-2'>
       		<option value="usuario">Tabla usuarios</option>
        	<option value="menus">Tabla de menus</option>
        	<option value="pedidos">Tabla de pedidos</option>
     	 </select>

	  </div>
      

      {CargarTabla()}
    </div>
      
    

    </div>

  )
}
