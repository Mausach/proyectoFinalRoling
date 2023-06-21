import React, { useEffect, useState } from 'react'
import authApi from '../../api/authApi';
import swal from 'sweetalert';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-modal';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('TEST-2ef3578e-6104-4276-92c1-57991e97d641');


export const TiendaScreen = () => {

    const location = useLocation();
    const emailUs = location.state;//recibe el email del loguin

    const [isModalOpen,setIsModalOpen]=useState(false);
    //para animaciion de carga al principio de cada screen
const [loading,setLoading]=useState(true);

//estado para guardar los productos traidos del backend
const [cargarProductos, setCargarProductos] = useState([]);

//estado para guardar arreglo de los pedidos realizados
const [carrito, setCarrito] = useState([]);



const navigate = useNavigate();



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

    const guardarDatosEnCarrito = (id) => {
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

      const obtenerDatos = (e,num) => {
        const fechaHoraActual = new Date();
        const fecha = fechaHoraActual.toISOString().slice(0, 10); // Obtiene la fecha en formato 'YYYY-MM-DD'
        const hora = fechaHoraActual.toISOString().slice(11, 19); // Obtiene la hora en formato 'HH:MM:SS'
      
        let precio_total=0;//falta metodo que calcule el precio total

        const menus = carrito.map((producto) => {
            precio_total = precio_total + (producto.precio * producto.cantidad);
            return {
              id: producto._id,
              cantidad: producto.cantidad,
              name: producto.name,
              precio: producto.precio
            };

          });
          const estado='';
          if(num===1){
            crearPedido(fecha,hora,precio_total,menus,estado);
          }else{
            console.log(menus,precio_total);
            pagarPedido(e,fecha,hora, precio_total, menus);
          }

        
      };

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
    


    useEffect(() => {
        //cargarUser();
        EstadoPago()
        cargarProductosDB();
        //cargadePedidos();
          
        },[]);
  

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
					}) }
		        </Table>
					
						<div className='d-grid mx-auto'>
	
						<Button type="submit" variant="danger"className="d-flex rounded btn btn-danger m-2" onClick={(e)=>obtenerDatos(e,1)}>
						<h5>
							<i className='bi bi-plus-circle-fill'> </i> 
							Realizar pedido
							</h5>
							</Button>

                            <Button type="submit" variant="danger"className="d-flex rounded btn btn-danger m-2" onClick={(e)=>obtenerDatos(e,2)}>
						<h5>
							<i className='bi bi-plus-circle-fill'> </i> 
							Mercado Pago
							</h5>
							</Button>
	
						</div>
						
					</Form>
				</Modal>

            </div>
            )
        }
    }    


    const cargarcards_carrito=()=>{

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
        <div>

            {MostrarPedidos()}

        <Container >
                    <Row>
                        {
                        cargarProductos.map((producto) => {

                            if(producto.cantidad != 0){
                                return <Col key={producto._id} >
                                <Card className='card bg-dark text-white m-3 col-3 p-2 col-md-4 col-xl-3' border="light" style={{ width: '20rem' }}>
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
                                        
                                        <Button variant="danger"  className="mb-3" onClick={() => guardarDatosEnCarrito(producto._id)}>
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

            
        }

    return(
        <div>
            {cargarcards_carrito()}
        </div>
            
    );
    
  }

