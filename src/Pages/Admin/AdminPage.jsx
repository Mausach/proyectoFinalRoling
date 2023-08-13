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

	
	const [loading, setLoading] = useState(true);

	const location = useLocation();
	const datos = location.state;

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [isModalOpenUs, setIsModalOpenUs] = useState(false);

	
	const [cargarProductos, setCargarProductos] = useState([]);

	
	const [cargarUsuarios, setCargarUsuarios] = useState([]);

	
	const [cargarPedidos, setCargarPedidos] = useState([]);

	
	const [opcionSeleccionada, setOpcionSeleccionada] = useState('usuario');

	const navigate = useNavigate();

	

	const handleSelectChange = (e) => {
		setOpcionSeleccionada(e.target.value);
	};

	const CargarTabla = () => {

		if (opcionSeleccionada === "usuario") {
			
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
								<h5>
									<i className='bi bi-person-fill-add'> </i>Alta de Usuario
								</h5>


							</button>
						</div>

						<ModalAgregarUsuario isModalOpenUs={isModalOpenUs} setIsModalOpenUs={setIsModalOpenUs} navigate={navigate} />
					</div>
				);
			}
		} else if (opcionSeleccionada == "menus") {
			
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
								<h5><i class="bi bi-plus-circle-fill"> </i>
									Alta de Menu</h5>
							</button>
						</div>

						<ModalAgregarProducto isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} navigate={navigate} />
					</div>
				);
			}
		} else if (opcionSeleccionada == "pedidos") {
			
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
	
	useEffect(() => {

		setTimeout(() => {
			setLoading(false);
		}, 2000);

		cargarUser(setCargarUsuarios, navigate);
		cargarProductosDB(setCargarProductos, navigate);
		cargadePedidos(setCargarPedidos, navigate);
	}, []);

	return (
		<div>
			<NavBar emailUs={datos} />
			<h1 className="text-center p-3 text-white texto-con-sombras-multiples">Bienvenido administrador: {datos}</h1>
			<div>
				<div className=' d-flex justify-content-end me-5'>
					<h1 className='text-white texto-con-sombras-multiples'>Opciones</h1>
					<select value={opcionSeleccionada} onChange={handleSelectChange}
						className='bg-warning rounded p-2 m-2'>
						<option value="usuario">Tabla usuarios</option>
						<option value="menus">Tabla de menus</option>
						<option value="pedidos">Tabla de pedidos</option>
					</select>
				</div>
				{CargarTabla()}
			</div>
			<Footer emailUs={datos} />
		</div>
	)
}
