import React, { useEffect, useState } from 'react'
import authApi from '../../api/authApi';
import swal from 'sweetalert';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-modal';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { initMercadoPago } from '@mercadopago/sdk-react'
initMercadoPago('TEST-2ef3578e-6104-4276-92c1-57991e97d641');


export const TiendaScreen = () => {

    const location = useLocation();
    const emailUs = 'alguien@gmail'//location.state;//recibe el email del loguin

    const [isModalOpen,setIsModalOpen]=useState(false);
    //para animaciion de carga al principio de cada screen
const [loading,setLoading]=useState(true);

//estado para guardar los productos traidos del backend
const [cargarProductos, setCargarProductos] = useState([]);

//estado para guardar arreglo de los pedidos realizados
const [carrito, setCarrito] = useState([]);


//para la paginacion de todo el menu
const productosPorPagina = 6; // Número de productos por página
//para el paginado
const [numPage, setNumPage] = useState(1);

const startIndex = (numPage - 1) * productosPorPagina;
const endIndex = startIndex + productosPorPagina;
const productosPagina = cargarProductos.slice(startIndex, endIndex);
const numPaginas = Math.ceil(cargarProductos.length / productosPorPagina);

//fin de datos para paginacion





const navigate = useNavigate();

//estado para opcion desplegada de la lista
const [opcionSeleccionada, setOpcionSeleccionada] = useState('Todos');

let total=0;//valor que se muestra en la tabla del carrito para el monto total



    //cargarProductos desde DB
	const cargarProductosDB = async () => {
		try {
			const resp = await authApi.get('/admin/productos');

			setTimeout(()=>{
				setLoading(false);
			},2000);
			//fin de animacion cargando

			setCargarProductos(resp.data.productos);
		} catch (error) {
			console.log(error.response.data.msg);
			swal("ERROR" ,error.response.data.msg, "error");;
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};
    //guarda datos en el carrito
    const guardarDatosEnCarrito = (id,e) => {
        e.preventDefault();
        // Buscar el producto correspondiente en el arreglo
        const product = cargarProductos.find((producto) => producto._id === id);
    
        // Verificar si se encontró el producto
        if (product) {
            product.cantidad=product.cantidad -1
            const prodcar=carrito.find((prod)=>prod._id===product._id)

             // Verificar si el producto ya existe en el carrito
        if (prodcar) {
        // Actualizar la cantidad del producto existente en el carrito
        setCarrito((prevCarrito) =>
          prevCarrito.map((prod) =>
            prod._id === product._id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
          )
        );
        } else {
        // Si el producto no existe en el carrito, agregarlo con una cantidad de 1
        setCarrito((prevCarrito) => [...prevCarrito, { ...product, cantidad: 1 }]);
      }
        }
      };
      //elimina producto del carrito
      const eliminarProductoDelCarrito = (id,e) => {
        
        e.preventDefault();

        const product = cargarProductos.find((producto) => producto._id === id);
        const productCarrito= carrito.find((prod)=>prod._id===id)
        if(productCarrito){
            if(productCarrito.cantidad > 1){

                setCarrito((prevCarrito) =>
                prevCarrito.map((prod) =>
                prod._id === product._id ? { ...prod, cantidad: prod.cantidad - 1 } : prod
                )
            );

                setCargarProductos((prevCarrito) =>
                prevCarrito.map((prod) =>
                prod._id === product._id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
          )
        );

            }else{
                const nuevoCarrito = carrito.filter((producto) => producto._id !== id);
            
                setCargarProductos((prevCarrito) =>
                prevCarrito.map((prod) =>
                prod._id === product._id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
            )
            );
                
                setCarrito(nuevoCarrito);
            }
        }
      };

      



      //obtener datos para armar el pedido y orden de compra
      const obtenerDatos = (e,num) => {
        let menu =''
        const fechaHoraActual = new Date();
        const fecha = fechaHoraActual.toISOString().slice(0, 10); // Obtiene la fecha en formato 'YYYY-MM-DD'
        const hora = fechaHoraActual.toISOString().slice(11, 19); // Obtiene la hora en formato 'HH:MM:SS'
      
        let precio_total=0;//falta metodo que calcule el precio total

        const menus = carrito.map((producto) => {
            menu= menu+'\n'+producto.name+' '
            precio_total = precio_total + (producto.precio * producto.cantidad);
            return {
              id: producto._id,
              cantidad: producto.cantidad,
              name: producto.name,
              precio: producto.precio
            };

          });
          
          AlertaRealizar(e,num,fecha,hora,precio_total,menu,menus,);
      };

      //Alerta Realizar pedido o orden
    const AlertaRealizar = (e,num,fecha,hora,precio_total,menu,menus,)=>{
        e.preventDefault();
        swal(
            {
            title: "¿Estas seguro de realizar el pedido de... ?",
            text: emailUs+'  -  '+menu,
            icon: "warning",
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                if(num===1){
                    let estado=''
                    crearPedido(fecha,hora,precio_total,menus,estado);
                  }else{
                    console.log(menus,precio_total);
                    pagarPedido(e,fecha,hora, precio_total, menus);
                  }
              swal("El pedido esta enproceso", {
                
                icon: "success",
              });
            } else {
              swal("Solicitud cancelada");
            }
          });
    
    }

      //va directo al backend para cargar el pedido con estado pendiente
      const crearPedido = async (fecha,hora,precio_total,menus,estado)=>{
        try {
            const resp=await authApi.post('/tienda/new',{
                usuario:emailUs,
                fecha:fecha,
                hora:hora,
                menu:menus,
                precio_total:precio_total,
                estado:estado,
              });
              swal("Exito" ,resp.data.msg, "success");
              navigate('/home');
        } catch (error) {
            console.log(error.response.data.msg);
			swal("ERROR" ,error.response.data.msg, "error");;
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
        }
      }

      //genero la orden d epago en mercadopago
      const pagarPedido = async (e,fecha,hora,precio_total,menus) => {
        e.preventDefault();
		try {

			const resp = await authApi.post('/payment/crear-orden',{
                usuario:emailUs,
                fecha:fecha,
                hora:hora,
                menu:menus,
                precio_total:precio_total,
            });

			console.log(resp.data.msg);
            window.location.href=resp.data.url_comp;

            //guardo en localStorage para recuperar los datos despues de que se confirme la operacion
            const miPedido = { emailUs,fecha,hora,menus,precio_total };
            const miObjetoString = JSON.stringify(miPedido);
            localStorage.setItem('miPedido', miObjetoString);
            
		} catch (error) {
			console.log(error.response.data.msg);
			swal("ERROR" ,error.response.data.msg, "error");;
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};

    //captura ele stado del pago
    const EstadoPago =()=>{

        try {
            //let precio_total=0
            const miObjetoString = localStorage.getItem('miPedido');
            const miPedido = JSON.parse(miObjetoString);
        
            const urlParams = new URLSearchParams(window.location.search);
            const paymentStatus = urlParams.get('status'); // Supongamos que "status" es el parámetro que indica el estado del pago

            // Aquí puedes actualizar el estado de tu aplicación con el resultado del pago
            if(paymentStatus==='approved'){
                const estado='Realizado'
            crearPedido(miPedido.fecha,miPedido.hora,miPedido.precio_total,miPedido.menus,estado);
            console.log(miPedido.precio_total);
            localStorage.clear();
            }
            // por ejemplo, puedes usar un estado local o un contexto para almacenar la información

            //limpio el local sotorage para la proxima operacion
            console.log(`Estado del pago: ${paymentStatus}`);

            
            } catch (error) {
            console.log(error);
            }
    };

    //para la seleccion  de menus
    const handleSelectChange = (e) => {
        setOpcionSeleccionada(e.target.value);
      };

      const MostrarPedidos=()=>{

        const openModal = () => {
            setIsModalOpen(true);
          };

        if(carrito.length!==0){
            return(
                <div className="d-flex justify-content-end me-5">
            <Button variant="success"  className="mb-3 border border-warning" onClick={openModal}>
                    <h2>
                        <i className="bi bi-cart-fill"></i>
                        </h2>
                </Button>

                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
		  className='text-white d-flex justify-content-center align-items-center p-5 p-sm-4 mt-5'>
					
					<Form className='p-5 p-sm-4 bg-dark rounded border border-white'>
                    <Table striped bordered hover variant="dark" className="text-white justify-content-center align-items-center p-5 p-sm-4 border border-white">
		  
		                 <thead>
		                    <tr>
			                <th colSpan={5}>
			                <h3 className='text-center text-warning'>Tu Pedido</h3>
			                </th>
			                </tr>
			                    <tr>
			                <th>Imagen</th>		
			                <th>Nombre</th>
			                <th>precio</th>
                             <th>Cantidad</th>
			                 <th>Eliminar</th>
			                    </tr>
		                    </thead>
		  
		  {carrito.map((producto) => {
            total = total + (producto.precio * producto.cantidad);
                        return (
                             
							<tbody key={producto._id}>
								<tr>
									<td>
									
									<img src={producto.url_img} alt={producto.categoria} width="75"></img>
									</td>
									<td>{producto.name}</td>
									<td>{'$'+producto.precio}</td>
									<td>{producto.cantidad /*esto cambiar por la cantidad que se pide*/}</td>

									<td>
										<button className='btn btn-outline-danger'
                                        onClick={(e)=>eliminarProductoDelCarrito(producto._id,e)}>
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
                        
					}
                    ) }
		        </Table>

                <h3>Precio Total: ${total}</h3>
					
						<div className='d-grid mx-auto'>
	
						<Button type="submit" variant="danger"className="d-flex rounded btn btn-danger m-2" onClick={(e)=>obtenerDatos(e,1)}>
						<h5>
                        <i class="bi bi-coin"> </i>
							Realizar pedido
							</h5>
							</Button>

                            <Button type="submit" variant="danger"className="d-flex rounded btn btn-danger m-2" onClick={(e)=>obtenerDatos(e,2)}>
						<h5>
                            
                        <i class="bi bi-credit-card-2-back"> </i> 
							Mercado Pago
							</h5>
							</Button>
	
						</div>
						
					</Form>
				</Modal>

            </div>
            )}
    }
    
    
    const cambiarPagina = (pageNumber) => {
        setNumPage(pageNumber);
        // Aquí puedes realizar alguna acción adicional, como obtener los datos de la página seleccionada
        console.log('Página cambiada:', pageNumber);
      };

      const Paginacion =()=> {
        return(
            <Pagination className='d-flex align-items-center justify-content-center custom-pagination' border="light">
  
                {Array.from({ length: numPaginas }).map((_, index) => (
                    <Pagination.Item
                    key={index + 1}
                    active={index + 1 === numPage}
                    onClick={() => cambiarPagina(index + 1)}
                    className='text-center col-2' >
                        {index + 1}
                    </Pagination.Item>
                    ))}
  
            </Pagination>

        );
    
        
      };
      


    const cargarcards_carrito=()=>{

                if(opcionSeleccionada!='Todos'){

                          //metodo para el filtrado        
//condicional para la animacion de cargando
  if(loading){
    return(
        <div className="d-flex align-items-center justify-content-center customHeigth">
            <Spinner animation="border" role="status" variant="light" className='custom-spinner'/>
            <span className="visually-hidden">Loading...</span>
        </div>
    )

  }else{

    return (
        <div>

            {MostrarPedidos()}

        <Container >
                    <Row>
                        {cargarProductos.map((producto) => {

                            if(producto.cantidad != 0 && producto.categoria===opcionSeleccionada){
                                return <Col key={producto._id} >
                                <Card className='card fondo_card text-white m-3 col-3 p-2 col-md-4 col-xl-3' border="light" style={{ width: '20rem' }}>
                                    <Card.Img variant="top" src={producto.url_img} />
                                    <Card.Body>
                                        <Card.Title>{producto.name}</Card.Title>
                                        <Card.Text>
                                            {producto.detalle}
                                        </Card.Text>
                                        <Card.Text>
                                           cantidad : {producto.cantidad}
                                        </Card.Text>
                                        <Card.Text>
                                            precio: ${producto.precio}
                                        </Card.Text>
                                        
                                        <Button variant="danger"  className="mb-3" onClick={(e) => guardarDatosEnCarrito(producto._id,e)}>
                                            <h4>
                                            <i className="bi bi-cart-plus"> </i>
                                                añadir al pedido
                                            </h4>
                                        </Button> 
                                    </Card.Body>
                                </Card>
                            </Col>
                            }
                        })}
                    </Row>
                </Container>
                </div>
      )
    }
                }else{
                    

                    //condicional para la animacion de cargando
  if(loading){
    return(
        <div className="d-flex align-items-center justify-content-center customHeigth">
            <Spinner animation="border" role="status" variant="light" className='custom-spinner'/>
            <span className="visually-hidden">Loading...</span>
        </div>
    )

  }else{

    return (
        <div>

            {MostrarPedidos()}

        <Container >
                    <Row>
                        {productosPagina.map((producto) => {

                            if(producto.cantidad != 0){
                                return <Col key={producto._id} >
                                <Card className='card fondo_card text-white m-3 col-3 p-2 col-md-4 col-xl-3' border="light" style={{ width: '20rem' }}>
                                    <Card.Img variant="top" src={producto.url_img} />
                                    <Card.Body>
                                        <Card.Title>{producto.name}</Card.Title>
                                        <Card.Text>
                                            {producto.detalle}
                                        </Card.Text>
                                        <Card.Text>
                                           cantidad : {producto.cantidad}
                                        </Card.Text>
                                        <Card.Text>
                                            precio: ${producto.precio}
                                        </Card.Text>
                                        
                                        <Button variant="danger"  className="mb-3" onClick={(e) => guardarDatosEnCarrito(producto._id,e)}>
                                            <h4>
                                            <i className="bi bi-cart-plus"> </i>
                                                Añadir al pedido
                                            </h4>
                                        </Button> 
                                    </Card.Body>
                                </Card>
                            </Col>
                            }
                        })}

                    </Row>
                    <Row>
                    {Paginacion()}
                    </Row>
                </Container>
                </div>)}
                }
        }   
    
    useEffect(() => {
        //cargarUser();
        EstadoPago()
        cargarProductosDB();
        //cargadePedidos();
          
        },[]);

    return(
        //<div>
          //  {cargarcards_carrito()}
        //</div>

        <div>
		<h1 className="text-center p-3 text-white">Bienvenido Al Menu: {emailUs}</h1>

        <div>
      
	  <div  className=' d-flex justify-content-end me-5'>
	  <h1 className='text-white'>Selección de Menus</h1>
	 	 <select value={opcionSeleccionada} onChange={handleSelectChange}
	 		className='bg-white rounded p-2 m-2'>
            <option value="Todos">Todo el menu</option>
       		<option value="Hamburguesas">Hamburguesas</option>
        	<option value="Sanguches">Sanguches</option>
        	<option value="Pizzas">Pizzas</option>
            <option value="Pastas">Pastas</option>
     	 </select>

	  </div>
      

      {cargarcards_carrito()}
    </div>
      
    </div>
            
    );
    
  }

