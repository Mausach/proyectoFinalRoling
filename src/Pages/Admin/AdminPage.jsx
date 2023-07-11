import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { TablaUsuario } from './Componentes/TablaUsuario';
import { cargarUser } from './helpers/CargarUsuarios';
import { ModalAgregarUsuario } from './Componentes/ModalAgregarUsuario';
import { TablaMenus } from './Componentes/TablaMenus';
import { cargarProductosDB } from './helpers/CargarProductos';
import { ModalAgregarProducto } from './Componentes/ModalAgregarProducto';
import { TablaPedidos } from './Componentes/TablaPedidos';
import { cargadePedidos } from './helpers/CargarPedidos';
import { NavBar } from '../../Componentes/NavBar';
import { Footer } from '../../Componentes/Footer';

export const AdminPage = () => {

	//para animaciion de carga al principio de cada screen
	const [loading, setLoading] = useState(true);

	const location = useLocation();
	const datos = location.state;//recibe el nombre desde el login

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [isModalOpenUs, setIsModalOpenUs] = useState(false);

	//estado para guardar los productos traidos del backend
	const [cargarProductos, setCargarProductos] = useState([]);

	//estado para guardar los usuarios traidos del backend
	const [cargarUsuarios, setCargarUsuarios] = useState([]);

	//estado para guardar los pedidos traidos del backend
	const [cargarPedidos, setCargarPedidos] = useState([]);

	//estado para opcion desplegada de la lista
	const [opcionSeleccionada, setOpcionSeleccionada] = useState('usuario');

	const navigate = useNavigate();

	//metodo para inhabilitar usuario (recordatorio falta controlar que el usuario este activo)

	const handleSelectChange = (e) => {

		setOpcionSeleccionada(e.target.value);


	};

	const CargarTabla = () => {

		if (opcionSeleccionada === "usuario") {
			//condicional para la animacion de cargando
			if (loading) {
				return (
					<div className="d-flex align-items-center justify-content-center customHeigth">
						<Spinner animation="border" role="status" variant="light" />
						<span className="visually-hidden">Loading...</span>
					</div>
				)
			} else {
				return (
					<div>
						<TablaUsuario cargarUsuarios={cargarUsuarios} navigate={navigate} />

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

						<ModalAgregarUsuario isModalOpenUs={isModalOpenUs} setIsModalOpenUs={setIsModalOpenUs} navigate={navigate} />
					</div>
				);
			}
		} else if (opcionSeleccionada == "menus") {
			//condicional para la animacion de cargando
			if (loading) {
				return (
					<div className="d-flex align-items-center justify-content-center customHeigth">
						<Spinner animation="border" role="status" variant="light" />
						<span className="visually-hidden">Loading...</span>
					</div>
				)
			} else {
				return (
					<div>
						<TablaMenus cargarProductos={cargarProductos} navigate={navigate} />

						<div className="d-flex justify-content-end me-5">
							<button
								className="rounded p-2 btn btn-danger m-2"
								onClick={() => setIsModalOpen(true)}
							>
								<h4><i class="bi bi-plus-circle-fill"> </i>
									Alta de Menu</h4>
							</button>
						</div>

						<ModalAgregarProducto isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} navigate={navigate} />
					</div>
				);
			}
		} else if (opcionSeleccionada == "pedidos") {
			//condicional para la animacion de cargando
			if (loading) {
				return (
					<div className="d-flex align-items-center justify-content-center customHeigth">
						<Spinner animation="border" role="status" variant="light" />
						<span className="visually-hidden">Loading...</span>
					</div>
				)
			} else {
				return (
					<div>
						<TablaPedidos cargarPedidos={cargarPedidos} navigate={navigate} />
					</div>
				);
			}
		}
	}
	//useEfect sirve de esta manera para que las tablas se carguen a penas entren al screen de admin
	//si en corchete ponemos otra funcion ejemplo la de agregar hacemos que el cargar se ejecute cuando termine de agregar el usuario oproducto
	useEffect(() => {

		setTimeout(() => {
			setLoading(false);
		}, 2000);

		cargarUser(setCargarUsuarios);
		cargarProductosDB(setCargarProductos, navigate);
		cargadePedidos(setCargarPedidos);
	}, []);

	return (
		<div>
			<NavBar emailUs={datos}/>
			<h1 className="text-center p-3 text-white">Bienvenido Admin: {datos}</h1>
			<div>
				<div className=' d-flex justify-content-end me-5'>
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
			<Footer emailUs={datos}/>
		</div>
	)
}
