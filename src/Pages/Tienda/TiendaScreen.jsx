import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { CardTienda } from './Componentes/CardTienda';
import { EstadoPago } from './helpers/OperacionesDelCarrito';
import { cargarProductosDB } from './helpers/CargarProductos';
import { CarritoDePedidos } from './Componentes/CarritoDePedidos';
import { NavBar } from '../../Componentes/NavBar';
import { Footer } from '../../Componentes/Footer';



export const TiendaScreen = () => {

    const location = useLocation();

    const emailUs = location.state;//recibe el email del loguin


    //para animaciion de carga al principio de cada screen
    const [loading, setLoading] = useState(true);

    //estado para guardar los productos traidos del backend
    const [cargarProductos, setCargarProductos] = useState([]);

    //estado para guardar arreglo de los pedidos realizados
    const [carrito, setCarrito] = useState([]);

    const navigate = useNavigate();

    //estado para opcion desplegada de la lista
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('Todos');

    //para la seleccion  de menus
    const handleSelectChange = (e) => {
        setOpcionSeleccionada(e.target.value);
    };

    //para la paginacion de todo el menu
    const productosPorPagina = 6; // Número de productos por página
    //para el paginado
    const [numPage, setNumPage] = useState(1);

    const startIndex = (numPage - 1) * productosPorPagina;
    const endIndex = startIndex + productosPorPagina;
    const productosPagina = cargarProductos.slice(startIndex, endIndex);
    const numPaginas = Math.ceil(cargarProductos.length / productosPorPagina);
    //fin de datos para paginacion

    const cambiarPagina = (pageNumber) => {
        setNumPage(pageNumber);
        // Aquí puedes realizar alguna acción adicional, como obtener los datos de la página seleccionada
        console.log('Página cambiada:', pageNumber);
    };

    const Paginacion = () => {
        return (
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



    const cargarcards_carrito = () => {

        if (opcionSeleccionada != 'Todos') {
            //metodo para el filtrado        
            //condicional para la animacion de cargando
            if (loading) {
                return (
                    <div className="d-flex align-items-center justify-content-center customHeigth">
                        <Spinner animation="border" role="status" variant="light" className='custom-spinner' />
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Container >
                            <Row>
                                {cargarProductos.map((producto) => {
                                    if (producto.cantidad != 0 && producto.estado != 'Inactivo' && producto.categoria === opcionSeleccionada) {
                                        return <Col key={producto._id} >
                                            <CardTienda producto={producto} carrito={carrito} setCarrito={setCarrito} cargarProductos={cargarProductos} emailUs={emailUs} navigate={navigate} />
                                        </Col>
                                    }
                                })}
                            </Row>
                        </Container>
                    </div>
                )
            }
        } else {
            //condicional para la animacion de cargando
            if (loading) {
                return (
                    <div className="d-flex align-items-center justify-content-center customHeigth">
                        <Spinner animation="border" role="status" variant="light" className='custom-spinner' />
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Container >
                            <Row>
                                {productosPagina.map((producto) => {
                                    if (producto.cantidad != 0 && producto.estado != 'Inactivo') {
                                        return <Col key={producto._id} >
                                            <CardTienda producto={producto} carrito={carrito} setCarrito={setCarrito} cargarProductos={cargarProductos} emailUs={emailUs} navigate={navigate} />
                                        </Col>
                                    }
                                })}
                            </Row>
                            <Row>
                                {Paginacion()}
                            </Row>
                        </Container>
                    </div>)
            }
        }
    }

    useEffect(() => {

        setTimeout(() => {
            setLoading(false);
        }, 2000);
        //fin de animacion cargando

        EstadoPago(navigate)
        cargarProductosDB(setCargarProductos, navigate);

    }, []);

    return (

        <div>
            {/*debe ir en el navbar*/}
            <NavBar emailUs={emailUs} carritoDePedidos={<CarritoDePedidos carrito={carrito} setCarrito={setCarrito} cargarProductos={cargarProductos} setCargarProductos={setCargarProductos} emailUs={emailUs} navigate={navigate} />} />

            <h1 className="text-center p-3 text-white texto-con-sombras-multiples">Bienvenido al menu: {emailUs}</h1>
            <div>

                <div className=' d-flex justify-content-start ms-4'>
                    <h1 className='text-white texto-con-sombras-multiples'> Menus</h1>
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
            <Footer emailUs={emailUs}/>
        </div>
    );

}

